const jwt = require('jsonwebtoken');
const userHelper = require('../src/helpers/UserHelper');

const verifyUserRole = async (req, res, next, expectedRole) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');

        try {
            const decode = jwt.verify(token, process.env.API_SECRET);
            const users = await userHelper.getUsers();
            const foundUser = users.find(user => user.email === decode.id);

            if (foundUser && (expectedRole === undefined || foundUser.role === expectedRole)) {
                req.email = foundUser.email;
                req.role = foundUser.role;
                req.message = `Found ${expectedRole || 'user'} successfully`;
            } else {
                req.user = undefined;
                req.message = `User not found or not authorized as ${expectedRole || 'user'}`;
            }
        } catch (error) {
            console.error('Error during verification:', error);
            req.user = undefined;
            req.message = `Error during verification: ${error.message}`;
        }

        next();
    } else {
        req.user = undefined;
        req.message = 'Authorization header not found';
        next();
    }
};

const verifyAdmin = (req, res, next) => {
    verifyUserRole(req, res, next, 'admin');
};

const verifyOrganizer = (req, res, next) => {
    verifyUserRole(req, res, next, 'organizer');
};

const verifyUser = (req, res, next) => {
    verifyUserRole(req, res, next, 'user');
};

module.exports = {
    verifyAdmin,
    verifyOrganizer,
    verifyUser,
};