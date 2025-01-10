import express from 'express';
import UserController from './user-controllers';

const router =  express.Router();
const userController = new UserController();

// route for users
router.get("/", (req, res) => {
  res.send("users route");
});

router.get("/k", userController.getUsers);


export default router;
