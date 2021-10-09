const router = require('express').Router();

router.use('/API', require('./addUser'))

module.exports = router;