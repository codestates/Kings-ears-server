const { user } = require("../../models");
const { secret } = require("../../models");
const { verifyAccessToken } = require("../../token")

module.exports = async(req, res) => {
    
    const { content } = req.body;
    const userToken = await verifyAccessToken(req);

    const userInfo = await user.findOne({
        where: {
            username: userToken.username,
            id: userToken.id
        }, raw: true
    })
    if(!userInfo){
        res.status(403).send({
            message: "invalid token"
        })
    }else{
        await secret
            .create({
                content: content,
                userId: userToken.id
            })
            res.status(201).send({
            message: "new secret created"
            })
        //안되면 increment("coin", {by: 1})
        await user
            .update({
                coin: userInfo.coin + 1
            },{
                where:{id: userToken.id}
            })
    }
}