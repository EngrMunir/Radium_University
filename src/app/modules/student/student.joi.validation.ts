import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can not be more than 20 characters")
    .regex(/^[A-Z][a-z]*$/, {
      message: "First Name must start with a capital letter and contain only alphabets",
    }),
  middleName: z.string().trim().optional().nullable(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, {
      message: "Last Name must contain only alphabets",
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father name is required"),
  fatherOccupation: z.string().nonempty("Father occupation is required"),
  fatherContactNo: z.string().nonempty("Father Contact No is required"),
  motherName: z.string().nonempty("Mother name is required"),
  motherContactNo: z.string().nonempty("Mother contact no is required"),
  motherOccupation: z.string().nonempty("Mother occupation is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
 body:z.object({
    name: userNameValidationSchema,
    gender: z.enum(["female", "male", "other"]),
    dateOfBirth: z.date().optional(),
    email: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester:z.string(),
    profileImg: z.string().optional(),
 })
});

export default studentValidationSchema;
