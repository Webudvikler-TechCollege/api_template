"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.getUserIdFromToken = exports.verifyRefreshToken = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken = (user, type) => {
    const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`];
    const expires_in = process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];
    if (!key || !expires_in) {
        throw new Error(`Missing env vars for ${type} token`);
    }
    const expTime = Math.floor(Date.now() / 1000) + Number(expires_in);
    return jsonwebtoken_1.default.sign({ exp: expTime, data: { id: user.id } }, key);
};
exports.generateToken = generateToken;
const authenticateUser = async (username, password) => {
    const user = await userModel_1.default.findOne({
        attributes: ["id", "firstname", "lastname", "password"],
        where: { email: username, is_active: 1 },
    });
    if (!user)
        return null;
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return null;
    const refresh_token = generateToken(user, "refresh");
    const access_token = generateToken(user, "access");
    await userModel_1.default.update({ refresh_token }, { where: { id: user.id } });
    return {
        access_token,
        refresh_token,
        user: { id: user.id, firstname: user.firstname, lastname: user.lastname },
    };
};
exports.authenticateUser = authenticateUser;
const verifyRefreshToken = async (refresh_token) => {
    const user = await userModel_1.default.findOne({ where: { refresh_token } });
    if (!user)
        return null;
    jsonwebtoken_1.default.verify(refresh_token, process.env.TOKEN_REFRESH_KEY); // will throw if invalid
    const access_token = generateToken(user, "access");
    return access_token;
};
exports.verifyRefreshToken = verifyRefreshToken;
const getUserIdFromToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_ACCESS_KEY);
        return decoded.data.id;
    }
    catch {
        return null;
    }
};
exports.getUserIdFromToken = getUserIdFromToken;
