const jwt = require('jsonwebtoken');
const { User } = require('./models/UserModel');
const { Role } = require('./models/Role');

exports.authenticator = async (req, res, next) => {
    const token = req.query.token || req.headers.authorization;

    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Access denied.' });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied.' });
    }
};

exports.isAdmin = async (req, res, next) => {
    const token = req.query.token || req.headers.authorization;

    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Access denied.' });
            } else {
                const userEmail = decoded && decoded.email;

                try {
                    const user = await User.findOne({ where: { email: userEmail } });

                    if (user && user.role === 'ADMIN') {
                        next();
                    } else {
                        res.status(403).json({ error: 'Permission denied. User is not an admin.' });
                    }
                } catch (dbError) {
                    console.error(dbError);
                    res.status(500).json({ error: 'Internal Server Error.' });
                }
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied.' });
    }
};
