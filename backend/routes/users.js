var express = require('express');
var router = express.Router();
var userModel = require('../model/user')
var passport = require('passport');
const { json } = require('express');

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/register',function(req,res,next){
  addToDb(req,res)
})
// get all users
router.get('/register',(req,res)=>{
    
    userModel.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in retrieving employees'+JSON.stringify(err))
        }
    })
})

// user login 
router.post('/login',(req,res,next)=>{
  
  passport.authenticate('local',(err,user,info)=>{    
    if(err){
      return res.status(501).json(err); 
    }
    if(!user){
      console.log(info)
      return res.status(501).json(info); 
    }
      return res.send({message:"login success"})
    
    // req.logIn(user,(err)=>{
    //   console.log(JSON.stringify(user))
    //   if(err){
    //     console.log("still got error")
    //     console.log(err)
    //     return err
    //   }
    //   return res.status(200).json({message:'login success'})
    // });
  })(req,res,next);
});

// router.get('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });

async function addToDb(req, res) { 
  var user = userModel({
    email : req.body.email,
    username : req.body.username,
    password : userModel.hashPassword(req.body.password),
    creation_dt : Date.now()
  });
  // Save to mongo db 
  try { 

    doc : await user.save()
    console.log('Register SuccessFul')
    return res.status(201).json(doc)

  }catch(err){
    return res.json(err)
  }
}
module.exports = router;
