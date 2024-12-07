import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) =>{

  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); //create an instance

  // if(await student.isUserExists(studentData.id)){
  //   throw new Error('User already exists!')
  // }
  // student holo instance
  // const result = await student.save(); //built in instance method provide by mongoose

  return result;
}
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
};

const deleteStudentFromDB = async (id:string) =>{
  const result = await Student.updateOne({id},{isDeleted:true});
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
