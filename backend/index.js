var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
var User = require('./models/users.js')
var Blog = require('./models/blogs.js')
//Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function (reuest, response, next) {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('Server is running at port:' + app.get('port'));
});

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Register
app.post('/register', function (req, res) {
    var newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        role: req.body.role

    });
    User.createUser(newUser, function (err, user) {
        if (err) throw err;
        res.status(200).send({
            user: user,
            success: true,
            message: ' Your account has been registered successfully'

        });
        console.log('user saved successfully');
    });
});

app.post('/writeblog', function (req, res) {
    var newBlog = new Blog({
        title: req.body.title,
        author: req.body.name,
        content: req.body.content,
        tags: req.body.tags,
        date: req.body.date
    });
    Blog.createBlog(newBlog, function (err, blog) {
        if (err) throw err;
        res.status(200).send({
            blog: blog,
            success: true,
            message: ' Your post has been created successfully'

        });
        console.log('post created successfully');
    });
});
app.get('/getallblogs', function (req, res) {
    Blog.getAllBlogs(function (err, blogs) {
        if (!err) {
        res.status(200).send({
        blogs: blogs,
        success: true,
        });
        } 
        else
         { throw err; }
    })
    

});
app.post('/getblogbyid', function (req, res) {
    var id = req.body.id;
    Blog.getBlogById(id,function(err, blog) {
        if (!err) {
        res.status(200).send({
        blog: blog,
        success: true,
        });
        } 
        else
         { throw err; }
    })
    

});

app.post('/postcomment', function (req, res) {
    var id = req.body.id;
    var user = req.body.user;
    var body = req.body.body;
    var date = req.body.date;
    Blog.postComment(id,user,body,date,function(err, blog) {
        if (!err) {
        res.status(200).send({
        blog: blog,
        success: true,
        });
        } 
        else
         { throw err; }
    });
    

});

app.post('/replytocomment', function (req, res) {
    var bid = req.body.blogid;
    var id = req.body.id;
    var user = req.body.user;
    var reply = req.body.reply;
    var date = req.body.date;
    Blog.replyToComment(bid,id,user,reply,date,function(err, blog) {
        if (!err) {
        res.status(200).send({
        blog: blog,
        success: true,
        });
        } 
        else
         { throw err; }
    })
    

});
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ email: email }, '+password', function (err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, { message: 'no user found' });
            // if the user is found but the password is wrong
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    // all is well, return successful user
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Invalid Password' })
                }
            })

        });

    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(null, user);
    });
});
//Login
app.post('/login', passport.authenticate('local-login'),
    function (req, res) {
        user = req.user.toObject(); // swap for a plain javascript object instance
        delete user["_id"];
        delete user["password"];

        res.status(200).send({
            user: user,
            success: true,
            message: 'logged in successfully'
        })
    });