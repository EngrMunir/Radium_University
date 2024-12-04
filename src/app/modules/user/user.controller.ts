import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { password, student: studentData } = req.body;
  
      // will call service func to send this data
      const result = await UserServices.createStudentIntoDB(password,studentData);
  
      // send response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };