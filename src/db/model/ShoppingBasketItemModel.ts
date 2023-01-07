import mongoose, {Schema} from "mongoose";
import ShoppingBasketItem from "../../interfaces/ShoppingBasketItem";

const ShoppingBasketItemModelSchema: Schema = new Schema(
    {
        itemId: {type: String, required: true, unique: false, index: true},
        amount: {type: Number, required: false, unique: false, index: false, default: 0},
    }
);

const ShoppingBasketItemModel = mongoose.model<ShoppingBasketItem & mongoose.Document>("ShoppingBasketItem", ShoppingBasketItemModelSchema);

export default ShoppingBasketItemModel;