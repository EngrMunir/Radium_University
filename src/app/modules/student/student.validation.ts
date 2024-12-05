// creating a schema validation using Joi

import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.pattern.base': '{#label} must start with a capital letter and contain only alphabets',
        'string.empty': 'First Name is required',
        'string.max': 'First Name can not be more than 20 characters',
      }),
    
    middleName: Joi.string().trim().optional().allow(''),
  
    lastName: Joi.string()
      .required()
      .pattern(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base': '{#label} must contain only alphabets',
        'string.empty': 'Last name is required',
      }),
  });
  
  // Define Guardian schema
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.empty': 'Father occupation is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'string.empty': 'Father Contact No is required',
    }),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'string.empty': 'Mother contact no is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'string.empty': 'Mother occupation is required',
    }),
  });
  
  // Define LocalGuardian schema
  const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Local Guardian name is required',
    }),
    occupation: Joi.string().required().messages({
      'string.empty': 'Occupation is required',
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Contact No is required',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Address is required',
    }),
  });
  
  // Define Student schema
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'ID is required',
    }),
    name: userNameSchema.required(),
    gender: Joi.string()
      .valid('female', 'male', 'other')
      .required()
      .messages({
        'any.only': '{#label} must be one of [female, male, other]',
      }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': '{#label} must be a valid email',
        'string.empty': 'Email is required',
      }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Contact No is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'string.empty': 'Emergency Contact No is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional(),
    presentAddress: Joi.string().required().messages({
      'string.empty': 'Present Address is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'string.empty': 'Permanent Address is required',
    }),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
      .valid('active', 'blocked')
      .default('active'),
  });
  
  export default