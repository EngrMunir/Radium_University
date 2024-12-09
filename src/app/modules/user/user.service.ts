import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async ( password:string, studentData: TStudent) =>{
    
    // create a user object
    const user:NewUser ={};

    // if password is not given use default password
    // if(!password){
    //     user.password = config.default_password as string;
    // }else{
    //     user.password = password;
    // }

    user.password = password || (config.default_password as string);

    // set student role
    user.role = 'student'

    // set manually id
    user.id = '2030100001'

    // create a user
    const result = await User.create(user); //built in static method

    // create a student
    if( Object.keys(result).length){
      // set id _id as user
      studentData.id = result.id;
      studentData.user = result._id;
    }
  
    return result;
  }

  export const UserServices ={
    createStudentIntoDB
  }