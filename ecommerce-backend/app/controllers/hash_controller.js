const express = require('express')
const router = express.Router()
const {Bookmark} = require('../models/bookmark')

router.get('/:hash',function(req,res){
    let hash_value = req.params.hash 
    console.log(hash_value)   
    Bookmark.findOne({hashed_Url:hash_value}).then(bookmark=>{
    if(bookmark){
        res.redirect(bookmark.original_Url)
    }else{
        res.send({
            notice:"Invalid Hash_Value"
        })
    }
    }).catch(err=>{
        res.send(err)
    })
})

module.exports ={
    bookmarks_hashController:router
}