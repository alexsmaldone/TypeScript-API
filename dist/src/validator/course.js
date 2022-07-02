"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CourseValidator {
    checkCreateCourse() {
        return [(0, express_validator_1.body)('course_name').notEmpty().withMessage('Course name is required'),];
    }
}
exports.default = new CourseValidator();
