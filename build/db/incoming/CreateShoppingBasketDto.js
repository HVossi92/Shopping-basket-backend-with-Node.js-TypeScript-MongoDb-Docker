"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShoppingBasketDto = void 0;
var zod_1 = require("zod");
exports.createShoppingBasketDto = (0, zod_1.object)({
    body: (0, zod_1.object)({
        items: (0, zod_1.array)((0, zod_1.object)({ itemId: (0, zod_1.string)(), amount: (0, zod_1.number)() })),
    }),
});
//# sourceMappingURL=CreateShoppingBasketDto.js.map