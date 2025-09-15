import connectDB from "@/shared/configs/db";
import Video from "@/shared/schema/video";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

type RawVideo = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  createdAt: Date;
};

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 }).lean<RawVideo[]>();

    const normalized = videos.map((v) => ({
      id: v._id.toString(),
      title: v.title,
      description: v.description,
      youtubeUrl: v.youtubeUrl,
      thumbnail: v.thumbnail,
      createdAt: v.createdAt,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const video = new Video(data);
    await video.save();

    const normalized = {
      id: video._id.toString(),
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail,
      createdAt: video.createdAt,
    };

    return NextResponse.json(normalized, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
