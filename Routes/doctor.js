import express from 'express';
import { deleteDoctor, getAllDoctor, getSingleDoctor, updateDoctor } from '../Controllers/doctorControllers.js';


const router = express.Router();

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

export default router;
