const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const inLineCss = require('nodemailer-juice');
const bcrypt = require('bcrypt')
const post = require('./Componenter/post');
const NyOrdre = require('./Componenter/NyOrdre');
const betaltbilletter = require('./Componenter/ordreBetalt');
const hent = require('./Componenter/hentliste');
const saede = require('./Componenter/opdaterSaeder');
const kunde = require('./Componenter/kunde');
const logind = require('./Componenter/login');

const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

if (!dbUsername) {
    throw new Error('DB_USERNAME environment variables must be set');
}

if (!dbPassword) {
    throw new Error('DB_PASSWORD environment variables must be set');
}
//til bruger login
const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const knex = require('knex');
const knexDb = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: dbUsername,
        password: dbPassword,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
});

//til bruger login
const bookshelf = require('bookshelf');
const securePassword = require('./middleware/bookshelf-secure-password');
const db = bookshelf(knexDb);
db.plugin(securePassword);

const User = db.Model.extend({
    tableName: 'kunde',
    hasSecurePassword: true
});

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};
const sletmidlertidigbruger = () => {
    console.log('bøh')
}

//setInterval(sletmidlertidigbruger, 36000000)//10 timer

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname, {
    extensions: ["html", "htm", "gif", "png", "css"],
}));

const serverPath = '/vff'
app.get(serverPath + '/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//til bruger login
const strategy = new JwtStrategy(opts, (payload, next) => {
    User.forge({ id: payload.id }).fetch().then(res => {
        next(null, res);
    });
});


passport.use(strategy);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());


//til bruger login
const auth = passport.authenticate('jwt', { session: false });

app.post(serverPath + '/newuser', async (req, res) => { kunde.opretKundeBruger(req, res, User, jwt, dotenv, knexDb) });//opret bruger

app.post(serverPath + '/login', (req, res) => { logind.bugerlogind(req, res, knexDb, bcrypt, jwt, dotenv) });//login

app.post(serverPath + '/opretsaeder', (req, res) => { post.handleTablePosts(req, res, knexDb, jwt, dotenv) })//opret sæder

app.post(serverPath + '/nyordre', (req, res) => { NyOrdre.opretetOrdre(req, res, knexDb, dotenv) })//opret ordre

app.put(serverPath + '/opdatersaeder/:saedeid', (req, res) => { saede.opdatersaede(req, res, knexDb, dotenv) })

app.put(serverPath + '/betalt', (req, res) => { betaltbilletter.betaltbilletter(req, res, knexDb, dotenv, nodemailer, inLineCss) })//betal billetter

app.get(serverPath + '/hentsaeder', (req, res) => { hent.hentsaeder(req, res, knexDb) })//hent sæder

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});