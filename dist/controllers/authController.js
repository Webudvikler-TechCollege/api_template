"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../services/auth");
exports.authController = express_1.default.Router();
exports.authController.post('/login', (req, res) => { (0, auth_1.Authenticate)(req, res); });
exports.authController.get('/authorize', auth_1.Authorize, (req, res, next) => { res.send({ message: 'You are logged in' }); });
exports.authController.post('/refresh', async (req, res) => { await (0, auth_1.refreshAccessToken)(req, res); });
