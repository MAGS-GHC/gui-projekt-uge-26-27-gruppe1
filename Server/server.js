const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');

//const nodemailer = require('nodemailer');
//const inLineCss = require('nodemailer-juice');
const upload = require('express-fileupload')

const post = require('./Componenter/post');

const path = require('path')
const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

if (!dbUsername) {
    throw new Error('DB_USERNAME environment variables must be set');
}

if (!dbPassword) {
    throw new Error('DB_PASSWORD environment variables must be set');
}

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

const bookshelf = require('bookshelf');
const securePassword = require('./middleware/bookshelf-secure-password');
const db = bookshelf(knexDb);
db.plugin(securePassword);

const User = db.Model.extend({
    tableName: 'brugere',
    hasSecurePassword: true
});

const PORT = process.env.PORT || 3005;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

app.use(upload({
    createParentPath: true
}));

app.use(express.static(__dirname, {
    extensions: ["html", "htm", "gif", "png"],
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const strategy = new JwtStrategy(opts, (payload, next) => {
    User.forge({ role: payload.role, id: payload.id }).fetch().then(res => {
        next(null, res);
    });
});

const serverPath = '/vff'

//const dateZero = (d) => d < 10 ? '0' + d : '' + d

//const fileName = dateZero(new Date().getDate()) + dateZero(new Date().getMonth() + 1) + new Date().getFullYear() + '_'
//console.log(fileName)

passport.use(strategy);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

//const auth = passport.authenticate('jwt', { session: false });

//bruger

//app.post(serverPath + '/newuser', auth, async (req, res) => { register.handleRegister(req, res, User, jwt, dotenv, knexDb, fileName) });//opret bruger

//app.post(serverPath + '/login', (req, res) => { signin.handleSignin(req, res, knexDb, bcrypt, jwt, dotenv) });//login

app.post(serverPath + '/opretsaeder', (req, res) => { post.handleTablePosts(req, res, knexDb, jwt, dotenv) })//opret sæder

app.get(serverPath + '/hentsaeder', (req, res) => { post.handleTablePosts(req, res, knexDb, jwt, dotenv) })//hent sæder

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});