require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
