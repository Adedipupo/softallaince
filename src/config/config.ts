import dotenv from "dotenv";

dotenv.config();

const Config = {
  serverPort: process.env.PORT as string,
  environment: process.env.NODE_ENV as string,
  mongo: {
    url: process.env.MONGO_URL as string,
  },
  JWTHeader: {
    secret: process.env.JWT_SECRET  || 'defaultSecret',
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    algorithm: process.env.JWT_ALGORITHM,
    expires: process.env.JWT_EXPIRES,
  },
};



export default Config;
