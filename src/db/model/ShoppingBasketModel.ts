import mongoose, {Schema} from "mongoose";
import ShoppingBasket from "../../interfaces/ShoppingBasket";
import ShoppingBasketItemModel from "./ShoppingBasketItemModel";

const shoppingBasketSchema: Schema = new Schema(
    {
        shoppingBasketItems: {type: [ShoppingBasketItemModel.schema], required: false, unique: false, index: false, default: []},
        totalPrice: {type: Number, required: false, unique: false, index: false, default: 0},
        createDate: {type: Number, index: false, unique: false, required: false, default: 0},
        modifyDate: {type: Number, index: false, unique: false, required: false, default: 0},
    },
    {
        versionKey: false,
    }
);

const ShoppingBasketModel = mongoose.model<ShoppingBasket & mongoose.Document>("ShoppingBasket", shoppingBasketSchema);

export default ShoppingBasketModel;