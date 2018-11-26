const express = require('express');
const app = express();
const port = 3000;
const {mongoose} = require('./config/db'); //database is connected with the server
const {bookmarksController} = require('./app/controllers/bookmarks_controller')
const {bookmarks_hashController} = require('./app/controllers/hash_controller')

mongoose.set('useFindAndModify', false); //not to get warning while updating or deleting the data.

app.use(express.json());

app.get('/',function(req,res){
    res.send('welcome to home page')
});


app.use('/bookmarks',bookmarksController);
app.use('/',bookmarks_hashController)


app.listen(port,function(){
    console.log('listening to port',port)
});