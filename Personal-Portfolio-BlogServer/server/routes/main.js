const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('', async(req,res) => {
    try {
        const locals = {
            title: "Louis's NodeJS Blog",
            description: "Simple Blog created with NodesJs, Express & MonoDb."
           }
        let perPage = 2; 
        //req.query.page is each page of pagination
        let page = req.query.page || 1;
        const data = await Post.aggregate([{ $sort: {createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }
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
