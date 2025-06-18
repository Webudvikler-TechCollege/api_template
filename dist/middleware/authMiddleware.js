"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorize = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token not accepted" });
        return;
    }
    try {
        const token = bearerHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_ACCESS_KEY);
        req.user = decoded.data;
        next();
    }
    catch (error) {
        res.status(403).json({ message: error.message });
    }
};
exports.Authorize = Authorize;
