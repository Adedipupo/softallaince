import express from 'express';
import usersRoute from "../feat/user/user-route";
import authRoute from "../feat/auth/auth.route";


const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", usersRoute);


export default router;
