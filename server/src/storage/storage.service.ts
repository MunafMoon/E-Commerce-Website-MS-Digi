import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import { env } from "../config/env.js";
fs.mkdirSync(env.UPLOAD_DIRECTORY, { recursive: true });
const storage = multer.diskStorage({ destination: (_req, _file, cb) => cb(null, env.UPLOAD_DIRECTORY), filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`) });
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
export const publicUploadUrl = (filename: string) => `/uploads/${path.basename(filename)}`;
