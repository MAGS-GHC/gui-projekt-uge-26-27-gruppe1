const opretetOrdre = (req, res, knex, dotenv) => {
    dotenv.config()

    //const kunde = 'kunde'
    const ordre = 'ordre'

    const { beloeb, ordrestatus, email, antal } = req.body;

    knex(ordre)
        .insert({ email, beloeb, antal, ordrestatus, madbillet: false })
        .then((result) => {
            res.status(200).send(result[0] + "")
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    opretetOrdre
};