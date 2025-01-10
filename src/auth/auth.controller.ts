import { Request,Response,NextFunction } from "express";
import AuthService from './auth.service';


class AuthController {
    AuthService: typeof AuthService;
    constructor() {
      this.AuthService = AuthService
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
      
}

export default AuthController;