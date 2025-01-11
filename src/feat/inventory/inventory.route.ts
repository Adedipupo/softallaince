import express from "express";
import { verifiedUser } from "../../middleware";
import { createInventoryItem, deleteInventoryItem, getAllInventoryItems, getInventoryItemById, updateInventoryItem } from "./inventory.controller";

const router = express.Router();

router.post("/create", verifiedUser, createInventoryItem);
router.get("/", verifiedUser, getAllInventoryItems);
router.get("/:id", verifiedUser, getInventoryItemById);
router.put("/:id", verifiedUser, updateInventoryItem);
router.delete("/:id", verifiedUser, deleteInventoryItem);

export default router;
