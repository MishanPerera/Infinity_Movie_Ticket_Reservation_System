const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const User = require('../Models/User');

// Sign Up
router.post('/sign-up',async (req,res)=>{

    const username= req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password,saltPassword);

    await User.findOne({email})
    .then((user) =>{
        if(user) return res.status(400).json({msg : 'User already exists'});
        const newUser = new User({
            username,
            password,
            email,
            role,
        });

    newUser.password=securePassword;
    
    newUser.save().then((user)=>{
        res.json({
            token:true,
            id:user.id,
            name:user.username,
            email:user.email
            })
        }).catch(e => console.log(e));
    }).catch(e => console.log(e))
})

module.exports = router;