const { user } = require("../../models");
const { verifyAccessToken } = require("../../token")
const bcrypt = require("bcrypt")
const { comparebcrypt, hashbcrypt } = require('../../bcryptmodule')

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);
    
    if (userToken === null) {
        res.status(403).send({
            message: 'AccessToken Expired'
        })
    } else {
        const users = await user.findOne({
            where: {
                email: userToken.email,
                // password: req.body.currentpassword
            }, raw: true
        });

        const dbpass = users.password
        // const pass = bcrypt.compareSync(password, dbpass);

        if (!users && await !comparebcrypt( req.body.currentpassword, dbpass)) {
            res.status(404).json({ message: "Check your password" });
        } else {
            await user
                .update(
                    {
                        password: await hashbcrypt(req.body.newpassword)
                    },

                    { where: { email: users.email } },
                )
            res.status(200).json({ message: "PW Changed" });
        }
    }
}