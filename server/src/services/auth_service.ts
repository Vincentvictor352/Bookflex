import { eq, or } from "drizzle-orm";
import { db } from "../configs/dbconnection.ts";
import { usersTable } from "../models/schema.ts";
import argon2 from "argon2";
import { hmacProcess, Otpcode } from "../utils/generateOtp.ts";
import { queue as emailworker } from "../utils/Mail_worker.ts";
import jwt from "jsonwebtoken";
import Tokens from "../utils/JWT_helper.ts";
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const FORGETPASSWORD_SEC = process.env.FORGETPASSWORD_SEC as string;

export const registerUser = async (
  user_name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }
    const hashedPassword = await argon2.hash(password);
    //otp code
    const code = Otpcode();
    const hashedCode = hmacProcess(
      code,
      process.env.HMAC_VERIFICATION_CODE_SECRET as string
    );
    const expire = new Date(Date.now() + 10 * 60 * 1000);
    const newUser = await db
      .insert(usersTable)
      .values({
        user_name,
        email,
        password: hashedPassword,
        expiretime: expire,
        otp: hashedCode,
      })
      .returning();

    const createdUser = newUser[0];
    await emailworker.add(
      "send-email",
      {
        type: "otp",
        user: createdUser,
        verificationLink: code,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const VerifyEmailService = async (
  email: string,
  code: string
): Promise<void> => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email as string));

    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error("User not found");
    }
    if (currentUser.isVerified) {
      throw new Error("User already verified");
    }
    if (!currentUser.expiretime) {
      throw new Error("OTP expiry not set");
    }

    // Check OTP expiry
    if (new Date() > currentUser.expiretime) {
      throw new Error("OTP expired");
    }

    // Hash the code from query to compare
    const hashedCode = hmacProcess(
      code as string,
      process.env.HMAC_VERIFICATION_CODE_SECRET as string
    );

    if (hashedCode !== currentUser.otp) {
      throw new Error("Invalid verification code");
    }

    // Mark user as verified
    await db
      .update(usersTable)
      .set({ isVerified: true, otp: null, expiretime: null })
      .where(eq(usersTable.email, email as string));
  } catch (error) {
    throw error;
  }
};

export const LoginService = async (email: string, password: string) => {
  try {
    const normalizedInput = email.toLowerCase();
    const user = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, normalizedInput),
          eq(usersTable.user_name, normalizedInput)
        )
      );

    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error("User not found");
    }

    // Email not verified
    if (!currentUser.isVerified) {
      // OTP expired
      if (!currentUser.expiretime || new Date() > currentUser.expiretime) {
        const code = Otpcode();
        const hashedCode = hmacProcess(
          code,
          process.env.HMAC_VERIFICATION_CODE_SECRET as string
        );
        const expire = new Date(Date.now() + 10 * 60 * 1000);

        await db
          .update(usersTable)
          .set({ otp: hashedCode, expiretime: expire })
          .where(eq(usersTable.email, email));

        await emailworker.add(
          "send-email",
          {
            type: "otp",
            user: currentUser,
            verificationLink: code,
          },
          {
            attempts: 3,
            backoff: { type: "exponential", delay: 3000 },
            removeOnComplete: true,
            removeOnFail: true,
          }
        );

        throw new Error(
          "OTP expired. A new verification code has been sent to your email."
        );
      }

      throw new Error("Please verify your email first");
    }

    // Password check
    const validPassword = await argon2.verify(currentUser.password, password);

    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    // Tokens
    const accessToken = Tokens.accessToken(currentUser);
    const refreshToken = Tokens.refreshToken(currentUser);

    return { currentUser, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export async function forgotPasswordService(email: string) {
  try {
    const normalizedInput = email.toLowerCase();
    const user = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, normalizedInput),
          eq(usersTable.user_name, normalizedInput)
        )
      );

    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error("User not found");
    }

    const code = Otpcode();
    const hashedCode = hmacProcess(
      code,
      process.env.HMAC_VERIFICATION_CODE_SECRET as string
    );

    const expire = new Date(Date.now() + 10 * 60 * 1000);

    await db
      .update(usersTable)
      .set({ otp: hashedCode, expiretime: expire })
      .where(eq(usersTable.email, email));

    await emailworker.add(
      "send-email",
      {
        type: "reset-password",
        user: currentUser,
        verificationLink: code,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
    return {
      email,
      message:
        "Password reset code sent to your email. the code will expire in the next 10mins",
    };
  } catch (error) {
    throw error;
  }
}

export async function verifyCodeService(email: string, code: string) {
  try {
    const normalizedInput = email.toLowerCase();
    const user = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, normalizedInput),
          eq(usersTable.user_name, normalizedInput)
        )
      );
    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error("User not found");
    }

    if (!currentUser.expiretime) {
      throw new Error("OTP expiry not set");
    }

    if (new Date() > currentUser.expiretime) {
      throw new Error("OTP expired");
    }

    const hashedCode = hmacProcess(
      code,
      process.env.HMAC_VERIFICATION_CODE_SECRET as string
    );

    if (hashedCode !== currentUser.otp) {
      throw new Error("Invalid verification code");
    }

    const forgetpasswordToken = jwt.sign(
      { id: currentUser.id, email: currentUser.email },
      FORGETPASSWORD_SEC,
      { expiresIn: "1hr" }
    );
    return { forgetpasswordToken };
  } catch (error) {
    throw error;
  }
}
export async function resetPasswordService(
  resetToken: string,
  newPassword: string,
  confirmNewpassword: string
) {
  try {
    if (newPassword !== confirmNewpassword) {
      throw new Error("Passwords do not match");
    }

    // Verify JWT token
    const decoded = jwt.verify(resetToken, FORGETPASSWORD_SEC) as any;
    const userId = decoded.id;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user || user.length === 0) {
      throw new Error("Invalid or expired reset token");
    }

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error("User not found");
    }

    if (!currentUser.expiretime || new Date() > currentUser.expiretime) {
      throw new Error("Reset token expired");
    }

    const hashedPassword = await argon2.hash(newPassword);

    await db
      .update(usersTable)
      .set({
        password: hashedPassword,
        otp: null,
        expiretime: null,
      })
      .where(eq(usersTable.id, currentUser.id));
  } catch (error) {
    throw error;
  }
}
