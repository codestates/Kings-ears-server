const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: '120s' })
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
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        const token = authorization.split(" ")[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    },
}
