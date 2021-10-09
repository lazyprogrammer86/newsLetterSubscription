const express = require('express')
const port = 3000 || process.env.PORT //port number setting
const app = express();
const automate = require('./function/automation')

app.use(express.json())
app.use(require('./routes'))

automate.start(); //trigerring the cronjob 

app.listen(port, (err) => { //port configuration to listen on specified port number
    if (err) {
        console.log(err)
    }
    console.log('Service up and running on port:' + port)
})