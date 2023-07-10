const hentsaeder = (req, res, db) => {

    db('sektion')
        .select('id', 'sektionnavn')
        .then(sektion => {
            db('raekke').join('saede', 'raekke.id', '=', 'saede.raekkeid')
                .select('raekke.id as raekkeid', 'raekke.pris as price', 'saede.id', 'saede.saedestatus', 'saede.ordreid')
                .where('raekke.sektionsid', sektion[0].id)
                .as('raekke').orderBy([
                    { column: 'raekkeid' },
                    { column: 'saede.id' }
                ])
                .then((saede) => {
                    const hentetdata = {
                        "sektionsnavn": sektion[0].sektionnavn,
                        "saeder": saede
                    }
                    res.status(200).json(hentetdata)
                })
        })
        .catch(err => res.status(400).json('unable to get entries ' + err))
}

module.exports = {
    hentsaeder
};