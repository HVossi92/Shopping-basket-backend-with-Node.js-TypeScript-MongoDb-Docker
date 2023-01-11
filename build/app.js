"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connection_1 = require("./db/connection");
var router_1 = require("./router");
var port = 3000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(port, function () {
    console.log("Server running on port 3000");
    (0, connection_1.connectToDb)();
    (0, router_1.routes)(app);
});
//# sourceMappingURL=app.js.map