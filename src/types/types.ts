export interface IUser {
    email: string;
    username: string;
    password?: string;
    phone: string;
    resetPasswordToken: string | null;
    resetPasswordExpires: Date | null;
  }
  
export interface IUserResult {
    success: boolean;
    message: string;
    token?: string;
  }
  
  export interface IUserDocument extends IUser, Document {
    matchPassword(enteredPassword: string): Promise<boolean>;
    generatePasswordResetToken(): string; 
  }
  