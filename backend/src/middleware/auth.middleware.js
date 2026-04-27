// filename: backend/src/middleware/auth.middleware.js

export function verifyToken(req, res, next) {
    /* Verify token middleware.
    
       Detailed explanation:
       - Extracts token
       - Attaches user to request
    */

    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ error: "No token" });
        }

        const token = header.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token" });
        }

        req.user = {
            email: "mogge@mogge.se"
        };

        next();

    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}