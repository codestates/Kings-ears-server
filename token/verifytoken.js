const { verifyAccessToken } = require('./index.js');

module.exports = {
    verifyToken: async (req, res) => {
        const userToken = await verifyAccessToken(req);
        
        if (userToken === null) {
            res.status(403).send()
        } else {
            res.status(200).send()
        }
    }
}