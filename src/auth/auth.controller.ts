import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";

class AuthController {
  AuthService: typeof AuthService;
  constructor() {
    this.AuthService = AuthService;
  }
  /**
   * @route POST api/v1/auth/register
   * @desc Create a User
   * @access Public
   * @async
   */

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.AuthService.registerUser(req.body);

      if (result.success) {
        return res.status(201).json({
          message: result.message,
          token: result.token,
        });
      } else {
        return res.status(400).json({
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

  /**
   * @route POST api/v1/auth/login
   * @desc User Public
   * @access Public
   * @async
   */

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const result = await this.AuthService.loginUser(email, password);

      if (result.success) {
        return res.status(201).json({
          message: result.message,
          token: result.token,
        });
      } else {
        return res.status(400).json({
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await AuthService.forgotPassword(email);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;

      const result = await AuthService.resetPassword(token, newPassword);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  resendAuthCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await AuthService.resendAuthCode(email);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in resendAuthCode:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default AuthController;
