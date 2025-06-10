"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const authController_1 = require("./controllers/authController");
const dataController_1 = require("./controllers/dataController");
const userController_1 = require("./controllers/userController");
app_1.default.use(userController_1.userController, dataController_1.dataController, authController_1.authController);
