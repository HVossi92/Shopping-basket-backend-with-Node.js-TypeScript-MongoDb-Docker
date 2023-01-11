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
exports.getShoppingBasketByIdFromDb = exports.deleteShoppingBasketByIdInDb = exports.removeItemsFromShoppingBasketByIdInDb = exports.addItemsToShoppingBasketByIdInDb = exports.createShoppingBasketInDb = void 0;
var ShoppingBasketModel_1 = __importDefault(require("../db/model/ShoppingBasketModel"));
var InventoryItemModel_1 = __importDefault(require("../db/model/InventoryItemModel"));
var ShoppingBasketNotFoundException_1 = __importDefault(require("../exceptions/ShoppingBasketNotFoundException"));
var DbHelper_1 = require("../helper/DbHelper");
var ShoppingBasketItemHelper_1 = require("../helper/ShoppingBasketItemHelper");
function createShoppingBasketInDb(itemsToAdd) {
    return __awaiter(this, void 0, void 0, function () {
        var inventoryItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.condenseItems)(itemsToAdd);
                    return [4 /*yield*/, (0, DbHelper_1.fetchInventoryItemsAndThrowForNonExistingItems)(itemsToAdd)];
                case 1:
                    inventoryItems = _a.sent();
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.setMinimumOrderQuantity)(itemsToAdd, inventoryItems);
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.removeItemsWhoseOrderedQuantityExceedsInventory)(itemsToAdd, inventoryItems);
                    return [4 /*yield*/, (0, DbHelper_1.updateInventoryForFinalOrder)(itemsToAdd, inventoryItems)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, createShoppingBasket(itemsToAdd, inventoryItems)];
            }
        });
    });
}
exports.createShoppingBasketInDb = createShoppingBasketInDb;
function addItemsToShoppingBasketByIdInDb(shoppingBasketId, itemsToAdd) {
    return __awaiter(this, void 0, void 0, function () {
        var inventoryItems, shoppingBasketDbo;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.condenseItems)(itemsToAdd);
                    return [4 /*yield*/, (0, DbHelper_1.fetchInventoryItemsAndThrowForNonExistingItems)(itemsToAdd)];
                case 1:
                    inventoryItems = _b.sent();
                    return [4 /*yield*/, (0, DbHelper_1.fetchShoppingBasketElseThrow)(shoppingBasketId)];
                case 2:
                    shoppingBasketDbo = _b.sent();
                    shoppingBasketDbo.modifyDate = Date.now();
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.setMinimumOrderQuantity)(itemsToAdd, inventoryItems);
                    itemsToAdd = (0, ShoppingBasketItemHelper_1.removeItemsWhoseOrderedQuantityExceedsInventory)(itemsToAdd, inventoryItems);
                    return [4 /*yield*/, (0, DbHelper_1.updateInventoryForFinalOrder)(itemsToAdd, inventoryItems)];
                case 3:
                    _b.sent();
                    (_a = shoppingBasketDbo.shoppingBasketItems).push.apply(_a, itemsToAdd);
                    shoppingBasketDbo.shoppingBasketItems = (0, ShoppingBasketItemHelper_1.condenseItems)(shoppingBasketDbo.shoppingBasketItems);
                    shoppingBasketDbo.totalPrice = sumUpPriceForAllItems(shoppingBasketDbo.shoppingBasketItems, inventoryItems);
                    try {
                        return [2 /*return*/, new ShoppingBasketModel_1.default(shoppingBasketDbo).save()];
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.addItemsToShoppingBasketByIdInDb = addItemsToShoppingBasketByIdInDb;
function removeItemsFromShoppingBasketByIdInDb(shoppingBasketId, itemsToRemove) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var shoppingBasketDbo, inventoryItems, _loop_1, _i, _b, item;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    itemsToRemove = (0, ShoppingBasketItemHelper_1.condenseItems)(itemsToRemove);
                    return [4 /*yield*/, (0, DbHelper_1.fetchShoppingBasketElseThrow)(shoppingBasketId)];
                case 1:
                    shoppingBasketDbo = _c.sent();
                    return [4 /*yield*/, (0, DbHelper_1.fetchInventoryItemsAndThrowForNonExistingItems)(itemsToRemove)];
                case 2:
                    inventoryItems = _c.sent();
                    shoppingBasketDbo.modifyDate = Date.now();
                    _loop_1 = function (item) {
                        var numItemsToRemove, numItemsRemoved, inventoryItem;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    numItemsToRemove = ((_a = itemsToRemove.find(function (itemToRemove) { return itemToRemove.itemId === item.itemId; })) === null || _a === void 0 ? void 0 : _a.amount) || 0;
                                    numItemsRemoved = Math.min(item.amount, numItemsToRemove);
                                    item.amount -= numItemsRemoved;
                                    inventoryItem = inventoryItems.find(function (inventoryItem) { return inventoryItem._id.toString() === item.itemId; });
                                    if (!inventoryItem) return [3 /*break*/, 2];
                                    inventoryItem.inventory += numItemsRemoved;
                                    return [4 /*yield*/, new InventoryItemModel_1.default(inventoryItem).save()];
                                case 1:
                                    _d.sent();
                                    _d.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _b = shoppingBasketDbo.shoppingBasketItems;
                    _c.label = 3;
                case 3:
                    if (!(_i < _b.length)) return [3 /*break*/, 6];
                    item = _b[_i];
                    return [5 /*yield**/, _loop_1(item)];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    shoppingBasketDbo.totalPrice = sumUpPriceForAllItems(shoppingBasketDbo.shoppingBasketItems, inventoryItems);
                    return [2 /*return*/, new ShoppingBasketModel_1.default(shoppingBasketDbo).save()];
            }
        });
    });
}
exports.removeItemsFromShoppingBasketByIdInDb = removeItemsFromShoppingBasketByIdInDb;
function deleteShoppingBasketByIdInDb(shoppingBasketId) {
    return __awaiter(this, void 0, void 0, function () {
        var deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ShoppingBasketModel_1.default.deleteOne({ _id: shoppingBasketId })];
                case 1:
                    deleted = _a.sent();
                    if (deleted.deletedCount === 0) {
                        throw new ShoppingBasketNotFoundException_1.default(shoppingBasketId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteShoppingBasketByIdInDb = deleteShoppingBasketByIdInDb;
function getShoppingBasketByIdFromDb(shoppingBasketId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, DbHelper_1.fetchShoppingBasketElseThrow)(shoppingBasketId)];
        });
    });
}
exports.getShoppingBasketByIdFromDb = getShoppingBasketByIdFromDb;
function createShoppingBasket(shoppingBasketItems, inventoryItems) {
    return __awaiter(this, void 0, void 0, function () {
        var shoppingBasketDto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shoppingBasketDto = {
                        shoppingBasketItems: shoppingBasketItems,
                        totalPrice: sumUpPriceForAllItems(shoppingBasketItems, inventoryItems),
                        createDate: Date.now(),
                        modifyDate: Date.now(),
                    };
                    return [4 /*yield*/, new ShoppingBasketModel_1.default(shoppingBasketDto).save()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function sumUpPriceForAllItems(shoppingBasketItems, inventoryItems) {
    var totalPrice = 0;
    var _loop_2 = function (item) {
        var inventoryItem = inventoryItems.find(function (inventoryItem) { return inventoryItem._id.toString() === item.itemId; });
        if (!inventoryItem) {
            return "continue";
        }
        totalPrice += inventoryItem.price * item.amount;
        inventoryItem.inventory -= item.amount;
    };
    for (var _i = 0, shoppingBasketItems_1 = shoppingBasketItems; _i < shoppingBasketItems_1.length; _i++) {
        var item = shoppingBasketItems_1[_i];
        _loop_2(item);
    }
    return totalPrice;
}
//# sourceMappingURL=ShoppingBasketService.js.map