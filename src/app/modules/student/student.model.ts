import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  StudentMethods,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { 
    // built-in validation
    type: String, 
    required: [true,'First Name is required'],
    trim: true,
    maxlength:[20,'First Name can not be more than 20 character'],
    // custom made validation
    validate: {
      validator: function(value: string){
        const firstNameStr= value.charAt(0).toUpperCase()+ value.slice(1); //Munir
        
        return firstNameStr === value;
      },
      message:'{VALUE} is not in capitalize format'
    }
  },
  middleName: {
     type: String ,
     trim:true
    },
  lastName: { 
    type: String, 
    required: [true,'Last name is required'],
    validate:{
      validator:(value: string)=> validator.isAlpha(value),
      message:'{VALUE} is not valid',
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { 
    type: String, 
    required: [true,'Father name is required'] 
  },
  fatherOccupation: { 
    type: String, 
    required: [true,'Father occupation is required'] 
  },
  fatherContactNo: { 
    type: String, 
    required: [true,'Father Contact No is required'] 
  },
  motherName: { 
    type: String, 
    required: [true, 'Mother name is required']
   },
  motherContactNo: { 
    type: String,
    required: [true,'Mother contact no is required'] 
  },
  motherOccupation: { 
    type: String, 
    required: [true,'Mother occupation is required'] 
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { 
    type: String, 
    required: true 
  },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { 
    type: String, 
    required:true, 
    unique:true 
  },
  name: {
    type:userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum:{
      values:['female', 'male', 'other'],
      message:'{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
     type: String, 
     required: true, 
     unique:true,
    //  validate:{
    //   validator:(value:string)=> validator.isEmail(value),
    //   message:'{VALUE} is not a valid email type'
    //  } 
    },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
      type: String,
      enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required:true
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum:['active', 'blocked'],
    default: 'active',
  },
});

// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id:string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// }


// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
