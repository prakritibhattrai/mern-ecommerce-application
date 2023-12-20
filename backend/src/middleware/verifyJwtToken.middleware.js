const token = require('jsonwebtoken')

const jwtAuth = async (req, res, next) => {
    // Extract the Bearer token from the Authorization header
    const token = req.header('Authorization');
    if (!token) {
        // If no token is provided, return an unauthorized response
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    const secretKey = process.env.SERCRET_KEY
    // Verify the token
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            // If token verification fails, return a forbidden response
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        // Attach the decoded user information to the request for further processing
        req.user = decoded;
        // Call the next middleware or route handler
        next();
    })
}

module.exports = verifyJwtToken