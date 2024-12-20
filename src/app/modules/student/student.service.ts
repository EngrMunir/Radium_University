import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';


const getAllStudentsFromDB = async (query:Record<string, unknown>) => {

  console.log('base query', query)
  const queryObj = { ...query } //copy

  // { email: {$regex: query.searchTerm,  $options: i}}
  // { presentAddress: {$regex: query.searchTerm,  $options: i}}
  // { 'name.firstName': {$regex: query.searchTerm,  $options: i}}

  const studentSearchableFields =['email','name.firstName','presentAddress']

  let searchTerm ='';

  if(query?.searchTerm){
    searchTerm=query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or:studentSearchableFields.map((field)=>({
      [field]:{ $regex:searchTerm, $options:'i'},
    })),
  })

// filtering
const excludeFields =['searchTerm','sort','limit']

excludeFields.forEach(el => delete queryObj[el]);

console.log(query, queryObj);

  const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty',
    },
  });

  let sort ='-createdAt'

  if(query.sort){
    sort = query.sort as string
  }
  const sortQuery = filterQuery.sort(sort);

  let limit =1;
  if(query.limit)
  {
    limit = query.limit;

  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

// update primitive and non primitive data simultaneously
const updateStudentIntoDB = async (id: string, payload:Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown>={...remainingStudentData};
  /* 
    guardian:{
    fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher
  */

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`]=value;

    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`]=value;

    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`]=value;

    }
  }

  const result = await Student.findOneAndUpdate({id}, modifiedUpdatedData, { new:true, runValidators:true })  
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id})
  .populate('admissionSemester')
  .populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty',
    },
  });;
  
  return result;
};

const deleteStudentFromDB = async (id:string) =>{

  const session = await mongoose.startSession();

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      {id},
      {isDeleted:true},
      {new:true, session }
    );

    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},{isDeleted:true},
      {new: true, session},
    )

    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent; 
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
