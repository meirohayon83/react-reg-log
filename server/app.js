const express = require('express')

const usersRoute = require('./router/users')
const cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use(cors({ origin:"*"}))
app.use(express.urlencoded());
 app.use( '/uploads' , express.static('uploads'))

const dotenv = require('dotenv')
dotenv.config();

// the link to post your profile

// the link to make reg login forgetPassword
app.use('/',usersRoute );




app.listen(3334 ,() => console.log("server up"))