const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('', async(req,res) => {
    const locals = {
     title: "Louis's NodeJS Blog",
     description: "Simple Blog created with NodesJs, Express & MonoDb."
    }
    //Get's blogs from db.
    try{
        const data = await Post.find();
        res.render('index', {locals, data});

    } catch (error) {
        console.log(error);
    }
    
    res.render('index', { locals });
});

//**
// Get / 
// Home
//  */


router.get('/about', (req,res) => {
    res.render('about');
});
module.exports = router;











//////// Manual Insert 

// function insertPostData() {
//     Post.insertMany([
//     {
//         title: "The Golden Age Of Hip Hop",
//         body: "This is the body text"
//     },
//     {
//         title: "The Dark Age's Of Hip Hop",
//         body: "This is the body text"
//     },
//     {
//         title: "The Re-surgence Of Hip Hop",
//         body: "This is the body text"
//     },
// ])
// }
//insertPostData();
