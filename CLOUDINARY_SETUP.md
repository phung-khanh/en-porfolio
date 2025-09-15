# Cloudinary Setup for Project Image Uploads

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How to Get Cloudinary Credentials

1. Go to [Cloudinary.com](https://cloudinary.com) and create a free account
2. After logging in, go to your Dashboard
3. Copy the following values:
   - **Cloud Name**: Found in the "Account Details" section
   - **API Key**: Found in the "Account Details" section
   - **API Secret**: Found in the "Account Details" section (click "Show" to reveal)

## Features Added

- ✅ Image upload to Cloudinary when creating new projects
- ✅ Form validation for required fields
- ✅ Loading states during upload
- ✅ Automatic image URL storage in database
- ✅ Organized folder structure in Cloudinary (`portfolio/projects/`)

## Usage

1. Go to Admin Dashboard → Projects tab
2. Click "Add Project" button
3. Fill in the form with:
   - Title (required)
   - Description (required)
   - Category (required)
   - Tags (optional, comma-separated)
   - Project Image (required)
4. Click "Add Project" to upload and create the project

The image will be automatically uploaded to Cloudinary and the secure URL will be stored in your database.
