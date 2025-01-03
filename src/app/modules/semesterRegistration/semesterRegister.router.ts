import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';


const router = express.Router();

router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationsSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch('/:id', validateRequest( SemesterRegistrationValidations.updateSemesterRegistrationValidationsSchema ),SemesterRegistrationController.updateSemesterRegistration);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);


export const semesterRegistrationRoutes = router;