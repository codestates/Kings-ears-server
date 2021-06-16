const { user } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../../token');
const { Op } = require("sequelize");

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

        const secrets = await secret.count({
            where: { userId: { [Op.eq]: uid } }
        })

        const rank = await secret.findOne({
            attributes: ['userId', [sequelize.fn('count', '*'), 'secretCount']],
            group: 'userId',
            order: [[sequelize.col('secretCount'), 'DESC']],
            include: [{ model: user, attributes: ['username'] }]
        })
        const kingdonkey = rank.user.username;
        if (kingdonkey === userInfo.username) {
            secrets = 9999
        }

        const username = userInfo.username;

        sendRefreshToken(res, refreshToken)
        res.status(200).send({
            message: 'OK',
            data: { username, secrets },
            accessToken: accessToken
        })
    }

}