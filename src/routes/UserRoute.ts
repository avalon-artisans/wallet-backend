import express from 'express';
import {UserController} from '../application/user/UserController';

const router = express.Router();
const userController = new UserController();

// Define routes
router.post('', userController.registerUser);
router.post('/auth', userController.authUser);

export default router;
