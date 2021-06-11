const { user, secret, users_secret } = require('../../models');
const { verifyAccessToken } = require('../../token');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);
    const uid = userToken.id
    const userInfo = await user.findOne({
        where: { id: uid }, raw: true
    });

    if (userInfo.coin === 0) {
        res.status(404).send({
            message: 'no coin'
        });
    } else {
        await user.update({
            coin: userInfo.coin - 1
        }, { where: { id: uid } })
        
        const data = await secret.findAll({
            where: { userId: { [Op.ne]: uid }}, raw:true,
            include: [{
                model: users_secret
            }]
        });

        const data2 = data.filter(el => {
            if (el['users_secrets.userId'] !== uid) {
                return el
            }
        });

        let len = data2.length;
        let idx = Math.floor(Math.random() * (len))
        const { username, content, likecount, dislikecount } = data2[idx]

        res.status(200).send({
            message: 'OK',
            data: {
                writer: username,
                content,
                likecount,
                dislikecount
            }
        })
    }
}