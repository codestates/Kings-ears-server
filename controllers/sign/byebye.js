const { user, secret, users_secret } = require('../../models');
const { verifyrefreshToken } = require('../../token');

module.exports = async (req, res) => {
    console.log('@@@@@@@@@@@@@@@@@@@', req.headers)
    const userToken = await verifyrefreshToken(req)
    console.log('###############', userToken)

    if (userToken === null) {
        res.status(403).send()
    } else {
        const userPass = req.headers.password;
        const email = userToken.email;

        const userInfo = await user.findOne({
            where: {
                email: email,
                password: userPass
            }, raw: true
        })

        if (userInfo) {
            await secret.destroy({
                where: { userId: userInfo.id }
            })

            await user.destroy({
                where: { id: userInfo.id }
            })

            await users_secret.destroy({
                where: { userId: userInfo.id }
            })

            res.status(204).send()

        } else {
            res.status(403).send({
                message: 'AccessToken Expired'
            })
        }
    }
}