import formidable from "formidable";
import fs from "fs";

const uploadDir = "./private/assets/usersImages";

fs.mkdirSync(uploadDir, { recursive: true });

export const teacherImage = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
