import cloudinary from "cloudinary";

let cloudinaryConfiged = false;

const configCloudinary = () => {
  if (cloudinaryConfiged) {
    return;
  }

  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  cloudinaryConfiged = true;
};

const uploadToCloudinary = async (image: string) => {
  return await cloudinary.v2.uploader.upload(image, {
    folder: "tripnest",
  });
};

const deleteFromCloudinary = async (publicId: string) => {
  await cloudinary.v2.uploader.destroy(publicId);
};

export { configCloudinary, uploadToCloudinary, deleteFromCloudinary };
