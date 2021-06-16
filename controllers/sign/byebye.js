const { user, secret, users_secret } = require('../../models');
const { verifyrefreshToken } = require('../../token');
const { comparebcrypt } = require('../../bcryptmodule')

module.exports = async (req, res) => {
    const userToken = await verifyrefreshToken(req)

    if (userToken === null) {
        res.status(403).send()
    } else {
        const userPass = req.headers.password;
        const email = userToken.email;

        const userInfo = await user.findOne({
            where: {
                email: email
            }, raw: true
        })
        const dbpass = userInfo.password;
        // const pass = bcrypt.compareSync(password, dbpass);

        if (userInfo && await comparebcrypt(userPass, dbpass)) {
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