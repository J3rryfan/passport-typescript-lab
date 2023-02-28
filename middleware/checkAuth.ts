import {NextFunction, Request, Response} from "express";
import expressEjsLayouts from "express-ejs-layouts";
/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}

export const ensureAdminPrivilege = (req: Request, res: Response, next: NextFunction) => {

  if (req.isAuthenticated() && (req.user as any).role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
}