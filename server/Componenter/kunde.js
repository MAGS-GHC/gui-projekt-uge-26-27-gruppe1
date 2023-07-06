const opretKundeBruger = async (req, res, User, jwt, dotenv, knexDb) => {
    dotenv.config();
    const { email, navn, password, adresse, postnr, mobil, brugernavn } = req.body;
    if (!email || !navn) {
        return res.status(401).send('no fields');
    }
    //Math.random().toString(36).substring(2, 8)
    const newUser = async () => {
        const user = new User({
            navn: navn,
            email: email,
            password: password,
            brugernavn: brugernavn,
            adresse: adresse,
            postnr: postnr,
            mobil: mobil
        });
        return await user.save().then((newUser) => {
            const userid = { id: newUser.id };
            const token = jwt.sign(userid, process.env.SECRET_OR_KEY);
            const payload = { token: token, navn: newUser.navn, id: newUser.id, email: newUser.email };
            console.log(JSON.stringify(payload))
            res.status(200).json(payload);
        });
    }

    const m = 'email';
    const b = 'brugernavn'
    const where = (first, second) => knexDb('kunde').where(first, '=', second);
    const response = (reply, user) => res.status(409).send(reply + user);

    where(b, brugernavn).then((bruger) => {
        if (bruger.length != 0) {
            return response('brugernavn ', JSON.stringify(bruger[0].brugernavn))
        } else {
            where(m, email).then((brugermail) => {
                if (brugermail.length != 0) {
                    return response('email ', JSON.stringify(brugermail[0].email))
                } else {
                    try {
                        newUser()
                    } catch (e) {
                        if (e.errno == 1062) {
                            return res.status(409).json('duplicate entry');
                        } else {
                            return res.send('an error accurred');
                        }
                    }
                }
            })
        }
    });
}

module.exports = {
    opretKundeBruger
};
