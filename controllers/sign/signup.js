const { user } = require("../../models");

module.exports = async (req, res) => {
    const { email, username, password } = req.body;

    const emailInfo = await user.findOne({
        where: { email: email }
    })
    const userInfo = await user.findOne({
        where: { username: username }
    })
    if (!emailInfo && !userInfo) {
        await user.create({
            email: email,
            username: username,
            password: password
        })
        res.status(201).send({
            message: 'OK',
            data: { username: username }
        })
    } else if (emailInfo) {
        res.status(409).send({
            message: 'email exist'
        })
    } else if (userInfo){
        res.status(409).send({
            message: 'username exist'
        })
    }
}