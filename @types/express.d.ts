import { IUserDocument } from "../src/types/types";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserDocument;
    }
  }
}
