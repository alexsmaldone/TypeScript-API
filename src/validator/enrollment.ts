import {body, param, query} from "express-validator";

class EnrollmentValidator {
  checkCreateEnrollment() {
    return [body('student_id').notEmpty().withMessage('Student ID is required'),
    body('student_id').isInt().withMessage('Student ID must be an integer'),
    body('course_id').notEmpty().withMessage('Course ID is required'),
    body('course_id').isInt().withMessage('Course ID must be an integer'),];
  }
}


export default new EnrollmentValidator();
