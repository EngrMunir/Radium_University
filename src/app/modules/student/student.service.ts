import { StudentModel } from './student.model';
import { Student } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
};

const deleteStudentFromDB = async (id:string) =>{
  const result = await StudentModel.updateOne({id},{isDeleted:true});
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
