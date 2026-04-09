module.exports = (req, res, next) => {
    const time = new Date().toISOString();

    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Time: ${time}`);
    console.log('--- Logger Middleware Executed ---');

    // Pass control to next middleware
    next();
};