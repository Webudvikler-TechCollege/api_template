"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.router = (0, express_1.Router)();
exports.router.post("/login", (0, express_async_handler_1.default)(authController_1.Authenticate));
exports.router.post("/refresh", (0, express_async_handler_1.default)(authController_1.refreshAccessToken));
exports.router.get("/verify", authMiddleware_1.Authorize, authController_1.getUserFromToken);
