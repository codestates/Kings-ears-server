const { user } = require("../../models");
const { secret } = require("../../models");
const { verifyAccessToken } = require("../../token")

module.exports = async (req, res) => {

    const userToken = await verifyAccessToken(req)
    console.log('@@@@@@@@@@@@@@@@@@@', userToken)
    if (userToken === null) {
        res.status(403).send({
            message: "AccessToken Expired"
        })
    } else {
        const userInfo = await user.findOne({
            where: {
                username: userToken.username,
                id: userToken.id
            }, raw: true
        })
        if (!userInfo) {
            res.status(403).send({
                message: "invalid token"
            })
        } else {
            const { content } = req.body;
            
            await secret.create({
                content: content,
                userId: userToken.id
            })

            await user.update({
                coin: userInfo.coin + 1
            }, {
                where: { id: userToken.id }
            })
            res.status(201).send({
                message: "new secret created"
            })
        }
    }
}