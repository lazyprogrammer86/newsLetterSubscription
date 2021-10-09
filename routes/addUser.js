const router = require('express').Router()
const user = require('../mongo/userSchema')
const sendMail = require('../function/emailWorker')

//API to register new user and update an existing user
router.post('/newsLetter/subscribe', (req, res) => {
    const {
        mailID,
        status
    } = req.body //destructuring body 


    user.findOneAndUpdate({ //finding one document using mailID
        mailID: mailID
    }, {
        $set: {
            status: status //setting the status
        }
    }, {
        new: true, // getting the updated document
        upsert: true //inserting the document if it does not exist in the DB

    }).then((doc) => {
        console.log(doc)

        let subject = doc.status ? 'Subscribed' : 'Unsubscribed'
        let message = doc.status ? `<h3>Yay !</h3> <h3>You are successfully enrolled for news letter and you will be reciving it on every day at 5 in the morning</h3> ` : `<h3>You are no longer enrolled for the news letter</h3>`

        sendMail(doc.mailID, subject, message);
        res.status(200).send('Process successful') //responding with success

    }).catch(err => {
        console.log(err) //error handler
        res.status(500).send("There has been error , Please try again later")
    })
})


module.exports = router;