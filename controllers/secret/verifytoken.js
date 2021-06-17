const { verifyAccessToken } = require('../../token');

module.exports = async (req, res) => {
    const userToken = await verifyAccessToken(req);

    if (userToken !== null) {
        res.status(200).send()
    } else {
        res.status(403).send()
    }
}