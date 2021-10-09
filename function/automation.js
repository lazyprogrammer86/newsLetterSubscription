const cron = require('node-cron')
const user = require('../mongo/userSchema')
const sendToMany = require('./email')

const automate = cron.schedule('1 1 5 * * *', () => { //trigger job on 1st seconde of 1st minute of 5 the hour of the day (5:01:01 AM)
    
    const subject = `News-letter from botspot AI`; //subject of the email
    
    //completer news letter wiht header in <h1> and body in <p>
    const message = `<h1>Lorem Ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing \
    elit. Morbi feugiat elit erat, eu pellentesque metus posuere vitae. Mauris lobortis, ligula \
    non interdum semper, magna enim scelerisque nunc, sit amet feugiat nulla diam non augue. Etiam \
    at felis ornare, vehicula arcu et, suscipit odio. Vestibulum ac tortor lectus. Donec blandit fringilla\
    vehicula. Pellentesque vitae tristique velit. Morbi suscipit quam posuere diam fermentum porttitor.\
    Cras eget lacus eget dolor volutpat malesuada sed sit amet est. Nam ante nisi, cursus non porta at,\
    pretium sed lectus. Nam eget dui facilisis, viverra felis ut, dignissim orci. Pellentesque habitant \
    morbi tristique senectus et netus et malesuada fames ac turpis egestas. In ut erat feugiat dui tincidunt\
    viverra ut eget nisi. Ut nulla odio, semper vel ipsum in, porta tristique nibh. Integer non luctus diam.\
    Quisque eros ex, egestas eu sodales vel, efficitur nec lectus. Sed efficitur a odio vel laoreet.\
    Nullam et lacinia metus. Ut vel blandit mauris, nec semper sem. Pellentesque nibh lacus, posuere \
    ac pellentesque in, suscipit eu sem. Phasellus sit amet aliquam metus. Duis consequat mattis orci,\
    in porttitor sapien mollis et. Integer vehicula metus metus. Praesent consectetur vehicula risus, \
    quis euismod neque volutpat in. Aenean tortor dui, facilisis semper turpis in, lacinia consequat magna.\
    Cras maximus augue at condimentum pellentesque. Fusce id dolor vitae lectus pretium posuere ut at velit. \
    Aliquam id rhoncus risus. Sed id auctor odio. Integer at viverra turpis, in sagittis odio.</p>`
    
    user.distinct('mailID', { //reading out only the mailID
            status: true //filtering based on status
        }).then(mailingList => { 
            sendToMany(mailingList, subject, message) // mailing process
        })
        .catch(err => { //error check
            console.log(err)
        })
}, {
    scheduled: false //initially set to false unless specified to be true
})

module.exports = automate;