"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var database = "mongodb://172.17.0.1:27017/shopping";
var databaseDevelopment = "mongodb://localhost:27017/shopping";
function connectToDb() {
    console.log("Trying to connect to mongoDb");
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(database, {
        serverSelectionTimeoutMS: 1000
    }).then(function () {
        console.log("Connected to database");
    }).catch(function (err) {
        console.error("Unable to connect to production database, trying to connect to development db: ", err);
        mongoose_1.default.connect(databaseDevelopment).then(function () {
            console.log("Connected to development database");
        }).catch(function (err) {
            console.error("Unable to connect to development database: ", err);
            process.exit(1);
        });
    });
}
exports.connectToDb = connectToDb;
//# sourceMappingURL=connection.js.map