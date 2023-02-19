import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

// this is the welcome page // 
router.get("/", (req, res) => {
  res.send("welcome");
});


// this is the dashboard page // 
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

export default router;
