import jwt from "jsonwebtoken";
import Config from "../config/config";

class Token {
  static async generateToken(id: any) {
    try {
      return jwt.sign({id}, Config.JWTHeader.secret, { expiresIn: Config.JWTHeader.expires })  
    } catch (error) {
      return error
    }
  }
  static async verifyToken(token: string) {
    try {
      return jwt.verify(token, Config.JWTHeader.secret)   
    } catch (error) {
      return error
    }
  }
}

export default Token;
