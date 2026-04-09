const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/users', require('./routes/userRoutes'));

// Home route
app.get('/', (req, res) => {
    res.send('MongoDB CRUD API Running');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});