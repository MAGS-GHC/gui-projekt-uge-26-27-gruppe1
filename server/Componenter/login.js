const handleSignin = (req, res, knexDb, bcrypt, jwt, dotenv) => {
    dotenv.config();
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    const loadUser = () => {
        return knexDb.select('id', 'name', 'email').from('kunde')
            .where('email', '=', email)
            .then(user => {
                const id = user[0].id;
                const name = user[0].name;
                const email = user[0].email;
                const token = jwt.sign({ role: role, id: id }, process.env.SECRET_OR_KEY);
                const payload = { role: role, auth: true, token: token, id: id, name: name, email: email, birthdate: birthdate, gender: gender, last_login: last_login, language: language, country: country };
                res.status(200).send(payload);
            })
            .catch(err => res.status(400).json('unable to get user ' + err))
    }

    knexDb.select('email', 'userpassword').from('kunde')
        .where('email', '=', email)
        .then(data => {
            data[0] === undefined ? res.status(400).send('email') : (
                bcrypt.compareSync(password, data[0].userpassword) === true ?
                    loadUser() : res.status(400).send('password'))
        })
        .catch(err => res.status(400).json(err));
}


module.exports = {
    handleSignin
};