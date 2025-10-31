import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { listTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { auth } from '../middleware/auth.js';
import {
  signupValidator,
  loginValidator,
  updateProfileValidator,
  createTaskValidator,
  updateTaskValidator,
  taskIdParam,
  listTasksQuery,
} from '../validators/index.js';

const router = Router();

// Auth
router.post('/auth/signup', signupValidator, signup);
router.post('/auth/login', loginValidator, login);

// Profile (protected)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfileValidator, updateProfile);

// Tasks (protected)
router.get('/tasks', auth, listTasksQuery, listTasks);
router.post('/tasks', auth, createTaskValidator, createTask);
router.get('/tasks/:id', auth, taskIdParam, getTask);
router.put('/tasks/:id', auth, [...taskIdParam, ...updateTaskValidator], updateTask);
router.delete('/tasks/:id', auth, taskIdParam, deleteTask);

export default router;
