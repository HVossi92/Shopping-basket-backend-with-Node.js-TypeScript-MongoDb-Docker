"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventoryForFinalOrder = exports.fetchShoppingBasketElseThrow = exports.fetchInventoryItemsAndThrowForNonExistingItems = void 0;
var InventoryItemModel_1 = __importDefault(require("../db/model/InventoryItemModel"));
var ItemNotFoundException_1 = __importDefault(require("../exceptions/ItemNotFoundException"));
var ShoppingBasketModel_1 = __importDefault(require("../db/model/ShoppingBasketModel"));
var ShoppingBasketNotFoundException_1 = __importDefault(require("../exceptions/ShoppingBasketNotFoundException"));
function fetchInventoryItemsAndThrowForNonExistingItems(itemsToAdd) {
    return __awaiter(this, void 0, void 0, function () {
        var inventoryItems, _i, itemsToAdd_1, shoppingItem, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inventoryItems = [];
                    _i = 0, itemsToAdd_1 = itemsToAdd;
                    _a.label = 1;
                case 1:
                    if (!(_i < itemsToAdd_1.length)) return [3 /*break*/, 4];
                    shoppingItem = itemsToAdd_1[_i];
                    return [4 /*yield*/, InventoryItemModel_1.default.findById(shoppingItem.itemId)];
                case 2:
                    item = _a.sent();
                    if (!item) {
                        throw new ItemNotFoundException_1.default(shoppingItem.itemId);
                    }
                    inventoryItems.push(item);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, inventoryItems];
            }
        });
    });
}
exports.fetchInventoryItemsAndThrowForNonExistingItems = fetchInventoryItemsAndThrowForNonExistingItems;
function fetchShoppingBasketElseThrow(shoppingBasketId) {
    return __awaiter(this, void 0, void 0, function () {
        var shoppingBasketDbo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ShoppingBasketModel_1.default.findById(shoppingBasketId)];
                case 1:
                    shoppingBasketDbo = _a.sent();
                    if (!shoppingBasketDbo) {
                        throw new ShoppingBasketNotFoundException_1.default(shoppingBasketId);
                    }
                    return [2 /*return*/, shoppingBasketDbo];
            }
        });
    });
}
exports.fetchShoppingBasketElseThrow = fetchShoppingBasketElseThrow;
function updateInventoryForFinalOrder(itemsToAdd, inventoryItems) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, itemsToAdd_2, itemToAdd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (itemToAdd) {
                        var invItem;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    invItem = inventoryItems.find(function (invItem) { return invItem._id.toString() === itemToAdd.itemId; });
                                    if (!invItem) return [3 /*break*/, 2];
                                    invItem.inventory -= itemToAdd.amount;
                                    if (invItem.inventory < 0) {
                                        invItem.inventory = 0;
                                    }
                                    return [4 /*yield*/, new InventoryItemModel_1.default(invItem).save()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, itemsToAdd_2 = itemsToAdd;
                    _a.label = 1;
                case 1:
                    if (!(_i < itemsToAdd_2.length)) return [3 /*break*/, 4];
                    itemToAdd = itemsToAdd_2[_i];
                    return [5 /*yield**/, _loop_1(itemToAdd)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateInventoryForFinalOrder = updateInventoryForFinalOrder;
//# sourceMappingURL=DbHelper.js.map