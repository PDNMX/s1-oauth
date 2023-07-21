import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.post('/token', AuthController.getDataClient, asyncHandler(AuthController.createToken));

export default router;