import { IUserResult } from "../types/types";
import { UserModel } from "../user/user-model"
import Token from "../utils/token"
import { validateCreateUser } from "../utils/user.validator"




class AuthService {
    /**
     * Registers a new user.
     * @param {Object} userDetails - User details from the request body.
     * @returns {Object} The newly created user and token.
     * @throws {Error} Throws error if validation fails or email/phone/username already exists.
     */
    static async registerUser(userDetails:any): Promise<IUserResult> {
      const { error } = validateCreateUser.validate(userDetails)
      if (error) {
        return { success: false, message: error.message };
      }
  
      const email = userDetails.email.toLowerCase()
  
      const userEmailExists = await UserModel.findOne({ email })
  
      if (userEmailExists) {
        return { success: false, message: "Email already exists" };
      }
  
      const user = new UserModel({ ...userDetails, email })
      
      await user.save()

      const token = await Token.generateToken(user?._id) as string;
      
      return { success: true, message: "User registered successfully", token };


    //   const emailSent = await sendEmail('registerTemplate', user.email, {
    //     name: user.username,
    //   })
    //   if (!emailSent) {
    //     console.warn('Failed to send email.')
    //   }
  
    }

  }
  
  export default AuthService