// shared/configs/db.ts
import { sampleProjects, sampleVideos } from "@/shared/configs/data";
import Admin from "@/shared/schema/admin";
import Project from "@/shared/schema/project";
import Video from "@/shared/schema/video";
import mongoose from "mongoose";

let isConnected = false; // cache connection status

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return; // đã connect rồi
  }

  if (!process.env.DB_URL) {
    throw new Error("❌ DB_URL is not defined");
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "honganh", // <-- nhớ set nếu cần
      bufferCommands: false,
    });
    isConnected = true;
    console.log("✅ Connect DB successfully");

    // Gọi seed 1 lần sau khi connect
    await seedData();
  } catch (err) {
    console.error("❌ Connect DB failed:", err);
    throw err;
  }
};

const seedData = async () => {
  try {
    const [projectCount, videoCount, adminCount] = await Promise.all([
      Project.estimatedDocumentCount(),
      Video.estimatedDocumentCount(),
      Admin.estimatedDocumentCount(),
    ]);

    if (projectCount === 0 && sampleProjects?.length > 0) {
      await Project.insertMany(sampleProjects);
      console.log("🌱 Seeded sample projects");
    }

    if (videoCount === 0 && sampleVideos?.length > 0) {
      await Video.insertMany(sampleVideos);
      console.log("🌱 Seeded sample videos");
    }

    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME;
      const defaultEmail = process.env.ADMIN_EMAIL;
      const defaultPassword = process.env.ADMIN_PASSWORD;
      const defaultRole = process.env.ADMIN_ROLE as "admin" | "super-admin";

      const existing = await Admin.findOne({
        $or: [{ username: defaultUsername }, { email: defaultEmail }],
      });

      if (!existing) {
        await Admin.create({
          username: defaultUsername,
          email: defaultEmail,
          password: defaultPassword,
          role: defaultRole,
        });
        console.log("🌱 Seeded default admin user");
      }
    }
  } catch (seedError) {
    console.warn("⚠️ Seeding skipped/failed:", seedError);
  }
};

export default connectDB;
