import ShoppingBasketItem from "../interfaces/ShoppingBasketItem";
import Item from "../interfaces/Item";
import InventoryItemModel from "../db/model/InventoryItemModel";
import ItemNotFoundException from "../exceptions/ItemNotFoundException";
import ShoppingBasketModel from "../db/model/ShoppingBasketModel";
import ShoppingBasketNotFoundException from "../exceptions/ShoppingBasketNotFoundException";

export async function fetchInventoryItemsAndThrowForNonExistingItems(itemsToAdd: ShoppingBasketItem[]): Promise<Item[]> {
    const inventoryItems: Item[] = [];
    for (const shoppingItem of itemsToAdd) {
        const item = await InventoryItemModel.findById(shoppingItem.itemId);
        if (!item) {
            throw new ItemNotFoundException(shoppingItem.itemId);
        }
        inventoryItems.push(item);
    }
    return inventoryItems;
}

export async function fetchShoppingBasketElseThrow(shoppingBasketId: string) {
    const shoppingBasketDbo = await ShoppingBasketModel.findById(shoppingBasketId);
    if (!shoppingBasketDbo) {
        throw new ShoppingBasketNotFoundException(shoppingBasketId);
    }
    return shoppingBasketDbo;
}

export async function updateInventoryForFinalOrder(itemsToAdd: ShoppingBasketItem[], inventoryItems: Item[]) {
    for (const itemToAdd of itemsToAdd) {
        const invItem = inventoryItems.find(invItem => invItem._id.toString() === itemToAdd.itemId);
        if (invItem) {
            invItem.inventory -= itemToAdd.amount;
            if (invItem.inventory < 0) {
                invItem.inventory = 0;
            }
            await new InventoryItemModel(invItem).save();
        }
    }
}