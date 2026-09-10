import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  filename: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `pulaupedia/${folder}`,
          public_id: `${Date.now()}-${filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '')}`,
          overwrite: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        }
      )
      .end(buffer);
  });
}

export async function deleteFromCloudinary(url: string): Promise<void> {
  try {
    // Extract public_id from URL
    const matches = url.match(/pulaupedia\/.*\/(\d+-[^.]+)/);
    if (!matches) return;
    const publicId = `pulaupedia/${url.split('pulaupedia/')[1].replace(/\.[^/.]+$/, '')}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
}

export default cloudinary;
