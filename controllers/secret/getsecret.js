const { user, secret, users_secret } = require('../../models');
const { verifyAccessToken } = require('../../token');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);
    console.log('user Token ###############', userToken)
    if (userToken === null) {
        res.status(403).send({
            message: 'AccessToken Expired'
        })
    } else {
        const uid = userToken.id
        const userInfo = await user.findOne({
            where: { id: uid }, raw: true
        });
        if (userInfo.coin === 0) {
            res.status(404).send({
                message: 'no coin'
            });
        } else if (userInfo) {
            await user.update({
                coin: userInfo.coin - 1
            }, { where: { id: uid } })

            const data = await secret.findAll({
                where: { userId: { [Op.ne]: uid } }, raw: true,
                include: [{ model: users_secret }],
            });

            const data2 = data.filter(el => {
                if (el['users_secrets.userId'] !== uid) {
                    return el
                }
            });

            if (data2.length === 0) {
                res.status(204).send()
            } else {
                console.log('###################', data2)

                let len = data2.length;
                let idx = Math.floor(Math.random() * (len))

                let username = await user.findOne({
                    where: { id: data2[idx]['userId'] }, raw: true
                })
                username = username.username

                let secrets = await secret.count({
                    where: { userId: data2[idx]['userId'] }
                })

                console.log('@@@@@@@@@@@@@@@@@', username)
                const { content, likeCount, dislikeCount, id } = data2[idx]

                await users_secret.create({
                    userId: uid,
                    secretId: id
                })

                res.status(200).send({
                    message: 'OK',
                    data: {
                        id,
                        writer: username,
                        secrets,
                        content,
                        likeCount,
                        dislikeCount
                    }
                })
            }
        }
    }
}