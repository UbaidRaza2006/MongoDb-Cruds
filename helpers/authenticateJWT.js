const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateJWT= async (req, res , next) => {
console.log('req.headers-->',req.headers);
try{
    const token = req.headers?.authorization?.split(' ')[1]
    console.log('token-->', token)

    if (token) {
        console.log('errrrrrrrrrrrrrrrr')

        const isVerified =  jwt.verify(token,
            process.env.JWT_SECRET)
console.log('isVerified',isVerified);
        if (isVerified && isVerified.data) {
            req.user = isVerified.data
            console.log(req.user);
            next()
        }
    }
    else {
        console.log('errrrrrrrrrrrrrrrr')
        res.status(403).send({
            error: true,
            msg: 'Token not valid',
            status: 403
        });
    }
} catch (err) {
    res.status(403).send({
        error: true,
        msg: 'Internal Server Error',
        status: 403
    });
}


}


module.exports = authenticateJWT