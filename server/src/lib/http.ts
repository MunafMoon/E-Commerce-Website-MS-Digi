import type { NextFunction, Request, Response } from "express";
export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }
export const ok = (res: Response, data: unknown, meta?: unknown) => res.json({ success: true, data, meta });
export const created = (res: Response, data: unknown) => res.status(201).json({ success: true, data });
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => { const status = err instanceof ApiError ? err.status : 500; res.status(status).json({ success: false, message: err.message || "Internal server error" }); };
