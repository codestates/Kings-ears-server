const { secret } = require('../../models');

module.exports = async (req, res) => {
    const id = Number(req.params.id);
    const Oplike = Number(req.headers.likeCount);
    const Opdislike = Number(req.headers.dislikeCount);

    const target = await secret.findOne({
        where: { id: id }, raw: true
    })

    const { likeCount, dislikeCount } = target

    await secret.update({
        likeCount: likeCount + Oplike,
        dislikeCount: dislikeCount + Opdislike
    }, { where: { id: id }})

    res.status(200).send({
        message: "OK"
    })
}