const express = require('express');
const app = express();

const to = require('await-to-js').default;

const Request = require('../../../models/Request');
const transporter = require('../../../init/MailerInit');

app.post('/', [], async (req, res) => {

    const {
        name,
        surname,
        email,
        phoneNumber,
        text,
        confirmed
    } = req.body;
    console.log('req.body: ', req.body);

    let [err, request] = await to(
        new Request({
            name,
            surname,
            email,
            phoneNumber,
            text,
            confirmed: confirmed || false
        }).save()
    );
    if (err) throw err;

    const mailOptions = {
        from: 'cooltrainings@gmail.com',
        to: request.email,
        subject: 'cooltraining Email Confirmation',
        text: 'Please, confirm your email',
        html: `
<h2>Please, confirm your email</h2>
<a href=${'http://localhost:3000/confirm/' + request._id} style="font-size: 18px">Click here to confirm</a>
`
    }

    if(!confirmed)
        transporter.sendMail(mailOptions, err => console.log(err));

    res.send({
        success: true,
    });

});

module.exports = app;