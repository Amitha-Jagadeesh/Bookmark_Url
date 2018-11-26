const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const Schema = mongoose.Schema
const bookmarkSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    original_Url:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isURL(value)
            },
            message:function(){
                return "Invalid URL format"
            }
        }
    },
    tags:{
       type:[String],
       required:true
    },
    hashed_Url:{
        type:String
    },
    created_At:{
        type:Date,
        default:Date.now
    }

})

bookmarkSchema.pre('save',function(next){
    let bookmark = this;
    let shorthash_value = sh.unique(bookmark.original_Url)
    if(shorthash_value)
        {
            bookmark.hashed_Url = shorthash_value      
            next()
        }else{
            console.log(err)
        }
    })  

const Bookmark = mongoose.model('Bookmark',bookmarkSchema)

module.exports = {
    Bookmark
}