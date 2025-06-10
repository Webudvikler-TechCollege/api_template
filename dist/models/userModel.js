"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../services/sequelize"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default, // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
    hooks: {
        beforeCreate: async (user, options) => {
            user.password = await createHash(user.password);
        },
        beforeUpdate: async (user, options) => {
            user.password = await createHash(user.password);
        },
    },
});
User.addHook('beforeBulkCreate', async (users) => {
    // Krypter hver adgangskode før bulkCreate-operationen
    for (const user of users) {
        user.password = await bcrypt_1.default.hash(user.password, 10);
    }
});
const createHash = async (string) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashed_string = await bcrypt_1.default.hash(string, salt);
    return hashed_string;
};
exports.default = User;
