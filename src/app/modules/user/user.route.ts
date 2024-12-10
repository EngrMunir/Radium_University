import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();


// will call controller func
router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent);


export const UserRoutes = router;
