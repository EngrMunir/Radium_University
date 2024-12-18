
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";



const createAcademicFaculty = catchAsync(async (req, res ) => {
 const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculty is created successfully',
    data:result,
  })
})

const getAllAcademicFaculties = catchAsync( async (req, res) =>{
  
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:'All Academic Faculties are retrieved successfully',
    data:result
  })
})
const getSingleAcademicSemester = catchAsync( async (req, res) =>{
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:'Single Academic Faculty is retrieved successfully',
    data:result
  })
})

const updateAcademicFaculty = catchAsync(async (req, res)=>{
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success: true,
    message:'Academic Faculty is retrived successfully',
    data:result
  })
})

 export const AcademicFacultyControllers ={
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicSemester,
    updateAcademicFaculty
  }