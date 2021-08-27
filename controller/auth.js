const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

exports.signupUser = async (req,res) => {

    const error = validationResult(req)

    if(!error.isEmpty()) {
        return res.status(422).json({
            errors: error.array()[0].msg
        })
    }
    const user = new User(req.body)
    try{
        await user.save()
            .then(async (user) => {
                const token = await user.generateAuthToken()
                const { _id, name, email } = user
                res.status(201).send({ user: {_id, name,email } , token})
            })
            .catch((e) => {res.status(400).send(e)})
    } catch(e) {
        res.status(400).send(e)
    }

}


exports.loginUser = async (req,res) => {

    const {email, password} = req.body

    try{
        User.findOne({ email }, async (err, user) => {
            if( err || !user){
                return res.status(400).json({
                    error: "User doesn't exist."
                })
            }
            bcrypt.compare(password, user.password)
                .then(async (res1) => {
                    if(res1 ){
                        const token = await user.generateAuthToken()
                        const { _id, name, email } = user
                        res.status(201).send({ user:{_id, name, email} , token})
                    }
                    else if(res1 === false){
                        return res.status(400).json({
                            errors: 'Email and password do not match.'
                        })
                    }
                })
                .catch((e) => console.log(e))
        })
    } catch(e) {
        res.status(400).send(e)
    }
}


exports.logoutUser = async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token )
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
}