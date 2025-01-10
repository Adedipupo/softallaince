import express from 'express';
import usersRoute from "../user/user-route";
import authRoute from "../auth/auth.route";


const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", usersRoute);


export default router;
