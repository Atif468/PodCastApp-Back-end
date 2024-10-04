import multer from "multer";

const storage = multer.memoryStorage();
  const upload = multer(multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }));

export default upload;

