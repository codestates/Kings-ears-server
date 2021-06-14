module.exports = async (req, res) => {
    const { Authorization } = req.headers

    if (!Authorization) {
        res.status(404).send({
            message: 'not authorized'
        })
    } else {
        await Authorization.update({ accessToken: null });
        // delete Authorization;
        await req.cookies.refreshToken.destroy();
        res.status(205).send({
            message: "logout complete"
        })
    }
}