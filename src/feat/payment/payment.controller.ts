import { Request, Response } from "express";
import paystack from "paystack";
import { InventoryModel } from "../inventory/inventory.model";
import Config from "../../config/config";
import { UserModel } from "../user/user-model";

const paystackInstance = paystack(Config.PAYSTACK.secret as string);

interface IPaymentResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const initiatePayment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { itemId } = req.params;
      const userId = req.user;
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const inventoryItem = await InventoryModel.findOne({ _id: itemId });
      if (!inventoryItem) {
        return res.status(404).json({ success: false, message: "Inventory item not found" });
      }
  
      const amount = inventoryItem.price * 100;
  
      const paystackPayload = {
        email: req.body.email,
        amount: amount, 
        reference: `${new Date().getTime()}`, 
        name: user.username, 
        order_id: inventoryItem._id,
      };
      console.log("paystackPayload",paystackPayload)
  
      const body = await paystackInstance.transaction.initialize(paystackPayload);
  
      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        data: body.data?.authorization_url,
      });
    } catch (error:any) {
      return res.status(500).json({ success: false, message: "Failed to initiate payment", error: error.message });
    }
  };


export const handlePaystackWebhook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const event = req.body;

    const isValid = await verifyWebhookSignature(req.headers['x-paystack-signature'] as string, req.body);

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    if (event.event === "charge.success") {
      const { reference, status } = event.data;

      if (status === "success") {
        const inventoryItem = await InventoryModel.findOne({ _id: event.data.order_id });

        if (!inventoryItem) {
          return res.status(404).json({ success: false, message: "Inventory item not found" });
        }

        inventoryItem.paymentStatus = "paid";
        await inventoryItem.save();

        return res.status(200).json({ success: true, message: "Payment successful, inventory item marked as paid" });
      }
    }

    return res.status(200).json({ success: true, message: "Event handled successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to handle Paystack webhook", error });
  }
};

const verifyWebhookSignature = async (signature: string | undefined, body: any): Promise<boolean> => {
  const hash = require("crypto")
    .createHmac("sha512", Config.PAYSTACK.secret as string)
    .update(JSON.stringify(body))
    .digest("hex");

  return hash === signature;
};
