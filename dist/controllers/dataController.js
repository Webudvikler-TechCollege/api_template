"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataController = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("../services/sequelize"));
const userModel_1 = __importDefault(require("../models/userModel"));
const seed_1 = require("../services/seed");
exports.dataController = express_1.default.Router();
const url = 'users';
// Test database connection
exports.dataController.get('/test', async (req, res) => {
    try {
        await sequelize_1.default.authenticate();
        res.status(200).send({ message: 'Database connection successful' });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
});
// Synchronize database tables
exports.dataController.get('/sync', async (req, res) => {
    try {
        const forceSync = req.query.force === 'true';
        await sequelize_1.default.sync({ force: forceSync });
        res.status(200).json({ message: `Database synchronized ${forceSync ? 'with force' : 'without force'}` });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
});
// Seed database from CSV files
exports.dataController.get('/seedfromcsv', async (req, res) => {
    try {
        // Array med seed filer og models
        const files_to_seed = [
            { file: 'user.csv', model: userModel_1.default },
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
});
