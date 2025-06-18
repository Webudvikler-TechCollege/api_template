"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.sync = exports.test = void 0;
const sequelize_1 = __importDefault(require("../services/sequelize"));
const models_1 = require("../models");
const seed_1 = require("../services/seed");
// Test database connection
const test = async (req, res) => {
    try {
        await sequelize_1.default.authenticate();
        res.status(200).send({ message: 'Database connection successful' });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
};
exports.test = test;
// Synchronize database tables
const sync = async (req, res) => {
    try {
        const forceSync = req.query.force === 'true';
        await sequelize_1.default.sync({ force: forceSync });
        res.status(200).json({ message: `Database synchronized ${forceSync ? 'with force' : 'without force'}` });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
};
exports.sync = sync;
// Synchronize database tables
const seed = async (req, res) => {
    try {
        // Array med seed filer og models
        const files_to_seed = [
            { file: 'user.csv', model: models_1.User },
        ];
        // Array til svar
        const files_seeded = [];
        // Sync'er database
        await sequelize_1.default.sync({ force: true });
        // Looper og seeder filer til modeller
        for (let item of files_to_seed) {
            files_seeded.push(await (0, seed_1.seedFromCsv)(item.file, item.model));
        }
        res.status(200).json({ message: `Seeding complete! Files seeded: ${files_seeded}` });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
};
exports.seed = seed;
