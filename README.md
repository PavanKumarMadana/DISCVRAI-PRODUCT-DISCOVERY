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
