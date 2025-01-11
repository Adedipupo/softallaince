import { IUserResult } from "../types/types";
import { UserModel } from "../user/user-model";
import sendEmail from "../utils/email";
import Token from "../utils/token";
import { validateCreateUser } from "../utils/user.validator";
import crypto from "crypto";

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

  static async forgotPassword(email: string): Promise<IUserResult> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetUrl = `${process.env.CLIENT_BASE_URL}/password-reset/${resetToken}`;

    // Send reset email
    const emailSent = await sendEmail({
      to: user.email,
      subject: "Password Reset",
      text: `You requested a password reset. Use the following link: ${resetUrl}. It is valid for 1 hour.`,
    });

    if (!emailSent) {
      return { success: false, message: "Failed to send reset email" };
    }

    return { success: true, message: "Password reset email sent" };
  }

  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<IUserResult> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return { success: true, message: "Password reset successfully" };
  }

  static async resendAuthCode(email: string): Promise<IUserResult> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const authCodeUrl = `${process.env.CLIENT_BASE_URL}/auth-code/${resetToken}`;

    // resend auth code email
    const emailSent = await sendEmail({
      to: user.email,
      subject: "Resend Auth Code",
      text: `Here is your auth code link: ${authCodeUrl}. It is valid for 1 hour.`,
    });

    if (!emailSent) {
      return { success: false, message: "Failed to resend auth code" };
    }

    return { success: true, message: "Auth code resent successfully" };
  }

}

export default AuthService;
