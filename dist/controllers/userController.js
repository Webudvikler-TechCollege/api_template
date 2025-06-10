"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../models/index");
const auth_1 = require("../services/auth");
exports.userController = express_1.default.Router();
const url = 'users';
exports.userController.get(`/${url}`, auth_1.Authorize, async (req, res) => {
    try {
        const data = await index_1.User.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'createdAt']
        });
        if (!data || data.length === 0) {
            res.status(404).json({ message: "No Users found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching Users: ${error.message}` });
    }
});
exports.userController.get(`/${url}/:id`, auth_1.Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const data = await index_1.User.findByPk(id, {
            attributes: ['id', 'firstname', 'lastname', 'email', 'is_active', 'createdAt'],
        });
        if (!data) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching User: ${error.message}` });
    }
});
exports.userController.post(`/${url}`, auth_1.Authorize, async (req, res) => {
    const { firstname, lastname, email, password, refresh_token, is_active } = req.body;
    try {
        const newData = await index_1.User.create({ firstname, lastname, email, password, refresh_token, is_active });
        res.status(201).json(newData);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating User: ${error.message}` });
    }
});
exports.userController.put(`/${url}/:id`, auth_1.Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    const { firstname, lastname, email, password, refresh_token, is_active } = req.body;
    try {
        const [updated] = await index_1.User.update({ firstname, lastname, email, password, refresh_token, is_active }, { where: { id } });
        if (updated) {
            const updatedUser = await index_1.User.findByPk(id);
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error updating User: ${error.message}` });
    }
});
exports.userController.patch(`/${url}/:id`, auth_1.Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const { password, confirmPassword } = req.body;
        // Validate password exists
        if (!password) {
            res.status(400).json({ message: "Password is required" });
        }
        // Optional: Validate password confirmation
        if (confirmPassword && password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
        }
        // Update record 
        const [updated] = await index_1.User.update({ password }, {
            where: { id },
            individualHooks: true // Åbner for hooks i modellen
        });
        if (!updated) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating User: ${error.message}` });
    }
});
exports.userController.delete(`/${url}/:id`, auth_1.Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const deleted = await index_1.User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting User: ${error.message}` });
    }
});
