import { Schema, model, Document } from "mongoose";

export interface IInventory extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdBy?: string;  
}

const inventorySchema = new Schema<IInventory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const InventoryModel = model<IInventory>("Inventory", inventorySchema);
