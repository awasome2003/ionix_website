# IONIX Backend API

REST API for the IONIX Sports landing site — captures leads, tournament/academy
registrations and newsletter signups, and serves an admin-managed photo gallery,
testimonials and events.

**Stack:** Node.js · Express · MongoDB (Mongoose) · JWT auth · Multer uploads

## Getting started

```bash
cd backend
npm install
cp .env.example .env        # then edit values (Mongo URI, JWT secret, admin creds)
npm run seed:admin          # creates the first admin user from .env
npm run dev                 # starts on http://localhost:5000 (auto-reload)
```

Requires a running MongoDB (local `mongod` or a MongoDB Atlas connection string in
`MONGODB_URI`).

## Environment

See [.env.example](.env.example). Key vars: `PORT`, `MONGODB_URI`, `JWT_SECRET`,
`CLIENT_ORIGINS` (CORS allowlist), `ADMIN_EMAIL`/`ADMIN_PASSWORD` (seed only).

## API

Base URL: `http://localhost:5000/api`. All responses are JSON `{ success, ... }`.

### Public (no auth)

| Method | Path                       | Purpose                                  |
| ------ | -------------------------- | ---------------------------------------- |
| GET    | `/health`                  | Health check                             |
| POST   | `/contact`                 | Submit a contact/lead enquiry            |
| POST   | `/registrations`           | Tournament or academy signup (`type`)    |
| POST   | `/newsletter`              | Subscribe an email                       |
| POST   | `/newsletter/unsubscribe`  | Unsubscribe an email                     |
| GET    | `/gallery`                 | Published gallery photos (`?category=`)  |
| GET    | `/testimonials`            | Published testimonials                   |
| GET    | `/events`                  | Published events                         |

Form endpoints are rate-limited (20 requests / 15 min / IP).

**Example — contact:**

```bash
curl -X POST http://localhost:5000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Asha","email":"asha@example.com","message":"Interested in a corporate tournament."}'
```

**Example — registration:**

```bash
curl -X POST http://localhost:5000/api/registrations \
  -H 'Content-Type: application/json' \
  -d '{"type":"tournament","name":"Ravi","email":"ravi@x.com","phone":"+919561955125","sport":"Box Cricket","participants":40}'
```

### Auth

| Method | Path           | Purpose                          |
| ------ | -------------- | -------------------------------- |
| POST   | `/auth/login`  | Returns `{ token }` (JWT)        |
| GET    | `/auth/me`     | Verify token, return admin       |

Send the token on admin requests: `Authorization: Bearer <token>`.

### Admin (auth required) — `/api/admin`

| Method | Path                    | Purpose                              |
| ------ | ----------------------- | ------------------------------------ |
| GET    | `/leads`                | List leads (`?status=&page=&limit=`) |
| PATCH  | `/leads/:id`            | Update lead status                   |
| DELETE | `/leads/:id`            | Delete lead                          |
| GET    | `/registrations`        | List (`?type=&status=`)              |
| PATCH  | `/registrations/:id`    | Update status                        |
| DELETE | `/registrations/:id`    | Delete                               |
| GET    | `/subscribers`          | List subscribers                     |
| DELETE | `/subscribers/:id`      | Delete subscriber                    |
| GET    | `/gallery`              | List all gallery items               |
| POST   | `/gallery`              | Create (file upload or `imageUrl`)   |
| PATCH  | `/gallery/:id`          | Update / replace image               |
| DELETE | `/gallery/:id`          | Delete (removes uploaded file)       |
| GET/POST/PATCH/DELETE | `/testimonials[/:id]` | Manage testimonials      |
| GET/POST/PATCH/DELETE | `/events[/:id]`       | Manage events            |

**Gallery upload** — send `multipart/form-data` with an `image` file field (plus
optional `title`, `category`, `order`, `published`). Uploaded files are served from
`/uploads/...`. Alternatively send JSON with an `imageUrl` to use an external image.

```bash
# login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@ionix.com","password":"ChangeThisPassword123!"}' | jq -r .token)

# upload a gallery photo
curl -X POST http://localhost:5000/api/admin/gallery \
  -H "Authorization: Bearer $TOKEN" \
  -F image=@./photo.jpg -F title="League Finals" -F category="cricket"
```

## Connecting the frontend

The Vite frontend should call the API via an env var, e.g. add to the project root
`.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Then in the frontend use `import.meta.env.VITE_API_URL`. Make sure the frontend's
dev origin (`http://localhost:5173`) is listed in the backend's `CLIENT_ORIGINS`.

## Project structure

```
backend/
  src/
    config/       env loading + Mongo connection
    models/       Mongoose schemas
    middleware/   auth, validation, errors, rate-limit, uploads
    controllers/  request handlers
    routes/       public / auth / admin route tables
    validators/   express-validator rule sets
    utils/        asyncHandler, ApiError, pagination
    scripts/      seedAdmin
    app.js        express app
    server.js     entrypoint (DB connect + listen)
  uploads/        user-uploaded gallery images (git-ignored)
```
