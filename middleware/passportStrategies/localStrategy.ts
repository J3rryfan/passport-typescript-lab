import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';



const localStrategy = new LocalStrategy(
  {
    usernameField: "email",    //if you deletes this, this will be default to req.body.username
    passwordField: "password",
  },
  (email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user) // this will log the user in to the page
      : done(null, false, {
          message: "Your login details are not valid. Please try again", // this will show the error message and move back to the login page
        });
  }
);

/*
FIX ME (types) 😭
*/

// create a session for the users.
// creates a session and stores the user id in the session
passport.serializeUser(function(
  user: Express.User, 
  done: (error: any,id: number)=>void) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: (error: any, user: Express.User | false | null) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
