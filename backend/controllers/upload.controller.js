import { uploadCloudinary } from "../utils/cloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const localFilePath = req.file?.path;
    const oldPublicId = req.body.oldPublicId;

    if (!localFilePath) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await uploadCloudinary(localFilePath, oldPublicId);

    if (!result) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { uploadImageController };
