## Tour Management System (Node.js/Express + TypeScript)

Production-ready REST API for managing tours, bookings, users, payments and stats. Built with Express 5, TypeScript, MongoDB (Mongoose), Redis, Passport (local + Google OAuth), Cloudinary uploads, SSLCommerz payments, and Nodemailer/EJS for emails.

### Features

- **Auth**: Local auth with JWT access/refresh, sessions, Google OAuth 2.0
- **Users**: Roles (includes seeded Super Admin), protected routes, cookies
- **Tours**: CRUD, filtering/pagination via a query builder
- **Bookings & Payments**: Booking flow with SSLCommerz integration and PDF invoice generation
- **Uploads**: Image upload via Multer + Cloudinary
- **Emails**: OTP, password reset and invoice emails using Nodemailer + EJS templates
- **Caching/State**: Redis connection utilities
- **DX**: TypeScript, ESLint, and Vercel deployment config

---

### Tech Stack

- **Runtime**: Node.js (>= 18)
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache/Session**: Redis, express-session
- **Auth**: Passport (local, Google OAuth), JWT
- **Storage**: Cloudinary
- **Payments**: SSLCommerz
- **Email/Templates**: Nodemailer + EJS

---

### Monorepo Layout

```
dist/                    # Compiled JS (build output)
src/                     # Source (TypeScript)
  app/
    config/              # env, passport, multer, cloudinary, redis
    middlewares/         # error handlers, auth, request validation
    modules/
      auth/              # auth routes, controller, service
      user/              # users and seeding Super Admin
      tour/              # tours domain
      booking/           # bookings domain
      payment/           # payments + SSLCommerz
      division/          # geographic divisions
      otp/               # OTP flow
      stats/             # stats/analytics endpoints
    routes/              # api/v1 router composition
  server.ts              # app bootstrap & DB/Redis connect, seeding
  app.ts                 # express app wiring
vercel.json              # Vercel deployment config
```

---

### Quick Start

1. Prerequisites

- Node.js 18+
- MongoDB instance
- Redis instance
- Cloudinary account (cloud name, API key/secret)
- SMTP credentials (for Nodemailer)
- Google OAuth 2.0 credentials
- SSLCommerz credentials

2. Install

```bash
npm install
```

3. Configure environment

4. Run in development

```bash
npm run dev
```

Server runs with hot reload at: `http://localhost:5000`

5. Build and start

```bash
npm run build
npm start
```

---

### NPM Scripts

- `npm run dev`: Start in dev mode using ts-node-dev
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Run compiled server from `dist/server.js`
- `npm run lint`: Run ESLint on `src/`

---

### API

- Base URL: `http://localhost:5000`
- Health: `GET /` → "Welcome to tour management system"
- API namespace: ` /api/v1`

Composed routes under `/api/v1`:

- `/auth` – authentication (local + Google), tokens, session handling
- `/user` – user management
- `/tour` – tours CRUD and queries
- `/division` – divisions
- `/booking` – bookings
- `/payment` – SSLCommerz flows and IPN
- `/otp` – OTP verification
- `/stats` – analytics and stats

Notes

- CORS is enabled for `FRONTEND_URL` and uses credentials (cookies).
- Cookies/JWTs are used; ensure your frontend sends `credentials: 'include'` where required.
- A Super Admin is seeded on startup using `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD`.

---

### Deployment (Vercel)

This project includes `vercel.json` that serves `dist/server.js`.

Typical steps:

1. Ensure build output exists:

```bash
npm run build
```

2. Configure all environment variables in your Vercel project
3. Deploy (e.g., via Vercel CLI or Git integration)

---

### Troubleshooting

- Missing env variable: the server will throw on boot if any required variable is absent
- MongoDB not reachable: verify `DB_URL` and network access
- Redis connection: check host/port/auth and that Redis is running
- SSLCommerz sandbox vs live: set proper API endpoints and credentials
- Google OAuth callback: must match your Google Console configuration

---

### License

ISC
