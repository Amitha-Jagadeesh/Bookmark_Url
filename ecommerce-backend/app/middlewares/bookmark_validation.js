const {ObjectID} = require('mongodb');

const validateId = (req,res,next)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:'Invalid id'
        })
    }else{
        next();
    }
}


module.exports ={
    validateId
}