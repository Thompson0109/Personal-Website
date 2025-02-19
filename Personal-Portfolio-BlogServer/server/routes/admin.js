const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';

//**
// GET / 
// Action - Login Page
//  */
router.get ('/admin', async(req,res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        } 
        res.render('admin/index', {locals, layout: adminLayout});
    } catch (error) {
        console.log(error)
    }
})

//**
// POST / 
// Action - Check Login
//  */
router.post('/admin', async(req,res) => {

    try {
        console.log(req.body.username);
        const { username, password } = req.body; // Corrected typo here
        
        if(req.body.username === 'admin' && req.body.password === 'password'){
            res.send('you are logged in');
        }else{
            res.send('you have inputted wrong details');
        }
        res.redirect('/admin');

        res.render('admin/index', { layout: adminLayout});
    } catch (error) {
        console.log(error)
    }
})

// //**
// // POST / 
// // Action - Register
// //  */
// router.post('/register', async(req,res) => {

//     try {
//         const { username, password } = req.body;
//         const hasedPassword = await bcrypt.hash(password, 10);

//         try {
//           const user = await User.create({username, password:hasedPassword});
//           res.status(201).json({message: 'User Created', user });

//         } catch (error) {
//             if(error.code === 1000){
//                 res.status(409).json({message: 'User Already Exists', user})
//             }
//             res.status(500).json({message: 'Internal Error Server'})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })


module.exports = router;
