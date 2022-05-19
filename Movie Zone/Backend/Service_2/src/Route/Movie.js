const express = require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Movie= require('../Models/Movie');

// Get All Movie Details By User ID
router.get('/get-movie/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Movie.find({userId : req.params.id},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Movie Details :" +JSON.stringify(err,undefined,2));
    })
})


// Get All Movie Details
router.get('/get-movie',(req,res)=>{
    Movie.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Movie Details :'+JSON.stringify(err,undefined,2));
    })
})

// Add Movie Details
router.post('/add-movie',(req,res)=>{
    const { userId, name , description, cast, showTime, showTheatre, showDate} = req.body;

    Movie.findOne({name,userId}).then((movie)=>{
        if(movie)
            return res.status(400).json({msg : 'Movie does exists'});

        const newMovie= new Movie({
            userId, 
            name , 
            description, 
            cast,
            showTime, 
            showTheatre, 
            showDate
        });
        newMovie.save();
        
        return res.status(200).json({msg : 'Movie has been Added'});
        }
    ).catch(e => console.log(e))
})

//Update Movie Details
router.put('/update-movie/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Movie Details with given id : $(req.params.id)`);
    
    const app = {
        name : req.body.name, 
        description: req.body.description, 
        cast: req.body.cast,
        showTime: req.body.showTime, 
        showTheatre: req.body.showTheatre, 
        showDate: req.body.showDate,
    }

    Movie.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Movie Details :" +JSON.stringify(err,undefined,2));
    });
})

// Delete Movie Details
router.delete('/delete-movie/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Movie Details with given id : ${req.params.id}`);
    
    Movie.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Movie Details :" +JSON.stringify(err,undefined,2));
    })
})

module.exports = router;