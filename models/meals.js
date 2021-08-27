const mongoose = require('mongoose')

const userMealsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        day: {
            type: String
        },
        calorie: {
            type: Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId ,
            required: true
        },
        reminder: {
            type: Boolean,
            required: true
        },
    }

)

module.exports = mongoose.model('UserMeals', userMealsSchema)

