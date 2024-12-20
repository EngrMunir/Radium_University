import { z } from "zod";

// UserName Schema
const createUserNameValidationSchema = z.object({
    firstName: z
      .string()
      .min(1, 'First Name is required')
      .max(20, 'First Name cannot be more than 20 characters')
      .refine(
        (value) => /^[A-Z][a-z]*$/.test(value),
        { message: 'First Name must be capitalized' }
      ),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .min(1, 'Last Name is required')
      .refine((value) => /^[a-zA-Z]+$/.test(value), { message: 'Invalid Last Name' }),
  });
  
  // Guardian Schema
  const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, 'Father Name is required'),
    fatherOccupation: z.string().min(1, 'Father Occupation is required'),
    fatherContactNo: z.string().min(1, 'Father Contact No is required'),
    motherName: z.string().min(1, 'Mother Name is required'),
    motherContactNo: z.string().min(1, 'Mother Contact No is required'),
    motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  });
  
  // Local Guardian Schema
  const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, 'Local Guardian Name is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    contactNo: z.string().min(1, 'Contact No is required'),
    address: z.string().min(1, 'Address is required'),
  });
  
  // Student Schema
  
  export const createStudentValidationSchema = z.object({
    body:z.object({
      password:z.string().max(20),
      student:z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['female', 'male', 'other']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact No is required'),
      emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester:z.string(),
      profileImg: z.string().optional(),
      academicDepartment:z.string(),
      })
    })
  });

  const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  });
  
  // Guardian Schema
  const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherContactNo: z.string().optional(),
    motherOccupation: z.string().optional(),
  });
  
  // Local Guardian Schema
  const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  });
  export const updateStudentValidationSchema = z.object({
    body:z.object({
      student:z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['female', 'male', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester:z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      })
    })
  });
  export const studentValidations={
    createStudentValidationSchema,
    updateStudentValidationSchema
  };