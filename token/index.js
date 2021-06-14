const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: '120' })
    },
    generateRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: '5d' })
    },
    sendAccessToken: (res, accessToken) => {
        try {
            res.set('Connection', 'close')
            res.status(200).send({
                message: 'OK',
                accessToken: accessToken
            })
        }
        catch {
            res.status(404).send({
                err,
                message: 'err'
            })
        }
    },
    sendRefreshToken: (res, refreshToken) => {
        res.cookie("refreshToken", refreshToken);
    },
    verifyAccessToken: (req) => {
        const token = req.headers.Authorization.split(' ')[1]
        return verify(token, process.env.ACCESS_SECRET)
    }
}
