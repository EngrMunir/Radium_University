import { z } from "zod";

const createAcademicSemesterValidationSchema = z.object({
    password: z
    .string({
        invalid_type_error:'Password must be string'
    })
    .max(20,{message:'Password can not be more than twenty characters'})
    .optional(),
});

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
}