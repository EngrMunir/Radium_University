import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';


const router = express.Router();

router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidation.createSemesterRegistrationValidationsSchema,
    ),
    SemesterRegistationController.createSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch('/:id',SemesterRegistrationController.updateSemesterRegistration);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);


export const semesterRegistrationRoutes = router;