import {body, param, query} from "express-validator";

class CourseValidator {
  checkCreateCourse() {
    return [body('course_name').notEmpty().withMessage('Course name is required'),]
  }
}


export default new CourseValidator();
