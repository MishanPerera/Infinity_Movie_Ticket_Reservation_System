const express = require('express');
const cors = require('cors');

const connectDB = require('./src/Config/DB');
const MovieURL = require('./src/Route/Movie');

const app = new express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/',MovieURL);

app.listen('8001',(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log("Server is up and running")
})