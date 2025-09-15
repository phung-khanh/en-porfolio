import mongoose, { Document, Schema } from "mongoose";

export interface ITheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  header: string;
  footer: string;
}

export interface ISocialLinks {
  instagram?: string;
  behance?: string;
  dribbble?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface ISettings extends Document {
  siteTitle: string;
  siteDescription: string;
  theme: ITheme;
  socialLinks: ISocialLinks;
  updatedAt: Date;
}

const ThemeSchema = new Schema<ITheme>(
  {
    primary: { type: String, default: "#0ea5e9" },
    secondary: { type: String, default: "#d946ef" },
    accent: { type: String, default: "#f97316" },
    background: { type: String, default: "#ffffff" },
    text: { type: String, default: "#1f2937" },
    header: { type: String, default: "#ffffff" },
    footer: { type: String, default: "#1f2937" },
  },
  { _id: false }
);

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    instagram: { type: String, default: "" },
    behance: { type: String, default: "" },
    dribbble: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    github: { type: String, default: "" },
  },
  { _id: false }
);

const SettingsSchema = new Schema<ISettings>(
  {
    siteTitle: {
      type: String,
      default: "Graphic Design Portfolio",
    },
    siteDescription: {
      type: String,
      default: "Creative designs that inspire and engage",
    },
    theme: {
      type: ThemeSchema,
      default: () => ({}),
    },
    socialLinks: {
      type: SocialLinksSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
SettingsSchema.index({}, { unique: true });

export default mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
