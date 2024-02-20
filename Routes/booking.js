import express from 'express'

import { getCheckoutSession } from '../Controllers/bookingController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/checkout-session/:doctorId', authenticate, getCheckoutSession)

export default router