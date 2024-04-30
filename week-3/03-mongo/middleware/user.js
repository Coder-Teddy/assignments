const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username, password} = req.headers

    User.findOne({ username: username, password: password }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
    })
}

module.exports = userMiddleware;