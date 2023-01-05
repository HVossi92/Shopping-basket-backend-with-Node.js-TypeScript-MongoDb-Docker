"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemDto = void 0;
var zod_1 = require("zod");
exports.CreateItemDto = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        price: (0, zod_1.number)(),
        inventory: (0, zod_1.number)(),
        minimumOrder: (0, zod_1.number)(),
    }),
});
//# sourceMappingURL=CreateItemDto.js.map