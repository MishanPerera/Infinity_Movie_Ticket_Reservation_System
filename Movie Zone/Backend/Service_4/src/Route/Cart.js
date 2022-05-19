const express = require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Cart= require('../Models/Cart');

// Get All Cart Details By User ID
router.get('/get-cart/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Cart.find({userId : req.params.id},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Cart Details :" +JSON.stringify(err,undefined,2));
    })
})

// Add cart Details
router.post('/add-cart',(req,res)=>{
    const { userId, movie} = req.body;

    Cart.findOne({userId, movie}).then((cart)=>{
        if(cart)
            return res.status(400).json({msg : 'Movie does exists'});

        const newCart= new Cart({
            userId, 
            movie
        });
        newCart.save();
        
        return res.status(200).json({msg : 'Movie has been added'});
    }).catch(e => console.log(e))
    }
)

// Delete Cart Details
router.delete('/delete-cart/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Cart Details with given id : ${req.params.id}`);
    
    Cart.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Cart Details :" +JSON.stringify(err,undefined,2));
    })
})

module.exports = router;