const sgMail = require('@sendgrid/mail')


function sendMail(mailID, subject, body) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: mailID, // recipient can be single mailID or an array of them
        from: process.env.SENDER_ID, // sender ID
        subject: subject,
        html: body
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log(`Email has been sent to the mail address ${mailID}`)
        })
        .catch((error) => {
            console.log(error.response.body.errors);
        });
}

module.exports = sendMail