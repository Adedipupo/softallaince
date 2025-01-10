import express,{Request, Response} from 'express';
import { UserModel } from "../models/userModel"
import formatHTTPLoggerResponse, { httpLogger } from "./LoggerService"


class userService {
  /**
   * @method getAllUsers
   * @static
   * @async
   * @returns {Promise<IUsers>}
   */

  static async getAllUsers(req:Request, res:Response) {
    try {
      const users = await UserModel.find();

      if (users) {
        httpLogger.info(
          'Success message',
          formatHTTPLoggerResponse(req, res, users),
        )

        return res.status(401).json({
          message: `Users retrieved successfully`,
          data: users,
        })
      }
    } catch (error) {
      console.log(error)
      httpLogger.error(
        'Failure message',
        formatHTTPLoggerResponse(req, res, { message: error }),
      )
      return res.status(500).json({
        message: 'Internal Server Error',
        success: false,
      })
    }
  }
}

export default userService;