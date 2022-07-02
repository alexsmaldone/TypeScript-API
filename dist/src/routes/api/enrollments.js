"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../../model");
const enrollment_1 = __importDefault(require("../../validator/enrollment"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// GET route that queries the database and returns an array of all enrollments
router.get("/", async (req, res) => {
    try {
        const enrollments = await model_1.Enrollment.findAll();
        return res.send(enrollments);
    }
    catch (e) {
        return res.status(500).json({ msg: "Error finding enrollments", route: '/api/enrollments' });
    }
});
// POST route that creates a new enrollment in the database
router.post("/", enrollment_1.default.checkCreateEnrollment(), (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}, async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        const student = await model_1.Student.findByPk(student_id);
        const course = await model_1.Course.findByPk(course_id);
        if (student && course) {
            console.log("THIS IS THE WORKING=================");
            // await student.addCourse(Course, {student_id, course_id});
            return res.status(201).send({ msg: "Enrollment created successfully" });
        }
        else {
            return res.status(404).json({ msg: "Error finding student or course", route: '/api/enrollments' });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: "Error creating enrollment", route: '/api/enrollments' });
    }
});
module.exports = router;
