import { sampleProjects, sampleVideos } from "@/shared/configs/data";
import Admin from "@/shared/schema/admin";
import Project from "@/shared/schema/project";
import Video from "@/shared/schema/video";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) throw new Error("DB_URL is not defined");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect DB successfully");

    try {
      const [projectCount, videoCount, adminCount] = await Promise.all([
        Project.estimatedDocumentCount(),
        Video.estimatedDocumentCount(),
        Admin.estimatedDocumentCount(),
      ]);

      if (projectCount === 0 && sampleProjects && sampleProjects.length > 0) {
        await Project.insertMany(sampleProjects);
        console.log("Seeded sample projects");
      }

      if (videoCount === 0 && sampleVideos && sampleVideos.length > 0) {
        await Video.insertMany(sampleVideos);
        console.log("Seeded sample videos");
      }

      if (adminCount === 0) {
        const defaultUsername = process.env.ADMIN_USERNAME;
        const defaultEmail = process.env.ADMIN_EMAIL;
        const defaultPassword = process.env.ADMIN_PASSWORD;
        const defaultRole = process.env.ADMIN_ROLE as "admin" | "super-admin";

        // Avoid duplicate by checking either username or email
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
          console.log("Seeded default admin user");
        }
      }
    } catch (seedError) {
      console.log("Seeding skipped/failed:", seedError);
    }
  } catch {
    console.log("Connect DB failed");
  }
};

export default connectDB;
