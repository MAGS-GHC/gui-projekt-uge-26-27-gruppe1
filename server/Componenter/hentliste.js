const handleListe = (req, res, db, table) => {

    db(table)
        .select('*')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('unable to get entries ' + err))
}

module.exports = {
    handleListe
};