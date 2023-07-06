const opdatersaede = (req, res, knex, dotenv) => {
    dotenv.config()
    const saede = 'saede'

    const { saedestatus, ordreid, raekkeid } = req.body;
    const { saedeid } = req.params;

    knex(saede).where({
        raekkeid: raekkeid,
        id: saedeid
    }).update({
        saedestatus,
        ordreid
    }).then((result) => {
        res.status(200).send(result[0])
    })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    opdatersaede
};
