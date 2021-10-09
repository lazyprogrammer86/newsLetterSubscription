const sendMail = require('./emailWorker')

const sendToMany = (mailingList, subject, body) => { //iterating through each element of the array

    mailingList.forEach(mailID => {

        sendMail(mailID, subject, body) //sending mail

    })
}

module.exports = sendToMany;