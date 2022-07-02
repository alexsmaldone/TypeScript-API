"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes = require('./routes');
database_config_1.default.sync().then(() => {
    console.log("Database synced");
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes);
const port = 3000;
app.get("/", (req, res) => {
    return res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
