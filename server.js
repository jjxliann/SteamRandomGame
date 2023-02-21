if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const passportSteam = require('passport-steam')
const SteamStrategy = passportSteam.Strategy
const initalizePassport = require('./passport-config')
const methodOverride = require('method-override')


initalizePassport(
    passport, 
    id => users.find(user => user.id === id)
)


const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



app.get('/', checkAuthenticated, (req,res)=>{
    res.render('index.ejs',{name: req.user.name})
})

app.get('/login',  checkNotAuthenticated, (req,res)=>{
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash:true
    
}))






//steam
// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
   });
   passport.deserializeUser((user, done) => {
    done(null, user);
   });
   // Initiate Strategy
   passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost/',
    apiKey: 'YOUR_API_KEY'
    }, function (identifier, profile, done) {
     process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
     });
    }
   ));
   app.use(session({
    secret: 'Whatever_You_Want',
    saveUninitialized: true,
    resave: false,
    cookie: {
     maxAge: 3600000
    }
   }))
   app.use(passport.initialize());
   app.use(passport.session());
  












app.delete('/logout',(req,res) =>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)