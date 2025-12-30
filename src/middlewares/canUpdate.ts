import { Request, Response, NextFunction } from "express";

export function canUpdateUser(req: Request, res: Response, next: NextFunction) {
  const loggedInUser = req.user;
  const targetUserId = Number(req.params.id);

  if (!loggedInUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (loggedInUser.role === "admin") {
    return next();
  }

  if (loggedInUser.id === targetUserId) {
    return next();
  }

  return res.status(403).json({
    message: "You are not allowed to update this user",
  });
}
