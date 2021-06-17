const { verifyrefreshToken, generateAccessToken, sendAccessToken } = require('../../token');
const { user } = require('../../models')

module.exports = async (req, res) => {
    const refreshToken = verifyrefreshToken(req);
    
    if (refreshToken === null) {
        res.status(403).send({
            message: 'RefreshToken Expired'
        })
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