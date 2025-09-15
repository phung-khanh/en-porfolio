/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import cloudinary from "@/shared/configs/cloudinary";
import connectDB from "@/shared/configs/db";
import Project from "@/shared/schema/project";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

type RawProject = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean<RawProject[]>();

    const normalized = projects.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      image: p.image,
      category: p.category,
      tags: p.tags ?? [],
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if it's a multipart form data (file upload)
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Extract form fields
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;
      const tags = formData.get("tags") as string;
      const file = formData.get("file") as File;

      if (!title || !description || !category || !file) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      // Upload image to Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "portfolio",
            },
            (error: any, result: any) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      const projectData = {
        title,
        description,
        category,
        tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [],
        image: (uploadResult as any).secure_url,
      };

      const project = new Project(projectData);
      await project.save();

      const normalized = {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        tags: project.tags ?? [],
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };

      return NextResponse.json(normalized, { status: 201 });
    } else {
      // Handle JSON data (for direct image URL)
      const data = await request.json();

      const project = new Project(data);
      await project.save();

      const normalized = {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        tags: project.tags ?? [],
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };

      return NextResponse.json(normalized, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
