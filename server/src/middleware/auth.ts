import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../config/env.js";
import { ApiError } from "../lib/http.js";
export type AuthUser = { id: string; role: Role; email: string };
declare global { namespace Express { interface Request { user?: AuthUser } } }
export const signAccessToken = (user: AuthUser) => jwt.sign(user, env.JWT_SECRET, { expiresIn: "15m" });
export const signRefreshToken = (user: AuthUser) => jwt.sign(user, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
export function requireAuth(req: Request, _res: Response, next: NextFunction) { const token = req.headers.authorization?.replace("Bearer ", ""); if (!token) throw new ApiError(401, "Authentication required"); try { req.user = jwt.verify(token, env.JWT_SECRET) as AuthUser; next(); } catch { throw new ApiError(401, "Invalid or expired token"); } }
export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => { if (req.user?.role !== Role.ADMIN) throw new ApiError(403, "Admin access required"); next(); };
