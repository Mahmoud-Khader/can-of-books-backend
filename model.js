'use strict';
const mongoose = require ('mongoose');
const express = require ('express');
const appsObj = require ('./server')

appsObj.app.use(express.json());
// module.exports = addBookHandler;
// module.exports = deleteBook;

let functionHandlers={}

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const BookSchema = new mongoose.Schema({
    name:String,
    description:String,
    status:String,
    img:String
});

const UserSchema=new mongoose.Schema({
    email:String,
    books:[BookSchema]
});

const myUserModel = mongoose.model('User',UserSchema);

function seedUserCollection(){
    const mahmoud = new myUserModel({
        email: 'mahmoudkhader2010@gmail.com', 
        books: [
        { 
            name: 'The Growth Mindset', 
            description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', 
            status: 'FAVORITE FIVE', 
            img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
        { 
            name: 'The Momnt of Lift', 
            description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
            status: 'RECOMMENDED TO ME', 
            img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'},
        { 
            name: 'The Momnt of Lift', 
            description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
            status: 'RECOMMENDED TO ME', 
            img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
      ]})
      mahmoud.save();
}

// seedUserCollection();


functionHandlers.getUserData= (req,res)=>{
    let email=req.query.email
    myUserModel.find({email:email},function(error,userData){
        if(error){
            res.send('did not work',error)
        }else{
            res.send(userData)
        }
    })
}


functionHandlers.addBookHandler=(req, res)=> {

    let { email, name, description, status, img } = req.body;
    console.log('sssssssssssssssssss',req.body)

    myUserModel.find({ email: email }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            userData[0].books.push({
                name: name,
                description: description,
                status: status,
                img: img
            })
            userData[0].save();
            res.send(userData[0].books)

        }
    })




}

functionHandlers.deleteBook=(req, res)=> {
    let emailReq = req.query.email;
    let indexReq = Number(req.params.bookIndex);


    myUserModel.find({ email: emailReq }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {

            let dataAfterDelete = userData[0].books.filter((book, index) => {
                if (index !== indexReq) { return book }
            })
            userData[0].books = dataAfterDelete;

            userData[0].save();

            res.send(userData[0].books);






        }
    })



}

module.exports = functionHandlers;