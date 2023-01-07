import {Express} from "express";
import {
    addItemsToShoppingBasket,
    createShoppingBasket,
    deleteShoppingBasketById,
    getShoppingBasketById,
    removeItemsFromShoppingBasket
} from "./controller/ShoppingBasketController";
import {createItem, deleteItem, getItemById} from "./controller/ItemController";

export function routes(app: Express){
    app.get("/health", (req, res) => {
        res.send("OK");
    });

    app.get("/api/v1/item/:itemId", getItemById);
    app.delete("/api/v1/item/:itemId", deleteItem);
    app.post("/api/v1/item", createItem);

    app.post("/api/v1/shoppingBasket", createShoppingBasket);
    app.get("/api/v1/shoppingBasket/:shoppingBasketId", getShoppingBasketById);
    app.delete("/api/v1/shoppingBasket/:shoppingBasketId", deleteShoppingBasketById);
    app.patch("/api/v1/shoppingBasket/:shoppingBasketId", addItemsToShoppingBasket);
    app.delete("/api/v1/shoppingBasket/:shoppingBasketId/items", removeItemsFromShoppingBasket);
}
