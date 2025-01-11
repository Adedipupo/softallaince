import { UserModel } from "./user-model";


class UserService {
  /**
   * Retrieves all users from the database.
   * @returns Promise containing user data or throws an error.
   */
  async getAllUsers() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch users");
    }
  }

}

export default UserService;