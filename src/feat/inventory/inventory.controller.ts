import { Request, Response } from "express";
import { InventoryModel } from "./inventory.model";

// Create a new inventory item
export const createInventoryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, quantity, price } = req.body;
    const createdBy = req.user;

    const newItem = new InventoryModel({
      name,
      description,
      quantity,
      price,
      createdBy,
    });

    await newItem.save();
    return res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create inventory item", error });
  }
};

// Get all inventory items
export const getAllInventoryItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const items = await InventoryModel.find({ createdBy: req.user }).populate("createdBy", "username email");
    return res.status(200).json({ success: true, items });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve inventory items", error });
  }
};

// Get a single inventory item by ID
export const getInventoryItemById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const item = await InventoryModel.findOne({ _id: id, createdBy: req.user });

    if (!item) {
      return res.status(404).json({ success: false, message: "Inventory item not found" });
    }

    return res.status(200).json({ success: true, item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve inventory item", error });
  }
};

// Update an inventory item by ID
export const updateInventoryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;

    const updatedItem = await InventoryModel.findOneAndUpdate(
      { _id: id, createdBy: req.user },
      { name, description, quantity, price },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Inventory item not found or unauthorized" });
    }

    return res.status(200).json({ success: true, item: updatedItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update inventory item", error });
  }
};

// Delete an inventory item by ID
export const deleteInventoryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedItem = await InventoryModel.findOneAndDelete({ _id: id, createdBy: req.user });

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Inventory item not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Inventory item deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete inventory item", error });
  }
};
