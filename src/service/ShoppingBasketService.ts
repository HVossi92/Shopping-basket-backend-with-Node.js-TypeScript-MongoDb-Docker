import ShoppingBasketModel from "../db/model/ShoppingBasketModel";
import InventoryItemModel from "../db/model/InventoryItemModel";
import ShoppingBasketNotFoundException from "../exceptions/ShoppingBasketNotFoundException";
import ShoppingBasketItem from "../interfaces/ShoppingBasketItem";
import Item from "../interfaces/Item";
import {
  fetchInventoryItemsAndThrowForNonExistingItems,
  fetchShoppingBasketElseThrow,
  updateInventoryForFinalOrder,
} from "../helper/DbHelper";
import {
  condenseItems,
  removeItemsWhoseOrderedQuantityExceedsInventory,
  setMinimumOrderQuantity,
} from "../helper/ShoppingBasketItemHelper";

export async function createShoppingBasketInDb(
  itemsToAdd: ShoppingBasketItem[]
) {
  itemsToAdd = condenseItems(itemsToAdd);
  const inventoryItems: Item[] =
    await fetchInventoryItemsAndThrowForNonExistingItems(itemsToAdd);

  itemsToAdd = setMinimumOrderQuantity(itemsToAdd, inventoryItems);
  itemsToAdd = removeItemsWhoseOrderedQuantityExceedsInventory(
    itemsToAdd,
    inventoryItems
  );

  await updateInventoryForFinalOrder(itemsToAdd, inventoryItems);

  return createShoppingBasket(itemsToAdd, inventoryItems);
}

export async function addItemsToShoppingBasketByIdInDb(
  shoppingBasketId: string,
  itemsToAdd: ShoppingBasketItem[]
) {
  itemsToAdd = condenseItems(itemsToAdd);
  const inventoryItems = await fetchInventoryItemsAndThrowForNonExistingItems(
    itemsToAdd
  );
  const shoppingBasketDbo = await fetchShoppingBasketElseThrow(
    shoppingBasketId
  );
  shoppingBasketDbo.modifyDate = Date.now();

  itemsToAdd = setMinimumOrderQuantity(itemsToAdd, inventoryItems);
  itemsToAdd = removeItemsWhoseOrderedQuantityExceedsInventory(
    itemsToAdd,
    inventoryItems
  );

  await updateInventoryForFinalOrder(itemsToAdd, inventoryItems);

  shoppingBasketDbo.shoppingBasketItems.push(...itemsToAdd);

  shoppingBasketDbo.shoppingBasketItems = condenseItems(
    shoppingBasketDbo.shoppingBasketItems
  );
  shoppingBasketDbo.totalPrice = sumUpPriceForAllItems(
    shoppingBasketDbo.shoppingBasketItems,
    inventoryItems
  );
  try {
    return new ShoppingBasketModel(shoppingBasketDbo).save();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeItemsFromShoppingBasketByIdInDb(
  shoppingBasketId: string,
  itemsToRemove: ShoppingBasketItem[]
) {
  itemsToRemove = condenseItems(itemsToRemove);

  const shoppingBasketDbo = await fetchShoppingBasketElseThrow(
    shoppingBasketId
  );
  const inventoryItems = await fetchInventoryItemsAndThrowForNonExistingItems(
    itemsToRemove
  );
  shoppingBasketDbo.modifyDate = Date.now();

  for (const item of shoppingBasketDbo.shoppingBasketItems) {
    const numItemsToRemove =
      itemsToRemove.find((itemToRemove) => itemToRemove.itemId === item.itemId)
        ?.amount || 0;
    let numItemsRemoved = Math.min(item.amount, numItemsToRemove);

    const inventoryItem = inventoryItems.find(
      (inventoryItem) => inventoryItem._id.toString() === item.itemId
    );

    if (inventoryItem) {
      if (item.amount - numItemsRemoved < inventoryItem.minimumOrder) {
        console.info("Item amount would be smaller than minimum quantity. Item amount is set to 0 instead.")
        numItemsRemoved = item.amount;
      }
      item.amount -= numItemsRemoved;

      inventoryItem.inventory += numItemsRemoved;
      await new InventoryItemModel(inventoryItem).save();
    }
  }

  shoppingBasketDbo.totalPrice = sumUpPriceForAllItems(
    shoppingBasketDbo.shoppingBasketItems,
    inventoryItems
  );
  return new ShoppingBasketModel(shoppingBasketDbo).save();
}

export async function deleteShoppingBasketByIdInDb(shoppingBasketId: string) {
  const deleted = await ShoppingBasketModel.deleteOne({
    _id: shoppingBasketId,
  });
  if (deleted.deletedCount === 0) {
    throw new ShoppingBasketNotFoundException(shoppingBasketId);
  }
}

export async function getShoppingBasketByIdFromDb(shoppingBasketId: string) {
  return fetchShoppingBasketElseThrow(shoppingBasketId);
}

async function createShoppingBasket(
  shoppingBasketItems: ShoppingBasketItem[],
  inventoryItems: Item[]
) {
  const shoppingBasketDto = {
    shoppingBasketItems: shoppingBasketItems,
    totalPrice: sumUpPriceForAllItems(shoppingBasketItems, inventoryItems),
    createDate: Date.now(),
    modifyDate: Date.now(),
  };
  return await new ShoppingBasketModel(shoppingBasketDto).save();
}

function sumUpPriceForAllItems(
  shoppingBasketItems: ShoppingBasketItem[],
  inventoryItems: Item[]
) {
  let totalPrice = 0;
  for (let item of shoppingBasketItems) {
    let inventoryItem = inventoryItems.find(
      (inventoryItem) => inventoryItem._id.toString() === item.itemId
    );
    if (!inventoryItem) {
      continue;
    }
    totalPrice += inventoryItem.price * item.amount;
    inventoryItem.inventory -= item.amount;
  }
  return totalPrice;
}
