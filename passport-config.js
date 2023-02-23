/*const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

 function initalize(passport, getUserID,getUserByID){
    const authenticateUser = async (steamID, done) =>{
        const user = getUserID(steamID)
        if(user == null){
            return done(null, false,{message: 'no user found'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null,user)
            }else{
                return done(null, false,{message: 'Password incorrect'})
            }
        }catch (e){
            return done(e)
        }
        
    }
    

   passport.use(new LocalStrategy({ usernameField:'steamID'},
    authenticateUser))
    passport.serializeUser((user, done) =>done(null,user.id))
    passport.deserializeUser((id,done) => { 
        done(null,getUserByID(id))
    })

}

module.exports = initalize
*/