"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemsWhoseOrderedQuantityExceedsInventory = exports.setMinimumOrderQuantity = exports.condenseItems = void 0;
function condenseItems(uncondensedItems) {
    var uniqueItems = [];
    var _loop_1 = function (item) {
        if (!uniqueItems.find(function (uniqueItem) { return uniqueItem.itemId === item.itemId; })) {
            uniqueItems.push(item);
        }
        else {
            var uniqueItem = uniqueItems.find(function (uniqueItem) { return uniqueItem.itemId === item.itemId; });
            if (uniqueItem) {
                uniqueItem.amount += item.amount;
            }
        }
    };
    for (var _i = 0, uncondensedItems_1 = uncondensedItems; _i < uncondensedItems_1.length; _i++) {
        var item = uncondensedItems_1[_i];
        _loop_1(item);
    }
    return uniqueItems;
}
exports.condenseItems = condenseItems;
function setMinimumOrderQuantity(itemsToAdd, inventoryItems) {
    var _loop_2 = function (itemToAdd) {
        var inventoryItem = inventoryItems.find(function (invItem) { return invItem._id.toString() === itemToAdd.itemId; });
        if (!inventoryItem) {
            return "continue";
        }
        if (itemToAdd.amount < inventoryItem.minimumOrder) {
            itemToAdd.amount = inventoryItem.minimumOrder;
            console.info("Amount of item ".concat(itemToAdd.itemId, " was set to minimum order ").concat(inventoryItem.minimumOrder));
        }
    };
    for (var _i = 0, itemsToAdd_1 = itemsToAdd; _i < itemsToAdd_1.length; _i++) {
        var itemToAdd = itemsToAdd_1[_i];
        _loop_2(itemToAdd);
    }
    return itemsToAdd;
}
exports.setMinimumOrderQuantity = setMinimumOrderQuantity;
function removeItemsWhoseOrderedQuantityExceedsInventory(itemsToAdd, inventoryItems) {
    var updatedItemsToAdd = [];
    var _loop_3 = function (itemToAdd) {
        var inventoryItem = inventoryItems.find(function (invItem) { return invItem._id.toString() === itemToAdd.itemId; });
        if (!inventoryItem) {
            return "continue";
        }
        if (inventoryItem.minimumOrder > inventoryItem.inventory) {
            itemsToAdd.splice(itemsToAdd.indexOf(itemToAdd, 1));
            console.info("Item with id ".concat(itemToAdd.itemId, " has not enough inventory to fulfill the minimum order"));
        }
        else if (itemToAdd.amount > inventoryItem.inventory) {
            itemsToAdd.splice(itemsToAdd.indexOf(itemToAdd, 1));
            console.info("Item with id ".concat(itemToAdd.itemId, " has not enough inventory to fulfill the order"));
        }
        else {
            updatedItemsToAdd.push(itemToAdd);
        }
    };
    for (var _i = 0, itemsToAdd_2 = itemsToAdd; _i < itemsToAdd_2.length; _i++) {
        var itemToAdd = itemsToAdd_2[_i];
        _loop_3(itemToAdd);
    }
    return updatedItemsToAdd;
}
exports.removeItemsWhoseOrderedQuantityExceedsInventory = removeItemsWhoseOrderedQuantityExceedsInventory;
//# sourceMappingURL=ShoppingBasketItemHelper.js.map