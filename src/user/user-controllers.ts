
import { Request, Response } from 'express';
import UserService from './user-services';


class UserController {
  UserService: UserService;

  constructor() {
    this.UserService = new UserService();
  }
/**
   * @route GET api/v1/users
   * @desc Get all registered users
   * @access Public
   */
getUsers = async (req: Request, res: Response) => {
  try {
    const users = await this.UserService.getAllUsers();

    if (users) {
      return res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
    } else {
      return res.status(404).json({
        message: "No users found",
        data: [],
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

}

export default UserController;
