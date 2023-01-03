const express  = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const mongoLocalUrl = 'mongodb://127.0.0.1:27017/mean';
const postRouters = require('./routes/post')
const userRouters = require('./routes/user')

mongoose.connect(mongoLocalUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    }, error => {
        console.log('Connection failed', error);
    })

const app = express();

app.use(bodyParser.json())
app.use("/images", express.static(path.join("images")))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
})

app.use("/api/posts", postRouters);
app.use("/api/user", userRouters);

app.listen(() => {
    console.log(`Server is running on localhost:3000`);
})

module.exports = app;