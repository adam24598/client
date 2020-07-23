const express =require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require ('jsonwebtoken')
const auth = require('../../client/middlware/auth')


const User = require('../../models/User');


router.get('/',(req,res)=>{
    User.find()
    .then(users =>res.json(users))
})
;



router.post('/', (req,res)=>{
  const {name,mdp,solde} = req.body;
  if(!name || !mdp || !solde){
    return res.status(400).json({msg:'Please enter all fields'});
  }
  User.findOne({name})
  .then(user =>{
    if(user) return res.status(400).json({msg:'User already exist'});
    const newUser = new User({
      name : req.body.name,
     mdp : req.body.mdp,
     solde : req.body.solde
  
    });
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newUser.mdp,salt,(err,hash)=>{
        if(err) throw err;
        newUser.mdp=hash;
        newUser.save()
  .then((user) =>{
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
          solde:user.solde
        }
        })
      }
    )
  } );
      })
    })
  })
  



  ;
});



router.delete('/:id',(req,res)=>{
  User.findById(req.params.id)
  .then(item => item.remove().then(()=>res.json({success: true})))
  .catch(err =>res.status(404).json({success:false}))
})
;








module.exports= router;