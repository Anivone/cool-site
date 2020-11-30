const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emailforsometrash263@gmail.com',
        pass: 'TrashEmail1221'
    }
});

module.exports = transporter;