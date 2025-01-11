import express from 'express';
import usersRoute from "../feat/user/user-route";
import authRoute from "../feat/auth/auth.route";
import inventoryRoute from "../feat/inventory/inventory.route";
import paymentRoute from "../feat/payment/payment.route";


const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", usersRoute);
router.use("/inventory", inventoryRoute);
router.use("/payment", paymentRoute);


export default router;
