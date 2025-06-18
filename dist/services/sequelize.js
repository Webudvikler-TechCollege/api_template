"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import af dependencies
const sequelize_1 = require("sequelize");
const env_1 = require("../config/env");
const sequelize = new sequelize_1.Sequelize(env_1.config.db.name, env_1.config.db.user, env_1.config.db.password, {
    host: env_1.config.db.host,
    port: env_1.config.db.port,
    dialect: 'mysql',
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
    }
});
exports.default = sequelize;
