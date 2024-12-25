import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.models";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferedCourseIntoDB = async (payLoad:TOfferedCourse)=>{

    const { semesterRegistration, 
        academicFaculty, 
        academicDepartment, 
        course, 
        faculty, 
        section,
        days,
        startTime,
        endTime
    } =payLoad
    // check if the semester registration id is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND,'Semester registration not found!')
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if(!isAcademicFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND,'Academic faculty not found!')
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if(!isAcademicDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND,'Academic Department not found!')
    }

    const isCourseExists = await Course.findById(course);
    if(!isCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,'Course not found!')
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND,'Faculty not found!')
    }

    // check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id:academicDepartment,
        academicFaculty,
       
    })

    if(!isDepartmentBelongToFaculty){
        throw new AppError(
            httpStatus.NOT_FOUND,
            `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`,
        )
    }

    // check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredWithSameSection = await OfferedCourse.findOne({
        semesterRegistration, course, section
    })

    if(!isSameOfferedCourseExistsWithSameRegisteredWithSameSection){
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Offered course with same section is already exists`,
        )
    }

    // get the schedule of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days:{ $in:days}
    }).select('days startTime endTime')
    
    const newSchedule ={
        days, startTime, endTime
    }

    if(hasTimeConflict(assignedSchedules, newSchedule)){
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available at that time! Choose other time or day`,
        )
    }
    
    const result = await OfferedCourse.create({...payLoad, academicSemester});
    return result;
};

const getAllOfferedCoursesFromDB = async (query:Record<string, unknown>) =>{};

const getSingleOfferedCourseFromDB = async (id:string)=>{}

const updateOfferedCourseIntoDB = async (
    id:string,
    payLoad:Partial<TOfferedCourse>,
) =>{};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
}