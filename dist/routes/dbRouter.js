"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const dbController_1 = require("../controllers/dbController");
exports.router = (0, express_1.Router)();
exports.router.get("/test", dbController_1.test);
exports.router.get("/sync", dbController_1.sync);
exports.router.get("/seed", dbController_1.seed);
