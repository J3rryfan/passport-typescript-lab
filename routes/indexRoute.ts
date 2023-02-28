import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});


router.get("/admin", async (req, res) => {
  const storeSession = req.sessionStore;
  const result: {id: number, sid: string}[] = []
  storeSession.all?.((err, sessions: any) => {
   for (const sid in sessions) {
     const session = sessions[sid];
     if (session.passport && session.passport.user) {
      const userId = session.passport.user;
      result.push({
        id: userId,
        sid: sid,
      });
      
   }
  }
})
    res.render("admin", {sessionData: result});
});




export default router;
