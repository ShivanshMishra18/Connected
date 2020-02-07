const express = require('express')
const router = express.Router()

// @router  GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req,res) => {
    res.send({
        msg: 'Working router profile'
    })
})

module.exports = router