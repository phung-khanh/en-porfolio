import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);
