const bugerlogind = (req, res, knexDb, bcrypt, jwt, dotenv) => {
    dotenv.config();
    const { brugernavn, password } = req.body;
    if (!brugernavn || !password) {
        return res.status(400).json('incorrect form submission');
    }

    const loadUser = () => {
        return knexDb.select('id', 'navn', 'brugernavn', 'email', 'adresse', 'postnr', 'mobil',).from('kunde')
            .where('brugernavn', '=', brugernavn)
            .then(user => {
                const id = user[0].id;
                const navn = user[0].navn;
                const email = user[0].email;
                const adresse = user[0].adresse;
                const postnr = user[0].postnr;
                const mobil = user[0].mobil;
                const token = jwt.sign({ id: id }, process.env.SECRET_OR_KEY);
                const payload = { auth: true, token: token, id, navn, email, adresse, postnr, mobil };
                res.status(200).send(payload);
            })
            .catch(err => res.status(400).json('unable to get user ' + err))
    }

    knexDb.select('brugernavn', 'userpassword').from('kunde')
        .where('brugernavn', '=', brugernavn)
        .then(data => {
            data[0] === undefined ? res.status(400).send('brugernavnet findes ikke') : (
                bcrypt.compareSync(password, data[0].userpassword) === true ?
                    loadUser() : res.status(400).send('forkert password'))
        })
        .catch(err => res.status(400).json(err));
}


module.exports = {
    bugerlogind
};