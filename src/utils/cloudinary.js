import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded successfully
    console.log(
      "file has been uploaded on cloudinary successfully",
      response.url
    );
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };

// temp code
// cloudinary.v2.uploader
//   .upload(
//     "https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg",
//     {
//       public_id: "wiki_shirt",
//       quality_analysis: true,
//       colors: true,
//       categorization: "google_tagging",
//       auto_tagging: 0.8,
//     }
//   )
//   .then((result) => console.log(result));
