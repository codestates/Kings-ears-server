const { user } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../../token');

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await user.findOne({
        where: { email: email, password: password } , raw: true
    })
    if (!userInfo) {
        res.status(404).send({
            message: 'No user data'
        })
    } else {
        delete userInfo.password;
        const accessToken = await generateAccessToken(userInfo);
        const refreshToken = await generateRefreshToken(userInfo);

        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);
    }
}