module.exports = async (req, res) => {
    const { authorization } = req.headers
    console.log('############$$$$$$$$', authorization)
    if (!authorization) {
        res.status(404).send({
            message: 'not authorized'
        })
    } else {
        delete authorization;
        res.cookie("refreshToken", '');
        res.status(205).send({
            message: "logout complete"
        })
    }
}