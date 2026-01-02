// import { Queue, Worker } from "bullmq";
// import { client as redisClient } from "./redis.ts";
// import { cloudinary } from "../configs/cloudinary.ts";

// // Create the queue
// export const imageQueue = new Queue("upload-file", {
//   connection: redisClient,
// });

// // Initialize the worker
// export const initializeImageWorker = () => {
//   const worker = new Worker(
//     "upload-file",
//     async (job: { data: { imagePath: string; folder?: string } }) => {
//       const { type, imagePath, folder } = job.data;

//       try {
//         if (type === "file") {
//           const result = await cloudinary.uploader.upload(imagePath, {
//             folder: folder || "default",
//           });
//           console.log("Image uploaded successfully:", result.secure_url);
//           return result;
//         } else if (type === "cover") {
//           const result = await cloudinary.uploader.upload(imagePath, {
//             folder: folder || "default",
//           });
//           console.log("Image uploaded successfully:", result.secure_url);
//           return result;
//         }
//       } catch (error) {
//         console.error("Cloudinary upload failed:", error);
//         throw error;
//       }
//     },
//     {
//       connection: redisClient,
//     }
//   );

//   worker.on("failed", (job: any, err) => {
//     console.error(`Image upload job failed for job ${job.id}:`, err);
//   });

//   return worker;
// };
