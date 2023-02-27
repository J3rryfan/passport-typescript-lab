import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/admin", (req, res)=> {
  res.render("admin")
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] })
);

router.get("/login/github/callback", (req, res) => {
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;



/* 
  Every user in your database should have a role. The role can either be 
  "admin" or "user".
  Admin users can visit a secret page called /admin. 
  ONLY admins should be able to see this page. When they go to this page, 
  it should show the Admin a list of all the current sessions, and the ID of the user that session belongs to. 
  Next to each session should be a "revoke" button. When clicked, it should destroy that user's session.

*/



