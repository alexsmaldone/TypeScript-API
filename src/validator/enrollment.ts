import {body, param, query} from "express-validator";

class EnrollmentValidator {
  checkCreateEnrollment() {
    return [body('studentId').notEmpty().withMessage('Student ID is required'),
    body('studentId').isInt().withMessage('Student ID must be an integer'),
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('courseId').isInt().withMessage('Course ID must be an integer'),];
  }
}


export default new EnrollmentValidator();
