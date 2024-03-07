import crypto from "crypto";
import multer, { StorageEngine } from "multer";
import path from "path";

type UploadConfig = {
  driver: "s3" | "disk";
  directory: string;
  tmpFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // disk: {};
    aws: {
      bucket: string;
    };
  };
};

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");
const tmpFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}_${file.originalname}`;
        callback(null, fileName);
      },
    }),
  },
  config: {
    // disk: {},
    aws: {
      bucket: "api-vendas",
    },
  },
} as UploadConfig;
