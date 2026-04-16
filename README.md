# Backend API

REST API for vending-machine style operations: distributor and product management, user profiles (clients, agents, decision-makers), announcements, tasks, reclamations, payments (Stripe), and real-time updates via Socket.IO.

## Stack

- **Runtime:** Node.js (Express 4)
- **Database:** PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Auth:** JWT (Bearer tokens)
- **Real-time:** Socket.IO
- **Docs:** OpenAPI/Swagger UI
- **Payments:** Stripe (and currency conversion via Fixer where configured)

## Prerequisites

- Node.js (LTS recommended)
- PostgreSQL
- npm (or compatible package manager)

## Setup

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file in the project root. At minimum you need a database URL and JWT settings for authenticated routes to work.

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | PostgreSQL connection string for Prisma |
   | `PORT` | HTTP port (default: `8080`) |
   | `JWT_SECRET` | Secret for signing and verifying JWTs |
   | `JWT_EXPIRE` | JWT lifetime (e.g. `7d`) |
   | `COOKIE_EXPIRE` | Cookie max-age in **days** (used with auth cookies) |
   | `STRIPE_API_KEY` | Stripe secret key |
   | `STRIPE_CLI_ENDPOINT_SECRET` | Stripe webhook signing secret (local/testing) |
   | `FIXER_API_KEY` | Fixer API key for currency conversion in payments |
   | `SMTP_HOST`, `SMTP_PORT` | Outgoing mail (billing emails) — `sendBillingEmail` |
   | `SMPT_HOST`, `SMPT_PORT`, `SMPT_SERVICE`, `SMPT_MAIL`, `SMPT_PASSWORD` | Nodemailer (general mail and mixed usage; variable names match the codebase) |

3. **Database**

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

   For local development you can use `npx prisma migrate dev` instead of `deploy` when you need to create or adjust migrations.

## Run

```bash
npm run dev
```

Or:

```bash
npm start
```

Both use `nodemon` and start `src/index.js`. The server listens on `PORT` or **8080**.

## API documentation

Interactive docs (Swagger UI) are served at:

`/api/v1/docs`

The OpenAPI spec is generated from route files under `src/api/v1/routes/`.

## Main route groups

Base path: `/api/v1`

| Prefix | Area |
|--------|------|
| `/auth` | Authentication |
| `/resourceManagement` | Distributors, products, regions, issues, etc. |
| `/paymentManagement` | Orders and payments |
| `/profileManagement` | User profiles |
| `/reclamation` | Reclamations |
| `/annonce` | Announcements / ads |
| `/tache` | Tasks |
| `/stats` | Stats |
| `/statistiques` | Statistics / reporting |

A simple HTML landing view is available at `GET /api/v1`.

## Tests

Integration tests use Jasmine and Supertest:

```bash
npm test
```

Ensure `.env` is set and the database is available if tests touch the DB or external services.

## Project layout

- `src/index.js` — Express app, HTTP server, Socket.IO, Swagger
- `src/api/v1/routes/` — Route definitions
- `src/api/v1/controllers/` — Request handlers
- `src/api/v1/services/` — Business logic
- `src/api/v1/middlewares/` — Auth, mail, utilities
- `src/api/v1/sockets/` — Socket.IO handlers
- `prisma/` — Schema and migrations
- `spec/` — Jasmine specs

HTTP access logs are written to `src/logger/access.log` when the server runs.

## License

ISC (see `package.json`).
