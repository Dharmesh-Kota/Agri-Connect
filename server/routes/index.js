import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRouter from './user.js';
import * as controller from '../controller/index.js';
import * as hiring_controller from '../controller/hiring.js';
import * as renting_controller from '../controller/renting.js';
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
});
// router.use('/user', userRouter);


// Basic routes
router.post('/create-session', controller.create_session);
router.post('/sign-up', controller.signup);
router.get('/profile/:username', authenticateToken, controller.profile);
router.post('/update-profile/:username', authenticateToken, controller.update_profile);


// Hiring routes
// Hiring Side
router.post('/create-work-application', authenticateToken, hiring_controller.create_work_application);
router.get('/view-work-applications', authenticateToken, hiring_controller.view_applications);
router.get('/hire-worker/:application_id/:worker', authenticateToken, hiring_controller.hire_worker);
router.get('/free-worker/:application_id/:worker', authenticateToken, hiring_controller.free_worker);
router.post('/update-work-application/:application_id', authenticateToken, hiring_controller.update_application);
router.get('/delete-work-application/:application_id', authenticateToken, hiring_controller.delete_application);
// Worker Side
router.get('/work-application', authenticateToken, hiring_controller.work_application);
router.get('/apply-for-work/:application_id', authenticateToken, hiring_controller.apply_for_work);
router.get('/cancel-work-application/:application_id', authenticateToken, hiring_controller.cancel_application);


// Machinery Routes
// Renter Side
router.post('/create-rent-application', authenticateToken, renting_controller.create_rent_application);
router.get('/view-rent-applications', authenticateToken, renting_controller.view_applications);
router.get('/free-machinery/:rent_id/:user', authenticateToken, renting_controller.free_machinery);
router.post('/update-rent-application/:rent_id', authenticateToken, renting_controller.update_application);
router.get('/delete-rent-application/:rent_id', authenticateToken, renting_controller.delete_application);
// Renting Side
router.get('/rent-application', authenticateToken, renting_controller.rent_application);
router.post('/rent-machinery', authenticateToken, renting_controller.rent_machinery);


// router.get('/checkUsername', authenticateToken, controller.checkUsername);
router.get('/getTomTomApiKey', authenticateToken, (req, res) => {
  return res.status(200).json({ message: 'Api key sent successfully!', apiKey: process.env.API_KEY });
});

export default router;