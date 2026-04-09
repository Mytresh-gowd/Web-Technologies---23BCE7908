// Importing required module
const http = require('http');

// Define PORT
const PORT = 3000;

// Create Server
const server = http.createServer((req, res) => {
    
    console.log(`Request received for: ${req.url}`);

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Routing (basic)
    if (req.url === '/') {
        res.write('<h1>Welcome to Home Page</h1>');
    } 
    else if (req.url === '/about') {
        res.write('<h1>About Page</h1>');
    } 
    else {
        res.write('<h1>404 - Page Not Found</h1>');
    }

    // End response
    res.end();
});

// Run server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});