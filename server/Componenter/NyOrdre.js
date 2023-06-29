const opretetOrdre = (req, res, knex, dotenv) => {
    dotenv.config()

    const kunde = 'kunde'
    const ordre = 'ordre'
    const saede = 'saede'

    const { beloeb, saedestatus, ordrestatus, saedeid, navn, email, antal } = req.body;
    knex(kunde)
        .insert(navn, email).then((kunde) => {
            knex(ordre)
                .insert({ kundeid: kunde.id, beloeb, antal, ordrestatus, madbillet: false })
        }).then((ordre) => {
            knex(saede).where({ id: saedeid }).update({
                status: saedestatus,
                ordreid: ordre.id
            })
        }).then((result) => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    opretetOrdre
};