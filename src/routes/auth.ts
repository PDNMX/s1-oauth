import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.post('/token', [AuthController.getHeaderData, asyncHandler(AuthController.validationRequest)], asyncHandler(AuthController.createToken));

export default router;