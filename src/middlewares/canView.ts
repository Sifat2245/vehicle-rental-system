import { Request, Response, NextFunction } from "express";

export const canViewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = req.user;
  const targetUserId = Number(req.params.id);
//   console.log(loggedInUser, "user");

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
    success: false,
    message: "You are not allowed to view this profile",
  });
};

export default canViewUser;
