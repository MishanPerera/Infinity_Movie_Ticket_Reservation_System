const express = require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Reservation= require('../Models/Reservation');

// Get All Reservation Details By User ID
router.get('/get-reservation/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Reservation.find({userId : req.params.id},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Movie Details :" +JSON.stringify(err,undefined,2));
    })
})

router.get('/get-adminreservation/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Reservation.find({movieUserId : req.params.id},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Movie Details :" +JSON.stringify(err,undefined,2));
    })
})

// Get All Reservation Details
router.get('/get-reservation',(req,res)=>{
    Reservation.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Movie Details :'+JSON.stringify(err,undefined,2));
    })
})

// Add Reservation Details
router.post('/add-reservation',(req,res)=>{
    const { userId, movieId ,name, showDate, showTime, showTheatre,movieUserId} = req.body;

        const newReservation= new Reservation({
            userId, 
			movieId,
			movieUserId,
			name, 
			showDate,
			showTime, 
			showTheatre
        });
        newReservation.save();
        
        return res.status(200).json({msg : 'Reservations has been made'});
    }
)

//Update Reservation Details
router.put('/update-reservation/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Reservation Details with given id : $(req.params.id)`);
    
    const app = {
        name : req.body.name, 
        description: req.body.description, 
        amount: req.body.amount,
        movieList: req.body.movieList
    }

    Reservation.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Reservation Details :" +JSON.stringify(err,undefined,2));
    });
})

// Delete Movie Details
router.delete('/delete-reservation/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Reservation Details with given id : ${req.params.id}`);
    
    Reservation.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Reservation Details :" +JSON.stringify(err,undefined,2));
    })
})

module.exports = router;