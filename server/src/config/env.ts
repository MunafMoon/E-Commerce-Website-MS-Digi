import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "..", ".env") });

export const env = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(12).default("dev-secret-change"),
  JWT_REFRESH_SECRET: z.string().min(12).default("dev-refresh-change"),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  UPLOAD_DIRECTORY: z.string().default("uploads")
}).parse(process.env);
