const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique:true,
            required: true,
            trim: true,
            lowercase: true
        },
        tokens:[{
            token:{
                type:String,
                required: true
            }
        }]
        
        

    },{
        timestamps: true
    }
)


userSchema.pre('save' , async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id : user._id} , process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

module.exports = mongoose.model('User', userSchema)