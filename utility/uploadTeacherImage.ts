
import formidable from "formidable";
import fs from "fs";
import path from "path";

const uploadDir = "usersImages";
fs.mkdirSync(path.join( __dirname, "private", "assets", uploadDir ), { recursive: true });

export const teacherImage = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2,
    filter: part => part.mimetype?.startsWith("image/") || false,
});
