"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFromCsv = exports.getCsvData = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("../services/sequelize"));
/**
 * Reads data from a CSV file and returns it as an array of objects.
 * @param {string} fileName - The name of the CSV file.
 * @returns {Promise<Array>} - A promise that resolves with the parsed CSV data.
 */
const getCsvData = async (fileName) => {
    const csvPath = path_1.default.resolve(`./data/${fileName}`);
    const data = [];
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(csvPath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });
};
exports.getCsvData = getCsvData;
/**
 * Seeds the database with data from a CSV file.
 * @param {string} fileName - The name of the CSV file to seed from.
 * @param {any} model - The Sequelize model to use for seeding.
 * @returns {Promise<string>} - A promise that resolves with a success message.
 */
const seedFromCsv = async (fileName, model) => {
    const transaction = await sequelize_1.default.transaction();
    try {
        const data = await getCsvData(fileName);
        await model.bulkCreate(data, { transaction });
        await transaction.commit();
        console.log(`Seeding completed for ${fileName}`);
        return fileName;
    }
    catch (error) {
        await transaction.rollback();
        console.error(`Error seeding from ${fileName}:`, error);
        return false;
    }
};
exports.seedFromCsv = seedFromCsv;
