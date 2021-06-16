const { secret, user, sequelize } = require('../models');
const { Op } = require("sequelize")

module.exports = async (req, res) => {

    function getToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }
    const today = getToday()

    const rankOne = await secret.findOne({
        attributes: ['userId', [sequelize.fn('count', '*'), 'secretCount']],
        group: 'userId',
        order: [[sequelize.col('secretCount'), 'DESC']],
        include: [{ model: user, attributes: ['username'] }]
    })
    const kingdonkey = rankOne.user.username

    const todaysecret = await secret.count({
        where: { createdAt: { [Op.like]: `${today}%` } }
    })
    
    res.status(200).send({
        message: 'OK',
        data: {
            todaysecret,
            kingdonkey,
        }
    })
}