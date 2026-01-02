import { Queue, Worker } from "bullmq";
import { client as redisClient } from "./redis.ts";
import STMPservice from "./mailtemp.ts";

export const queue = new Queue("send-email", {
  connection: redisClient,
});

export const initalizeEmailWorker = () => {
  const worker = new Worker(
    "send-email",
    async (job: {
      data: { type: string; result?: any; user: any; verificationLink: string };
    }) => {
      const { type, user, result, verificationLink } = job.data;

      if (type === "otp") {
        await STMPservice.SendingOtp(user, verificationLink);
        console.log("verification otp Mail successfully sent");
      } else if (type === "reset-password") {
        await STMPservice.forgetpassword(user, verificationLink);
        console.log("verification otp forgetpassword Mail successfully sent");
      } else {
        console.warn("Unknown email type, skipping job:", job.data);
        return;
      }
    },
    {
      connection: redisClient,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`Image upload job failed for job ${job}:`, err);
  });

  return worker;
};
