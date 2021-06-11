const { user } = require("../../models");
const { secret } = require("../../models");

module.exports = async(req, res) => {
    
    const { content } = req.body;
    await secret
        .create({
            content: content
        })
        res.status(201).send({
        message: "new secret created"
        })

}