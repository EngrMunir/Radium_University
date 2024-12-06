import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
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
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, 'Father Name is required'),
    fatherOccupation: z.string().min(1, 'Father Occupation is required'),
    fatherContactNo: z.string().min(1, 'Father Contact No is required'),
    motherName: z.string().min(1, 'Mother Name is required'),
    motherContactNo: z.string().min(1, 'Mother Contact No is required'),
    motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  });
  
  // Local Guardian Schema
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1, 'Local Guardian Name is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    contactNo: z.string().min(1, 'Contact No is required'),
    address: z.string().min(1, 'Address is required'),
  });
  
  // Student Schema
  const studentValidationSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: userNameValidationSchema,
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
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).optional(),
  });

  export default studentValidationSchema;