const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header("auth-token");

    if(!token) return res.status(200).json({ success: false, msg: 'No Token' });

    try {
        const verifiedUser = jwt.verify(token, 'haider1234$');
        req.user = verifiedUser;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(200).json({ success: false, msg: 'Invalid Token' })
    }
}