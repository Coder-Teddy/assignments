const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const {username, password} = req.headers

    Admin.findOne({ username: username, password: password }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
    })
}

module.exports = adminMiddleware;