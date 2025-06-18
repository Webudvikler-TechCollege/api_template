"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const dbRoutes_1 = require("./routes/dbRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/users", userRoutes_1.router);
app.use("/api/auth", authRoutes_1.router);
app.use("/db", dbRoutes_1.router);
exports.default = app;
