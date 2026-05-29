import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = (buffer, file) => {
  return new Promise((resolve, reject) => {
    const originalName = file.name;

    // clean name only for internal use
    const safeName = originalName
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace(/[^a-zA-Z0-9-_]/g, "_");

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "orders",
        public_id: `${safeName}_${Date.now()}`,
        use_filename: false,
        unique_filename: true,
        overwrite: false,
        // 🔥 THIS fixes download name behavior
        filename_override: originalName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};