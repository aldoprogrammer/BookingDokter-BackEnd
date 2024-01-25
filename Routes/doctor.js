import express from 'express';
import { deleteDoctor, getAllDoctor, getDoctorProfile, getSingleDoctor, updateDoctor } from '../Controllers/doctorControllers.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRoute from './review.js'


const router = express.Router({ mergeParams: true});

// nested routes
router.use("/:doctorId/reviews", reviewRoute)

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctor)
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor)
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor)

router.get('/profile/me', authenticate, restrict(["doctor"]), getDoctorProfile)

export default router;
