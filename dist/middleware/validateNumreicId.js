"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumericId = void 0;
const validateNumericId = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ error: "ID skal være et numerisk heltal" });
        return;
    }
    next();
};
exports.validateNumericId = validateNumericId;
