import express from 'express';
import { Authenticate, Authorize, refreshAccessToken} from '../services/auth';

export const authController = express.Router();

authController.post('/login', (req, res) => { Authenticate(req, res) });
authController.get('/authorize', Authorize, (req, res, next) => { res.send({ message: 'You are logged in'}) })
authController.post('/refresh', async (req, res) => { await refreshAccessToken(req, res); })
