import { body, param, query } from 'express-validator';

export const signupValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const updateProfileValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];

export const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
];

export const updateTaskValidator = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
];

export const taskIdParam = [param('id').isMongoId().withMessage('Invalid task id')];

export const listTasksQuery = [
  query('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  query('q').optional().isString(),
];
