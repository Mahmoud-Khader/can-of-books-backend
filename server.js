'use strict';

const express = require ('express');
const cors = require('cors');
// const mongoose = require ('mongoose');
require('dotenv').config();

const app=express();
app.use(cors());

let appsObj={'app':app}
module.exports=appsObj;

const PORT = process.env.PORT;


const functionHandlers = require('./model')
// const addBookHandler = require('./model')
// const deleteBook = require('./model')


// mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

// const BookSchema = new mongoose.Schema({
//     name:String,
//     description:String,
//     status:String,
//     img:String
// });

// const UserSchema=new mongoose.Schema({
//     email:String,
//     books:[BookSchema]
// });

// const myUserModel = mongoose.model('User',UserSchema);

// function seedUserCollection(){
//     const mahmoud = new myUserModel({
//         email: 'mahmoudkhader2010@gmail.com', 
//         books: [
//         { 
//             name: 'The Growth Mindset', 
//             description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', 
//             status: 'FAVORITE FIVE', 
//             img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
//         { 
//             name: 'The Momnt of Lift', 
//             description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
//             status: 'RECOMMENDED TO ME', 
//             img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'},
//         { 
//             name: 'The Momnt of Lift', 
//             description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
//             status: 'RECOMMENDED TO ME', 
//             img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
//       ]})
//       mahmoud.save();
// }

// // seedUserCollection();


// function getUserData(req,res){
//     let email=req.query.email
//     myUserModel.find({email:email},function(error,userData){
//         if(error){
//             res.send('did not work',error)
//         }else{
//             res.send(userData)
//         }
//     })
// }


// http://localhost:3001/books?email=mahmoudkhader2010@gmail.com
app.get('/books',functionHandlers.getUserData);

app.post('/addbook',functionHandlers.addBookHandler);

app.delete('/deletebook/:bookIndex', functionHandlers.deleteBook);


function homePageHandler(req, res) {
    res.send('all good')
}

app.get('/', homePageHandler);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})





