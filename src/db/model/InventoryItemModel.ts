import mongoose, {Schema} from "mongoose";
import Item from "../../interfaces/Item";

const ItemSchema: Schema = new Schema(
    {
        name: {type: String, required: true, unique: true, index: true},
        price: {type: Number, required: true, unique: false, index: false},
        inventory: {type: Number, required: false, unique: false, index: false, default: 0},
        minimumOrder: {type: Number, required: false, unique: false, index: false, default: 1},
        createDate: {type: Number, index: false, unique: false, required: false, default: 0},
        modifyDate: {type: Number, index: false, unique: false, required: false, default: 0},
    },
    {
        versionKey: false,
    }
);

const InventoryItemModel = mongoose.model<Item & mongoose.Document>("Item", ItemSchema);

export default InventoryItemModel;