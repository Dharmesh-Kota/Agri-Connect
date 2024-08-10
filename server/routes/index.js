import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRouter from './user.js';
import * as controller from '../controller/index.js';
import * as hiring_controller from '../controller/hiring.js';
import { authenticateToken } from '../config/authMiddleware.js';

dotenv.config();
const router = express.Router();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type', 'Role'],
  };
  
router.use(cors(corsOptions));

router.get('/', (req, res) => {
  return res.json('Hello!');
})
// router.use('/user', userRouter);

// Basic routes
router.post('/create-session', controller.create_session);
router.post('/sign-up', controller.signup);
router.get('/profile/:username', authenticateToken, controller.profile);
router.post('/update-profile/:username', authenticateToken, controller.update_profile);

// Hiring routes
// Hiring Side
router.post('/create-work-application', authenticateToken, hiring_controller.create_work_application);
router.get('/view-applications', authenticateToken, hiring_controller.view_applications);
router.get('/hire-worker/:application_id/:worker', authenticateToken, hiring_controller.hire_worker);
// Worker Side
router.get('/work-application', authenticateToken, hiring_controller.work_application);
router.get('/apply-for-work/:application_id', authenticateToken, hiring_controller.apply_for_work);

// router.get('/checkUsername', authenticateToken, controller.checkUsername);
router.get('/getTomTomApiKey', authenticateToken, (req, res) => {
  return res.status(200).json({ message: 'Api key sent successfully!', apiKey: process.env.API_KEY });
});

export default router;