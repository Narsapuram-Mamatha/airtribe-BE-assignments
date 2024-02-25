const jwt = require('jsonwebtoken');
const userHelper = require('../src/helpers/UserHelper');

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.API_SECRET, async (err, decode) => {
            if (err) {
                req.user = undefined;
                req.message = "Authorization header verification failed";
                return next();
            }

            try {
                const users = await userHelper.getUsers();
                const foundUser = users.find(user => user.email === decode.id);

                if (foundUser) {
                    req.email= foundUser.email;
                    req.preferences= foundUser.preferences;
                    
                    req.message = "Found user successfully";
                    
                } else {
                    req.user = undefined;
                    req.message = "User not found";
                }
            } catch (searchError) {
                console.error('Error while searching for user:', searchError);
                req.user = undefined;
                req.message = "Error while searching for user";
            }

            next();
        });
    } else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
};

module.exports = {
    verifyToken,
};