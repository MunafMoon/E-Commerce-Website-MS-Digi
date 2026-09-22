# Full-Stack E-Commerce Platform

Production-oriented React + Express + Prisma commerce platform with a CMS-driven storefront and separate admin dashboard.

## Apps

- Customer site: http://localhost:5173
- Admin dashboard: http://localhost:5173/admin
- Backend API: http://localhost:4000
- API docs: http://localhost:4000/api/docs

## Stack

Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form.
Backend: Node.js, TypeScript, Express, JWT auth, refresh tokens, role-based authorization, REST APIs, Swagger.
Database: PostgreSQL with Prisma.
Storage: local uploads in development through `/api/admin/uploads`, with structure ready for Cloudinary/S3 later.

## Setup

1. Copy environment variables:

```powershell
Copy-Item .env.example .env
Copy-Item .env server\.env -Force
```

2. Edit `.env` and `server/.env` values. Minimum required:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="change-this-to-a-long-secret"
JWT_REFRESH_SECRET="change-this-to-another-long-secret"
ADMIN_SEED_PASSWORD="your-secure-admin-password"
PORT=4000
CLIENT_URL="http://localhost:5173"
UPLOAD_DIRECTORY="uploads"
```

For hosted PostgreSQL providers such as Neon, Supabase, Railway, or Render, use their connection string. Many hosted databases require `?sslmode=require` at the end.

3. Install dependencies:

```powershell
npm install
```

4. Generate Prisma client:

```powershell
npx prisma generate --schema server/prisma/schema.prisma
```

5. Run database migrations:

```powershell
npm run prisma:migrate --workspace server
```

6. Seed demo data:

```powershell
npm run seed
```

7. Run both apps:

```powershell
npm run dev
```

Or run separately:

```powershell
npm run dev --workspace server
npm run dev --workspace client
```

## Admin Login

Email: `admin@example.com`
Password: the value of `ADMIN_SEED_PASSWORD` used during seeding.

## Database-Driven Content

Storefront content is fetched from APIs, not hardcoded:

- `GET /api/site-settings`
- `GET /api/homepage`
- `PUT /api/admin/site-settings`
- `PUT /api/admin/homepage`

Products, categories, banners, pages, coupons, orders, customers, inventory logs, and reviews are modeled in Prisma. Admin-protected routes use JWT middleware and `ADMIN` role checks.

## Important Commands

```powershell
npm run typecheck
npm run build
npm run seed
npm run dev --workspace server
npm run dev --workspace client
npx prisma studio --schema server/prisma/schema.prisma
```

## Deployment Notes

- Deploy `/client` to Vercel, Netlify, or another static frontend host.
- Deploy `/server` to Render, Railway, Fly.io, DigitalOcean, or another Node.js backend host.
- Use hosted PostgreSQL from Neon, Supabase, Railway, Render, Aiven, or similar.
- Set frontend env `VITE_API_URL="https://your-backend-url.com/api"`.
- Set backend env `CLIENT_URL="https://your-frontend-url.com"`.
- Use strong `JWT_SECRET` and `JWT_REFRESH_SECRET` values.
- Run production migrations with `prisma migrate deploy` on the backend host.
- Replace local uploads with Cloudinary/S3 before production if your backend host has ephemeral storage.

