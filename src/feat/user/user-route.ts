import express from 'express';
import UserController from './user-controllers';
import { verifiedUser } from '../../middleware';

const router =  express.Router();
const userController = new UserController();

// route for users
router.get("/", (req, res) => {
  res.send("users route");
});

router.get("/users", verifiedUser, userController.getUsers);


export default router;
