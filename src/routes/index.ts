import express from 'express';
import usersRoute from "../feat/user/user-route";
import authRoute from "../feat/auth/auth.route";
import inventoryRoute from "../feat/inventory/inventory.route";


const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", usersRoute);
router.use("/inventory", inventoryRoute);


export default router;
