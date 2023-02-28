import express from "express";
const router = express.Router();
import { ensureAdminPrivilege, ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, ensureAdminPrivilege, async (req, res) => {
  const storeSession = req.sessionStore;
  const result: { userid: number; sid: string }[] = [];
  storeSession.all?.((err, sessions: any) => {
    for (const sid in sessions) {
      const session = sessions[sid];
      if (session.passport && session.passport.user) {
        const userId = session.passport.user;
        result.push({
          userid: userId,
          sid: sid,
        });
      }
    }
    res.render("admin", { sessionData: result });
  });
});


router.post("/revoke-session/:sid", async (req, res) => {
  const storeSession = req.sessionStore;
  const sid = req.params.sid;
  storeSession.destroy(sid, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/admin");
})
export default router;
