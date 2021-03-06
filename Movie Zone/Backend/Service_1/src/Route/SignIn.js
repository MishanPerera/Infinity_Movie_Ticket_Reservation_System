const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const User = require('../Models/User');

router.get('/user',(req,res)=>{
	User.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Movie Details :'+JSON.stringify(err,undefined,2));
    })
})
router.post('/sign-in',(req,res)=>{

    const {email , password} = req.body;

    User.findOne({email})
    .then(user =>{
        if(!user) return res.status(400).json({msg : 'User Does not exists'});

        //Validate User
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({ msg : 'Invalid Credentials'});
                res.json({
                    token:true,
                    id:user.id,
                    name:user.username,
                    email:user.email,
                    role:user.role
                })
            }
        );
    }).catch(e => console.log(e))
})

module.exports = router;