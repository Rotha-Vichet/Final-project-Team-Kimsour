const express = require('express')
const res = require('express/lib/response')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var city = require('../model/city')
router.get('/',(req,res)=>{
    
    city.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in retrieving employees'+JSON.stringify(err))
        }
    })
})

// Get data by specific id : 
router.get('/:id',(req,res)=>{
    console.log(req.params)
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with the given id : ${req.params.id}`)
    }
    city.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
})

// Insert 
router.post('/',jsonParser,(req,res)=>{
    var postCity = new city({
        cityName: req.body.cityName,
        code: req.body.code,
        country: req.body.country,
        description:req.body.description
    });
    postCity.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }else{
            console.log("Error with Post")
        }
    });
})

// Update 
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with the given id : ${req.params.id}`)
    }
    var updateCity = {
        cityName : req.body.name,
        code : req.body.code,
        country : req.body.country
    }
    city.findByIdAndUpdate(req.params.id,{$set:updateCity},{new:true},(err,doc)=>{ // new use for doc to return the new value 
        if(!err){
            res.send(doc)
        }else{
            console.log("Error with Post")
        }
    })
})

// Delete 
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with the given id : ${req.params.id}`)
    }
    city.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }else{
            console.log("Error with Post")
        }
    })
})
router.delete('/',(req,res)=>{
    city.deleteMany({},err =>{
        console.log(err)
    })
})
module.exports = router