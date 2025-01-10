export interface IUser {
    email: string;
    username: string;
    password?: string;
    phone: string;
  }
  
export interface IUserResult {
    success: boolean;
    message: string;
    token?: string;
  }
  
