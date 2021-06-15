const { user, secret, users_secret } = require('../../models');
const { verifyAccessToken } = require('../../token');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);

    if (userToken === null) {
        res.status(403).send({
            message: "AccessToken Expired"
        })
    } else {
        const uid = userToken.id
        const userInfo = await user.findOne({
            where: { id: uid }, raw: true
        });
        if (!userInfo) {
            res.status(404).send({
                message: 'no user data'
            })
        } else {
            //내가 본 글 query
            const data = await secret.findAll({
                where: { userId: { [Op.ne]: uid } }, raw: true,
                include: [{
                    model: users_secret
                }]
            });
            const data2 = data.filter(el => {
                if (el['users_secrets.userId'] === uid) {
                    return el
                }
            });

            const sortArr = data2.sort((a, b) => b['users_secrets.createdAt'] - a['users_secrets.createdAt']);
            const viewsecret = sortArr.slice(0, 4)

            //내가 쓴 글 query
            const data3 = await secret.findAll({
                where: { userId: { [Op.eq]: uid } }, raw: true,
            })
            const sortArr1 = data3.sort((a, b) => b['secret.createdAt'] - a['secret.createdAt']);
            const mysecret = sortArr1.slice(0, 4)

            //비밀글수 query
            const secretLen = data3.length

            //유저네임 query
            const data4 = await user.findOne({
                attributes: ['username'],
                where: { id: uid }, raw: true,
            })
            res.status(200).send({
                message: "OK",
                data: {
                    username: data4.username,
                    secrets: secretLen,
                    viewsecret,
                    mysecret
                }
            })
        }
    }
}
