# Discvrai Product Discovery

Quick deploy notes to avoid runtime/proxy errors.

Prerequisites
- Node.js (16+)
- npm

Build & run (single-server deployment)
1. In `frontend` build UI:

```bash
cd frontend
npm ci
npm run build
```

2. On the server, set environment variables (example):

```bash
export OPENAI_API_KEY="sk_..."
export PORT=5000
```

3. Start backend which will also serve the frontend build:

```bash
cd backend
npm ci
node server.js
# or using pm2
pm2 start server.js --name discvrai
```

Notes
- The backend exposes `/api/products` and `/api/ask`. When the `frontend/build` folder exists, the backend will serve the static assets so the client can use relative `/api` paths without a CRA proxy.
- Ensure `OPENAI_API_KEY` is set if you plan to use the `/api/ask` LLM endpoint.
- For static-only deployments you may upload `frontend/build` to a static host (Vercel/Netlify/S3) and point the frontend's API calls to your backend URL.

Health checks
- `GET /health` returns `{ ok: true }`.

If you want, I can add a small `systemd` unit or `pm2` example file.

PM2 example
-----------
You can run the app with PM2 using the included `ecosystem.config.js`:

```bash
# install pm2 if needed
npm install -g pm2

# start the app (from project root)
pm2 start ecosystem.config.js --env production

# view logs
pm2 logs discvrai-backend

# ensure pm2 restarts on system boot
pm2 startup
pm2 save
```

Vercel / Frontend notes
-----------------------
If you deploy the frontend to Vercel and host the backend separately, set this environment variable in the Vercel project settings:

- `REACT_APP_API_URL` = `https://your-backend.example.com` (no trailing slash)

This ensures the frontend will call your backend's absolute URL instead of relying on the CRA proxy.
