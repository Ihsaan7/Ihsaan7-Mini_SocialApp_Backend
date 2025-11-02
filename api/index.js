require('dotenv').config();
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const cookieP = require("cookie-parser")
const { check, validationResult } = require("express-validator");

const upConfig = require("./config/multerConfig")
const userModel = require("./models/user")
const postModel = require("./models/post")
const mongoose = require("mongoose")

// Database connection with error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialApp')
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('💡 You can start MongoDB with: mongod');
  });

//--------------------- I_M_P_O_R_T_S ----------------------------//



// ------------------- APP > USE > SET ---------------------
app.set("view engine","ejs")
// Disable view caching in development
if (process.env.NODE_ENV !== 'production') {
  app.set('view cache', false);
}
app.use(cookieP());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


//--------------- R_O_U_T_E_S ---------------
//--------------- Test route for debugging -------------------------
app.get("/test-db", async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.json({
      message: "Database connection successful",
      totalUsers: allUsers.length,
      users: allUsers.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        usernameLength: user.username.length,
        usernameBytes: Buffer.from(user.username).toString('hex')
      }))
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message
    });
  }
});

//--------------- signup -------------------------
app.get("/",(req,res)=>
    {
        res.render("signup")
    })
app.post("/signup", [
  check("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  check("email")
    .isEmail()
    .withMessage("Email must be valid"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("city")
    .notEmpty()
    .withMessage("City is required"),

  check("age")
    .isInt({ min: 1 })
    .withMessage("Age must be a number"),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }

    console.log('📝 Signup attempt received:', req.body);
    const { username, email, password, city, age } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).render("signup", { 
        errors: [{ msg: "Username or email already exists" }] 
      });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 10);
    const hashPass = await bcrypt.hash(password, salt);

    await userModel.create({
      username,
      email,
      password: hashPass,
      city,
      age,
    });

    console.log(`✅ New user created: ${username}`);
    res.redirect("/login");
    
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).render("signup", { 
      errors: [{ msg: "Server error. Please try again." }] 
    });
  }
});

        
//--------------- login -------------------------
app.get("/login",(req,res)=>
    {
        res.render("login")
    })
app.post("/login", async (req, res) => {
  try {
    console.log('🔐 Login attempt received:', req.body);
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).render("login", { 
        error: "Username and password are required" 
      });
    }
    
    let user = await userModel.findOne({ username });

    if (!user) {
      console.log(`❌ Login failed: User '${username}' not found`);
      return res.status(401).render("login", { 
        error: "Invalid username or password" 
      });
    }

    let match = await bcrypt.compare(password, user.password);
    
    if (match) {
      let token = jwt.sign(
        { username: user.username, user_id: user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.cookie("token", token, {
        httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
        secure: process.env.COOKIE_SECURE === 'true',
        maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 86400000
      });
      
      console.log(`✅ User logged in successfully: ${username}`);
      res.redirect("/profile");
    } else {
      console.log(`❌ Login failed: Wrong password for user '${username}'`);
      res.status(401).render("login", { 
        error: "Invalid username or password" 
      });
    }
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).render("login", { 
      error: "Server error. Please try again." 
    });
  }
});


//--------------- profile -------------------------
app.get("/profile",isLoggedIn,async(req,res)=>
    {
        let user =await userModel.findOne({username : req.user.username})
        res.render("profile",{user})
    })


//--------------- Post -------------------------
app.get("/post",isLoggedIn,async(req,res)=>
    {
        let user =await userModel.findOne({username : req.user.username }).populate("post")
        res.render("post",{user})        
    })
app.post("/post",isLoggedIn,async (req,res)=>
    {
        const {content} = req.body
        let user =await userModel.findOne({username : req.user.username })
        
        let post =await postModel.create({
            content,
            user:user._id
        })
        user.post.push(post._id)
        await user.save()
        res.redirect("/post")
    })  


//--------------- Upload -------------------------
app.get("/profile/upload",isLoggedIn,(req,res)=>
    {
        res.render("profileUpload")
    })
app.post("/upload",upConfig.single("profilePic"),isLoggedIn,async(req,res)=>
    {
        let user =await userModel.findOne({username : req.user.username})
        user.profilePic = req.file.filename;
        await user.save()      
        res.redirect("/post")
    })
    


//--------------- likes -------------------------
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id });

  const index = post.like.indexOf(req.user.user_id);
  if (index === -1) {
    post.like.push(req.user.user_id);
  } else {
    post.like.splice(index, 1); 
  }

  await post.save();
  res.redirect("/post");
});


//--------------- Edit -------------------------
app.get("/edit/:id",isLoggedIn,async(req,res)=>
    {
        let post = await postModel.findOne({_id: req.params.id})
        res.render("edit",{post})
    })
app.post("/edit/:id",isLoggedIn,async(req,res)=>
    {
        try {
            let post = await postModel.findOne({_id: req.params.id});
            if(!post) return res.status(404).send("Post not found");
            
            // Check if user owns the post
            if(post.user.toString() !== req.user.user_id) {
                return res.status(403).send("Unauthorized");
            }
            
            await postModel.findOneAndUpdate({_id: req.params.id},{content:req.body.content});
            res.redirect("/post");
        } catch(err) {
            res.status(500).send("Server error");
        }
    })


//--------------- logout -------------------------
app.get("/logout",(req,res)=>
    {
        res.clearCookie("token");
        res.redirect("/login")
    })


//--------------- Auth Middleware Function -------------------------
function isLoggedIn(req,res,next)
{
    if(!req.cookies.token || req.cookies.token === "") {
        console.log('❌ No token found, redirecting to login');
        return res.redirect("/login")
    }
    try {
       let data = jwt.verify(req.cookies.token , process.env.JWT_SECRET)
       req.user = data
       console.log(`✅ User authenticated: ${data.username}`);
       next()
    } catch(err) {
        console.error('❌ Token verification failed:', err.message);
        res.clearCookie("token");
        return res.redirect("/login")
    }
}


//--------------- Auth Function -------------------------
function isLoggedIn(req,res,next)
{
    if(!req.cookies.token || req.cookies.token === "") {
        return res.redirect("/login")
    }
    try {
       let data = jwt.verify(req.cookies.token , process.env.JWT_SECRET)
       req.user = data
       next()
    } catch(err) {
        res.clearCookie("token");
        return res.redirect("/login")
    }
}








//--------------- signup -------------------------
//--------------- signup -------------------------



//--------------- Server Port -------------------------
// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)})
}

// Export for Vercel serverless
module.exports = app;
