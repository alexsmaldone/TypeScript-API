import {body, param, query} from "express-validator";

class StudentValidator {
  checkCreateStudent() {
    return [body('first_name').notEmpty().withMessage('First name is required'),
      body('last_name').notEmpty().withMessage('Last name is required')];
  }
}


export default new StudentValidator();
