const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

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

//We need a gaurd for the log in cookie. 

//**
// Check Login - Add this as param to password protected pages
//  */
const authMiddleWare = (req, res, next ) => {
    const token = req.cookies.token;

    if(!token){
     return res.status(401).jsono({ message: 'Unauthorized'} );
    }

    //Verify the jwt with the secret that we have set. 
    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId; 
        next();
    }catch(error){
        res.status(401).json({message: 'Unauthorized'} );
    }
}

//**
// POST / 
// Action - Check Login
//  */
router.post('/admin', async(req,res) => {

    try {
        const { username, password } = req.body; // Corrected typo here
        
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            return res.status(401).json({ message: 'Ivalid Credentials'},)
        }

        const token = jwt.sign({userId: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});

        res.redirect('/dashboard');

    } catch (error) {
        console.log(error)
    }
})

/**
 * POST /
 * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne( { username } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});

//**
// GET / 
// Action - Admin Dashboard
//  */
router.get ('/dashboard', authMiddleWare, async(req,res) => {
    try {
        const locals = {
            title: "Dashboard",
            description: "This is the dashboard section"
        } 
        const data = await Post.find();
        res.render('admin/dashboard', {
            locals, 
            data,
            layout: adminLayout});
    } catch (error) {
        console.log(error)
    }
})



/**
 * GET /
 * Admin - Create New Post
*/
router.get('/add-post', authMiddleWare, async (req, res) => {
    try {
      const locals = {
        title: 'Add Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/add-post', {
        locals,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });


/**
 * POST /
 * Admin - Create New Post
*/
router.post('/add-post', authMiddleWare, async (req, res) => {
    try {
      try {
        const newPost = new Post({
          title: req.body.title,
          body: req.body.body
        });
  
        await Post.create(newPost);
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });
  
  
  /**
   * GET /
   * Admin - Create New Post
  */
  router.get('/edit-post/:id', authMiddleWare, async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Post",
        description: "Free NodeJs User Management System",
      };
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        locals,
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
  
  
  /**
   * PUT /
   * Admin - Create New Post
  */
  router.put('/edit-post/:id', authMiddleWare, async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
  
    } catch (error) {
      console.log(error);
    }
  
  });
  
  
  // router.post('/admin', async (req, res) => {
  //   try {
  //     const { username, password } = req.body;
      
  //     if(req.body.username === 'admin' && req.body.password === 'password') {
  //       res.send('You are logged in.')
  //     } else {
  //       res.send('Wrong username or password');
  //     }
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  
  
  /**
   * POST /
   * Admin - Register
  */
  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      try {
        const user = await User.create({ username, password:hashedPassword });
        res.status(201).json({ message: 'User Created', user });
      } catch (error) {
        if(error.code === 11000) {
          res.status(409).json({ message: 'User already in use'});
        }
        res.status(500).json({ message: 'Internal server error'})
      }
  
    } catch (error) {
      console.log(error);
    }
  });
  
  
  /**
   * DELETE /
   * Admin - Delete Post
  */
  router.delete('/delete-post/:id', authMiddleWare, async (req, res) => {
  
    try {
      await Post.deleteOne( { _id: req.params.id } );
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });

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

/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
  });
  
module.exports = router;
