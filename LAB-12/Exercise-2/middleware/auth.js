module.exports = (req, res, next) => {
    console.log('--- Auth Middleware Executed ---');

    // Simple condition (dummy auth)
    const isAuthorized = true;

    if (isAuthorized) {
        next(); // Continue to next middleware/route
    } else {
        res.status(403).send('Access Denied');
    }
};