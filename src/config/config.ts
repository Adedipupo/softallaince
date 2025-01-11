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
  PAYSTACK: {
    secret: process.env.PAYSTACK_SECRET_KEY,
    key: process.env.PAYSTACK_PUBLIC_KEY,
    webhook: process.env.PAYSTACK_WEBHOOK_SECRET
  },
  Email:{
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  },
  BaseUrl :{
    frontend: process.env.CLIENT_BASE_URL,
    backend: process.env.BASE_URL_BACKEND,
  }

};



export default Config;
