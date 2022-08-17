import formidable from "formidable";
import type { Fields, Files } from "formidable";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utility/logger";
// import { fs } from "fs";

declare global {
  namespace Express {
    interface Request {
      form?: {
        fields: Fields;
        files: Files;
      };
    }
  }
}

const uploadDir = path.join(__dirname, "../", "public", "assets", "freeVideos");

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  multiples: false,
  maxFileSize: 200 * 1024 ** 2,
  filter: (part) => part.mimetype?.startsWith("video/mp4") || false,
});

export function formidableMiddleware(req: Request, res: Response, next: NextFunction) {
  // console.log("this is uploadDir:", uploadDir)
  form.parse(req, (err, fields, files) => {
    if (err) {
      logger.error(err.toString());
    }
    req.form = { fields, files };
    // console.log("formidable files:", files)
    next();
  });
}
