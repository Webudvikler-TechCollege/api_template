"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = exports.refreshAccessToken = exports.Authenticate = void 0;
const authService_1 = require("../services/authService");
const Authenticate = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Missing credentials" });
    }
    try {
        const result = await (0, authService_1.authenticateUser)(username, password);
        if (!result)
            res.sendStatus(401);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.Authenticate = Authenticate;
const refreshAccessToken = async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        res.status(400).json({ message: "Refresh token required" });
        return;
    }
    try {
        const access_token = await (0, authService_1.verifyRefreshToken)(refresh_token);
        if (!access_token)
            res.status(400).json({ message: "Invalid refresh token" });
        res.json({ access_token });
    }
    catch {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
const getUserFromToken = (req, res) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader?.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }
    ;
    const token = bearerHeader.split(" ")[1];
    const userId = (0, authService_1.getUserIdFromToken)(token);
    if (!userId)
        res.status(401).json({ message: "Invalid token" });
    res.json({ userId });
};
exports.getUserFromToken = getUserFromToken;
