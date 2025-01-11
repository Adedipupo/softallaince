import { IUserResult } from "../types/types";
import { UserModel } from "../user/user-model";
import Token from "../utils/token";
import { validateCreateUser } from "../utils/user.validator";

class AuthService {
  /**
   * Registers a new user.
   * @param {Object} userDetails - User details from the request body.
   * @returns {Object} The newly created user and token.
   * @throws {Error} Throws error if validation fails or email already exists.
   */
  static async registerUser(userDetails: any): Promise<IUserResult> {
    const { error } = validateCreateUser.validate(userDetails);
    if (error) {
      return { success: false, message: error.message };
    }

    const email = userDetails.email.toLowerCase();

    const userEmailExists = await UserModel.findOne({ email });

    if (userEmailExists) {
      return { success: false, message: "Email already exists" };
    }

    const user = new UserModel({ ...userDetails, email });

    await user.save();

    const token = (await Token.generateToken(user?._id)) as string;

    return { success: true, message: "User registered successfully", token };

    //   const emailSent = await sendEmail('registerTemplate', user.email, {
    //     name: user.username,
    //   })
    //   if (!emailSent) {
    //     console.warn('Failed to send email.')
    //   }
  }

  /**
   * @method loginUser
   * @static
   * @async
   * @returns {Promise}
   */
  static async loginUser(
    email: string,
    password: string
  ): Promise<IUserResult> {
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    let user = await UserModel.findOne({ email: email?.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return { success: false, message: "Invalid credentials" };
    }

    const token = (await Token.generateToken(user._id)) as string;

    return { success: true, message: "Login user successfully", token };
  }
}

export default AuthService;
