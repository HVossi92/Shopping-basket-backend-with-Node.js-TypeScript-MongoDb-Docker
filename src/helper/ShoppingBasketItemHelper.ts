import ShoppingBasketItem from "../interfaces/ShoppingBasketItem";
import Item from "../interfaces/Item";

export function condenseItems(uncondensedItems: ShoppingBasketItem[]) {
    const uniqueItems: ShoppingBasketItem[] = [];
    for (const item of uncondensedItems) {
        if (!uniqueItems.find(uniqueItem => uniqueItem.itemId === item.itemId)) {
            uniqueItems.push(item);
        } else {
            const uniqueItem = uniqueItems.find(uniqueItem => uniqueItem.itemId === item.itemId);
            if (uniqueItem) {
                uniqueItem.amount += item.amount;
            }
        }
    }
    return uniqueItems;
}

export function setMinimumOrderQuantity(itemsToAdd: ShoppingBasketItem[], inventoryItems: Item[]): ShoppingBasketItem[] {
    for (const itemToAdd of itemsToAdd) {
        const inventoryItem = inventoryItems.find(invItem => invItem._id.toString() === itemToAdd.itemId);
        if (!inventoryItem) {
            continue;
        }

        if (itemToAdd.amount < inventoryItem.minimumOrder) {
            itemToAdd.amount = inventoryItem.minimumOrder;
            console.info(`Amount of item ${itemToAdd.itemId} was set to minimum order ${inventoryItem.minimumOrder}`);
        }
    }

    return itemsToAdd;
}

export function removeItemsWhoseOrderedQuantityExceedsInventory(itemsToAdd: ShoppingBasketItem[], inventoryItems: Item[]): ShoppingBasketItem[] {
    const updatedItemsToAdd: ShoppingBasketItem[] = [];
    for (const itemToAdd of itemsToAdd) {
        const inventoryItem = inventoryItems.find(invItem => invItem._id.toString() === itemToAdd.itemId);
        if (!inventoryItem) {
            continue;
        }

        if (inventoryItem.minimumOrder > inventoryItem.inventory) {
            itemsToAdd.splice(itemsToAdd.indexOf(itemToAdd, 1));
            console.info(`Item with id ${itemToAdd.itemId} has not enough inventory to fulfill the minimum order`);
        } else if (itemToAdd.amount > inventoryItem.inventory) {
            itemsToAdd.splice(itemsToAdd.indexOf(itemToAdd, 1));
            console.info(`Item with id ${itemToAdd.itemId} has not enough inventory to fulfill the order`);
        } else {
            updatedItemsToAdd.push(itemToAdd);
        }
    }
    return updatedItemsToAdd;
}