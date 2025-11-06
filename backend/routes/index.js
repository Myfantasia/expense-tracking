import express from 'express';
//import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
//import transactionRoutes from './transactionRoutes.js';
//import accountRoutes from './accountRoutes.js';

const router = express.Router();

//router.use('/users', userRoutes);
router.use('/auth', authRoutes);
//router.use('/transaction', transactionRoutes);
//router.use('/account', accountRoutes);

export default router;