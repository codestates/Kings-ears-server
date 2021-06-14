const { user, secret, users_secret } = require('../../models');
const { verifyAccessToken } = require('../../token');

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req)

    if (userToken) {
        await secret.destroy({
            where: { userId: userToken.id }, raw: true
        })

        await user.destroy({
            where: { id: userToken.id }, raw: true
        })

        await users_secret.destroy({
            where: { userId: userToken.id }, raw: true
        })
        
        res.status(204).send()
    } else {
        res.status(403).send({
            message: 'AccessToken Expired'
        })
    }
}