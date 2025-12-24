import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const role = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      const secret = config.jwt_secret;
      const decodedToken = jwt.verify(
        token as string,
        secret as string
      ) as JwtPayload;
      req.user = decodedToken;

      if (roles.length && !roles.includes(decodedToken.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
  };
};

export default role;
