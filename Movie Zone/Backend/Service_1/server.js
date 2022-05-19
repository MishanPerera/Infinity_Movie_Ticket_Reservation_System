const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/DB');

const SignUpURL = require('./src/Route/SignUp');
const SignInURL = require('./src/Route/SignIn');

const app = new express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/',SignInURL);
app.use('/',SignUpURL);

app.listen('8000',(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log("Server is up and running")
})