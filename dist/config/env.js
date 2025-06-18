"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DBNAME, DBUSER, DBPASSWD, DBHOST, DBPORT } = process.env;
// Kast fejl hvis nødvendige variabler mangler
if (!DBNAME || !DBUSER || !DBPASSWD || !DBHOST || !DBPORT) {
    throw new Error('Missing required database environment variables');
}
exports.config = {
    db: {
        name: DBNAME,
        user: DBUSER,
        password: DBPASSWD,
        host: DBHOST,
        port: parseInt(DBPORT)
    }
};
