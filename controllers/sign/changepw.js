const { user } = require("../../models");
const { verifyAccessToken } = require("../../token")

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);
    const users = await user.findOne({
    where: {
        email: userToken.email,
        password: req.body.currentpassword
    }, raw: true
    });
    if (!users) {
        res.status(404).json({ message: "Check your password" });
    } else {
        await user
            .update(
            {
                password: req.body.newpassword,
            },

            { where: { email: users.email } },
            )
            res.status(200).json({ message: "PW Changed" });
    }
}