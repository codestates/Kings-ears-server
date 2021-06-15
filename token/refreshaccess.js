const { verifyrefreshToken, generateAccessToken, sendAccessToken } = require('./index.js');
const { user } = require('../models')

module.exports = {
    refreshaccess: async (req, res) => {
        const refreshToken = verifyrefreshToken(req);

        if (refreshToken === null) {
            res.status(403).send()
        } else {
            const userEmail = refreshToken.email;
            const userInfo = await user.findOne({
                where: {
                    email: userEmail
                }, raw: true
            })
            if (!userInfo) {
                res.status(403).send()
            } else {
                delete userInfo.password
                const accessToken = generateAccessToken(userInfo);

                sendAccessToken(res, accessToken);
            }
        }
    }
}