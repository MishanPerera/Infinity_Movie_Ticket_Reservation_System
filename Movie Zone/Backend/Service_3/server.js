const express = require('express');
const cors = require('cors');

const connectDB = require('./src/Config/DB');
const ReservationURLs = require('./src/Route/Reservation');

const app = new express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/',ReservationURLs);

app.listen('8002',(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log("Server is up and running")
});