import connectDB from "@/shared/configs/db";
import Project from "@/shared/schema/project";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
