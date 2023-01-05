"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var ShoppingBasketItemModel_1 = __importDefault(require("./ShoppingBasketItemModel"));
var shoppingBasketSchema = new mongoose_1.Schema({
    shoppingBasketItems: { type: [ShoppingBasketItemModel_1.default.schema], required: false, unique: false, index: false, default: [] },
    totalPrice: { type: Number, required: false, unique: false, index: false, default: 0 },
    createDate: { type: Number, index: false, unique: false, required: false, default: 0 },
    modifyDate: { type: Number, index: false, unique: false, required: false, default: 0 },
}, {
    versionKey: false,
});
var ShoppingBasketModel = mongoose_1.default.model("ShoppingBasket", shoppingBasketSchema);
exports.default = ShoppingBasketModel;
//# sourceMappingURL=ShoppingBasketModel.js.map