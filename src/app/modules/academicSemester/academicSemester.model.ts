import { model, Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name:{
        type: String,
        required: true,
        enum:AcademicSemesterName
    },
    year:{
        type:String,
        required: true,
    },
    code:{
        type:String,
        required: true,
        enum:AcademicSemesterCode,
    },
    startMonth:{
        type:String,
        required:true,
        enum:Months,
    },
    endMonth:{
        type:String,
        required:true,
        enum:Months,
    },

},
{
    timestamps:true
})

// same same semester can not create multiple time in same year 
academicSemesterSchema.pre('save',async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    })
    if(isSemesterExists){
        throw new Error('Semester is already exists')
    }
    next();
})

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
)



// name year
// 2030 Autumn => created
// 2031 Autumn
// 2030 Autumn => XXX
// 2030 Fall => Created



// Autumn 01
// Summar 02
//Fall 03