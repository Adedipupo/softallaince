import { Request, Response, NextFunction } from "express";
import Token from "../utils/token";
import { UserModel } from "../feat/user/user-model";


export const verifiedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.authorization) {
      token = req.cookies.authorization;
    }

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decodedToken = (await Token.verifyToken(token)) as { id: string };

    const user = await UserModel.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    req.user = user;
    next();
  } catch (error:any) {
    return res.status(401).json({ message: "Not Authorized", error: error.message });
  }
};
