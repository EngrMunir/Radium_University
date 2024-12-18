import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req, res ) => {
     
  const { password, student: studentData } = req.body;

    // const zodData = studentValidationSchema.parse(studentData);

 const result = await UserServices.createStudentIntoDB(password, studentData);

  // send response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student created successfully',
    data:result
  })
})

 export const UserControllers ={
    createStudent,
  }