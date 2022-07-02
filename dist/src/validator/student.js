"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class StudentValidator {
    checkCreateStudent() {
        return [(0, express_validator_1.body)('first_name').notEmpty().withMessage('First name is required'),
            (0, express_validator_1.body)('last_name').notEmpty().withMessage('Last name is required')];
    }
}
exports.default = new StudentValidator();
