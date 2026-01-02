import { CreateUserSchema } from "@/helper/validate";
import fs from "fs";
import path from "path";

const emailTemplatePath = path.join(
  process.cwd(),
  "helper",
  "template",
  "email.html"
);
import { NextResponse } from "next/server";
import { transporter } from "@/helper/nodemailerStmp";
export async function POST(request: Request) {
  const {
    name,
    email,
    message,
  }: { name: string; email: string; message: string } = await request.json();

  try {
    const { error } = CreateUserSchema.validate({ name, email, message });

    if (error) {
      return NextResponse.json(
        { success: true, message: error.details[0].message },
        { status: 400 }
      );
    }

    // Read HTML template from file
    let template = fs.readFileSync(emailTemplatePath, "utf-8");
    const date = new Date();

    // Format date nicely
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long", // optional: "Monday"
      year: "numeric",
      month: "long", // "November"
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // AM/PM format
    });
    template = template
      .replace("{name}", name)
      .replace("{email}", email)
      .replace("{message}", message)
      .replace("{date}", formattedDate);

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: template,
    });
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error || "internal server error" },
      { status: 500 }
    );
  }
}
