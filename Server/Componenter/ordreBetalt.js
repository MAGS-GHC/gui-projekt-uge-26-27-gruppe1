const betaltbilletter = (req, res, knex, dotenv, nodemailer, mailcss) => {
    dotenv.config()

    const ordre = 'ordre'
    const saede = 'saede'
    const { saedestatus, ordrestatus, saedeid, ordreid, email, navn } = req.body;

    const handleEmail = () => {
        const output = `
              <p>You have a new contact request</p>
              <h3>Contact Details</h3>
              <br/>    
              Name: ${navn}
              <br/>
              Email: ${email}
              `;

        let transporter = nodemailer.createTransport({
            host: 'mail.itsmurf.dk',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'vff@itsmurf.dk',
                pass: 'MOJCh2Projekt2023'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: `Vff mail <vff@itsmurf.dk>`,
            to: `${email}`,
            subject: `From ${email}`,
            text: '',
            html: output
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                return console.log(info),
                    console.log('Message sent: %s', info.messageId),
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)),
                    res.render('contacts', { msg: 'Email has been sent' }),
                    main().catch(console.error);
            }
        });
        //res.writeHead(301, {Location:'index.html'});
        res.end();
    }

    knex(ordre).where({ id: ordreid })
        .update({ ordrestatus })
        .then(() => {
            knex(saede).where({ id: saedeid }).update({
                status: saedestatus
            })
        }).then(() => {
            handleEmail()
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    betaltbilletter
};