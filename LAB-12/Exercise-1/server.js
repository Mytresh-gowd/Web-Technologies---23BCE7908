// Import express
const express = require('express');

// Create app
const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to REST API Server');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});