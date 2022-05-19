const express = require('express');
const cors = require('cors');

const connectDB = require('./src/Config/DB');
const cartURLs = require('./src/Route/Cart');

const app = new express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/', cartURLs);

app.listen('8003',(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log("Server is up and running")
});