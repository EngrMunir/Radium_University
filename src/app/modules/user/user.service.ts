import { User } from "./user.model";

const createStudentIntoDB = async (studentData: TStudent) =>{

    // if(await Student.isUserExists(studentData.id)){
    //   throw new Error('User already exists!')
    // }
    const result = await User.create(studentData); //built in static method
  
    return result;
  }

  export const UserService ={
    createStudentIntoDB
  }