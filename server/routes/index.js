import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRouter from './user.js';
import * as controller from '../controller/index.js';
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
router.post('/create-session', controller.create_session);
router.post('/sign-up', controller.signup);
// router.get('/profile', authenticateToken, controller.profile);
// router.get('/profile/id', authenticateToken, controller.disposer_profile);
// router.post('/update-profile', authenticateToken, controller.update_profile);
// router.get('/checkUsername', authenticateToken, controller.checkUsername);
router.get('/getTomTomApiKey', authenticateToken, (req, res) => {
  return res.status(200).json({ message: 'Api key sent successfully!', apiKey: process.env.API_KEY });
});

export default router;