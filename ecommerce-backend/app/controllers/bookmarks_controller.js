const express = require('express')
const router = express.Router()
const {Bookmark} = require('../models/bookmark')
const {validateId} = require('../middlewares/bookmark_validation')

router.post('/',function(req,res){
    let body = req.body
    let bookmark_1 = new Bookmark(body)
    bookmark_1.save().then(function(bookmark){
        res.send(bookmark)
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/',function(req,res){
    Bookmark.find().then(bookmarks=>{
        res.send(bookmarks)
    }).catch(err=>{
        res.send(err)
    })
})
router.put('/:id',validateId,function(req,res){
    let id = req.params.id
    let body = req.body
    Bookmark.findByIdAndUpdate(id,{$set:body},{new:true}).then(bookmark=>{ 
        if(bookmark){  
          res.send(bookmark)
        }else{
            res.send({
                notice:"Invalid id"
            })
        }
    }).catch(err=>{
        res.send(err)
    })
})
router.delete('/:id',validateId,function(req,res){
    let id = req.params.id
    Bookmark.findByIdAndDelete(id).then(bookmark=>{
        res.send({
            notice:'Bookmark deleted successfully'
        })
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/tags',function(req,res){    
    let names = req.query.names
    names = names.split(',')
    Bookmark.find({tags:{"$in":[names[0],names[1]]}}).then(bookmarks=>{
        if(bookmarks.length >0 ){
            res.send(bookmarks)
        }else{
            res.send({
                notice:'Invalid tag_name'
            })
        }
    }).catch(err=>{
            res.send(err)
    })
    
})

router.get('/tags/:name',function(req,res){
    let tag_name = req.params.name
    Bookmark.find({tags:tag_name}).then(bookmarks=>{
    if(bookmarks.length >0 ){
        res.send(bookmarks)
    }else{
        res.send({
            notice:'Invalid tag_name'
        })
    }
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/:id',validateId,function(req,res){
    let id = req.params.id
    Bookmark.findById(id).then(bookmark=>{
        res.send(bookmark)
    }).catch(err=>{
        res.send({
            notice:"Invalid id"
        })
    })
})

module.exports ={
    bookmarksController:router
}