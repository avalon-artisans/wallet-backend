import express from 'express';
import {UserController} from '../application/user/UserController';

const router = express.Router();
const userController = new UserController();

// Define routes
router.get('/user', userController.getUser);

module.exports = router;
