require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
// const userRoutes = require('./routes/user')
const mealsRoutes = require('./routes/meals')



const port = process.env.PORT || 4000
const app = require('express')();
const server = require('http').createServer(app);



mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        w: "majority",
    })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))
mongoose.Promise = global.Promise;


app.use(cookieParser())
app.use(express.json({
    limit: '50mb'
}));
app.use(cors({origin: '*'}))

app.use('/api', authRoutes)
// app.use('/api', userRoutes)
app.use('/api', mealsRoutes)


server.listen(port);

