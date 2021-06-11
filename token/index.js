const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: '30s' })
    },
    generateRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: '5d' })
    },
    sendAccessToken: (res, accessToken) => {
        res.status(200).send({
            message: 'OK',
            accessToken: accessToken
        })
    },
    sendRefreshToken: (res, refreshToken) => {
        res.cookie("refreshToken", refreshToken);
    },
    verifyAccessToken: (req) => {
        const token = req.headers.Authorization.split(' ')[1]
        return verify(token, process.env.ACCESS_SECRET)
    }
}
