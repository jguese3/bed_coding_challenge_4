import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { HTTP_STATUS } from "../constants/httpConstants";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || "user"; // default role
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Authentication failed" });
  }
};
