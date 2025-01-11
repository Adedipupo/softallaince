import express from "express";
import { verifiedUser } from "../../middleware";
import { initiatePayment } from "./payment.controller";

const router = express.Router();

router.post("/initiate/:itemId", verifiedUser, initiatePayment);
// router.post("/paystack-webhook", paystackWebhook);

export default router;
