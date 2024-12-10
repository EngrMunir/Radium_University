import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
// import Joi from 'joi'
// import studentValidationSchema from './student.joi.validation';
import { z } from 'zod';
import studentValidationSchema from './student.validation';
import { error } from 'console';
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res) => {
  
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
})

const getSingleStudent = catchAsync(async (req, res ) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
})

const deleteStudent = catchAsync(async(req, res)=>{
    const { studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success:true,
      message:'Students is deleted successfully',
      data:result,
    })
})
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};