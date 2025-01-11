import express from "express";
import { verifiedUser } from "../../middleware";
import { handlePaystackWebhook, initiatePayment } from "./payment.controller";

const router = express.Router();

router.post("/initiate/:itemId", verifiedUser, initiatePayment);
router.post("/paystack-webhook", handlePaystackWebhook);

export default router;
