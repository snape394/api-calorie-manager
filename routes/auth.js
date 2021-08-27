const express = require('express')
const {check } = require('express-validator')
const { signupUser, loginUser,logoutUser } = require('../controller/auth')
const {userAuth} = require('../controller/middleware')

const router = express.Router()

router.post('/signupUser',[
    check('password', 'Password should be of atleast 7 characters.').isLength({min : 7}),
    check('password','Password should contain alpha-numeric characters.').isAlphanumeric(),
    check('email', 'Enter a valid e-mail address.').isEmail()
], signupUser)


router.post('/user/login',[
    check('email', 'Enter a valid e-mail address.').isEmail(),
    check('password', 'Password should be of atleast 7 characters.').isLength({min : 7})

], loginUser)


router.post('/user/logout', userAuth, logoutUser)

// router.post('/candidate/logout', candidateAuth, logoutCandidate)


module.exports = router