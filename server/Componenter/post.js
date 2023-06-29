const handleTablePosts = (req, res, knex, jwt, dotenv) => {
	dotenv.config()
	/*var chef = null;
	if (req.headers && req.headers.authorization) {
		var authorization = req.headers.authorization.split(' ')[1],
			decoded;
		try {
			decoded = jwt.verify(authorization, process.env.SECRET_OR_KEY);
		} catch (e) {
			return res.status(401).send('unauthorized');
		}
		decoded.role === 'USER!' || 'ADMIN' ? chef = true : res.status(403).send('nix');

	} else {
		return res.status(403).send('token mangler');
	}

	if (!chef) { return res.status(403).send('nix'); }*/
	const sektion = 'sektion'
	const raekke = 'raekke'
	const saede = 'saede'
	const { sektionsnavn, pris, status, raekkeid, saedeid } = req.body;
	knex(sektion)
		.insert(sektionsnavn).then((sektionid) => {
			knex(raekke)
				.insert({ id: raekkeid, pris, sektionsid: sektionid.id })
		}).then(() => {
			knex(saede)
				.insert({ id: saedeid, status, raekkeid: raekkeid })
		}).then((result) => {
			res.status(200).send(result)
		})
		.catch(err => res.status(400).json(err))
}

module.exports = {
	handleTablePosts
};