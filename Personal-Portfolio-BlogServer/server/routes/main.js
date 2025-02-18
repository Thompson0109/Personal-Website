const express = require('express');
const router = express.Router();
//const Post = require('../models/Post');

router.get('', (req,res) => {
    const locals = {
     title: "Louis's NodeJS Blog",
     description: "Simple Blog created with NodesJs, Express & MonoDb."
    }
    
    res.render('index', { locals });
});

//**
// Get / 
// Home
//  */

function insertPostData() {
        Post.insertMany([
        {
            title: "The Golden Age Of Hip Hop",
            body: "This is the body text"
        },
        {
            title: "The Dark Age's Of Hip Hop",
            body: "This is the body text"
        },
        {
            title: "The Re-surgence Of Hip Hop",
            body: "This is the body text"
        },
    ])
}
insertPostData();

router.get('/about', (req,res) => {
    res.render('about');
});
module.exports = router;