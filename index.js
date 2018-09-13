const express = require('express')
const app = express()
const router = require('./app/routes')

const mongo = require('./app/mongodb')
const configMongoDB = require('./app/config/mongodb')

const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//set port
const port = process.env.PORT || 8080

//initialize dotenv
dotenv.config()

//parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//parse cookies
app.use(cookieParser())

//register routes
app.use(router)

//start mongo connection, then start express app
mongo.connect(process.env.MONGODB_URL)
    .then(() => configMongoDB(app))
    .then(() => app.listen(port))
    .then(() => console.log(`Magic happens on: ${port}`))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })