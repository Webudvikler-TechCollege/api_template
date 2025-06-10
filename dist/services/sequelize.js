"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import af dependencies
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Giver adgang til variabler fra en .env-fil via process.env
dotenv_1.default.config();
const { DBNAME, DBUSER, DBPASSWD, DBHOST, DBPORT } = process.env;
// Kast fejl hvis nødvendige variabler mangler
if (!DBNAME || !DBUSER || !DBPASSWD || !DBHOST || !DBPORT) {
    throw new Error('Missing required database environment variables');
}
const sequelize = new sequelize_1.Sequelize(DBNAME, DBUSER, DBPASSWD, {
    host: DBHOST,
    port: parseInt(DBPORT),
    dialect: 'mysql',
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
    }
});
exports.default = sequelize;
