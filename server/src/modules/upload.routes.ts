import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { ok } from "../lib/http.js";
import { publicUploadUrl, upload } from "../storage/storage.service.js";
export const uploadRoutes = Router();
uploadRoutes.post("/", requireAuth, requireAdmin, upload.array("files", 10), (req, res) => ok(res, (req.files as Express.Multer.File[]).map((f) => ({ url: publicUploadUrl(f.filename), filename: f.filename }))));
