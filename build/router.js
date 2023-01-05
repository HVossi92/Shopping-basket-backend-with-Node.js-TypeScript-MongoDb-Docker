"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var ShoppingBasketController_1 = require("./controller/ShoppingBasketController");
var ItemController_1 = require("./controller/ItemController");
function routes(app) {
    app.get("/health", function (req, res) {
        res.send("OK");
    });
    app.get("/api/v1/item/:itemId", ItemController_1.getItemById);
    app.delete("/api/v1/item/:itemId", ItemController_1.deleteItem);
    app.post("/api/v1/item", ItemController_1.createItem);
    app.post("/api/v1/shoppingBasket", ShoppingBasketController_1.createShoppingBasket);
    app.get("/api/v1/shoppingBasket/:shoppingBasketId", ShoppingBasketController_1.getShoppingBasketById);
    app.delete("/api/v1/shoppingBasket/:shoppingBasketId", ShoppingBasketController_1.deleteShoppingBasketById);
    app.patch("/api/v1/shoppingBasket/:shoppingBasketId", ShoppingBasketController_1.addItemsToShoppingBasket);
    app.delete("/api/v1/shoppingBasket/:shoppingBasketId/items", ShoppingBasketController_1.removeItemsFromShoppingBasket);
}
exports.routes = routes;
//# sourceMappingURL=router.js.map