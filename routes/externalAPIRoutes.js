import express from 'express';
import { getRandomUser } from '../controllers/externalAPIController.js';

const router = express.Router();

router.get('/random-user', getRandomUser);

export default router;
