const { user } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendRefreshToken, sendAccessToken } = require('../../token');

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await user.findOne({
        where: { email: email, password: password }, raw: true
    })
    if (!userInfo) {
        res.status(404).send({
            message: 'No user data'
        })
    } else {
        delete userInfo.password;
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);

        sendRefreshToken(res, refreshToken)
        sendAccessToken(res, accessToken)
    }

}