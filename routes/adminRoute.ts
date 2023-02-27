import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/admin", async (req, res) => {
    const storeSession = req.sessionStore;
    const sessions = await storeSession.all?.(err => {console.log(err);
    });
    console.log(sessions);
    
});

module.exports = router;