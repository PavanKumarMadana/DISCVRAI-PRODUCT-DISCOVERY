require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const productsRoutes = require('./routes/products.routes');
const askRoutes = require('./routes/ask.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/ask', askRoutes);

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Serve frontend build (if present) so app can be deployed as a single unit.
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
if (fs.existsSync(buildPath)) {
	app.use(express.static(buildPath));

	// Send index.html for non-API routes
	app.get('*', (req, res, next) => {
		if (req.path.startsWith('/api') || req.path.startsWith('/sockjs-node')) return next();
		res.sendFile(path.join(buildPath, 'index.html'));
	});
} else {
	// Root JSON fallback when no frontend build is present
	app.get('/', (req, res) => res.json({ ok: true }));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
