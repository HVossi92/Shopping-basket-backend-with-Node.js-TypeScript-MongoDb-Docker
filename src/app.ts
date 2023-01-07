import express from "express";
import {connectToDb} from "./db/connection";
import {routes} from "./router";

const port = 3000;
const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log("Server running on port 3000");
    connectToDb();
    routes(app);
});