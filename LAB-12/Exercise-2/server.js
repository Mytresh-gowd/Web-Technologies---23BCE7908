const express = require('express');
const app = express();

// Import middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

// Import routes
const userRoutes = require('./routes/userRoutes');

// Built-in middleware
app.use(express.json());

// -----------------------------
// Global Middleware
// -----------------------------
app.use(logger);

// -----------------------------
// Route-level Middleware
// -----------------------------
app.use('/users', auth, userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Middleware Demo Home Page');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});