/**
 * This file will deal with authentication and login
 */
const express = require("express")
const router = express.Router()


/**
 * @route GET api/user/test 
 * @desc Test GET ROUTE
 * @access Public
 **/
router.get('/test', (req, res, next) => {
    res.send('Hello World123')
})

module.exports = router;
