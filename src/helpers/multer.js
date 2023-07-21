import cloudinary from "./cloudinary.js";

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid image file!", false);
  }
};


exports.imageUpload = async (req) => {
  let imageUrl = "";
  await cloudinary.v2.uploader.upload(
    req.file.path,
    async function (err, image) {
      if (err) {
        console.log(err);
      }
      imageUrl = image.url;
    }
  );
  return imageUrl;
};