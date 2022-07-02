"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class EnrollmentValidator {
    checkCreateEnrollment() {
        return [(0, express_validator_1.body)('student_id').notEmpty().withMessage('Student ID is required'),
            (0, express_validator_1.body)('student_id').isInt().withMessage('Student ID must be an integer'),
            (0, express_validator_1.body)('course_id').notEmpty().withMessage('Course ID is required'),
            (0, express_validator_1.body)('course_id').isInt().withMessage('Course ID must be an integer'),];
    }
}
exports.default = new EnrollmentValidator();
