const express =require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require ('jsonwebtoken');
const auth = require ('../../client/middlware/auth')


const User = require('../../models/User');






router.post('/', (req,res)=>{
  const {name,mdp} = req.body;
  if(!name || !mdp ){
    return res.status(400).json({msg:'Please enter all fields'});
  }
  User.findOne({name})
  .then(user =>{
    if(!user) return res.status(400).json({msg:'User does not exist'});
    
    bcrypt.compare(mdp,user.mdp)
    .then(isMatch=>{
        if(!isMatch)return res.status(400).json({msg:'Invalid data '});
        jwt.sign(
            {id:user.id},
            config.get('jwtSecret'),
            (err,token)=>{
              if(err )throw err;
              res.json({
                token,
                user:{
                  id:user.id,
                name:user.name,
                solde:user.solde,
                role:user.role,
              }
              })
            }
          )
    })
  })
  

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .then(user=> res.json(user));
});



  router.put("/:id",  (req, res) => {
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
      User.findOne({_id:req.params.id}).then(function(user){res.send(user);});
    });
  });
});








module.exports= router;