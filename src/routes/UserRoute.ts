import express from 'express';
import {UserController} from '../application/user/UserController';

const router = express.Router();
const userController = new UserController();

// Define routes
router.post('', (request, response) => {
    userController.registerUser(request, response);
});

export default router;
