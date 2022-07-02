"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../../model");
const course_1 = __importDefault(require("../../validator/course"));
const { validationResult } = require('express-validator');
const router = express_1.default.Router();
// GET route that queries the database and returns an array of all courses
router.get("/", async (req, res) => {
    try {
        const courses = await model_1.Course.findAll();
        return res.send(courses);
    }
    catch (e) {
        return res.status(500).json({ msg: "Error finding courses", route: '/api/courses' });
    }
});
// GET route that queries the database and returns a single course
router.get("/:id", async (req, res) => {
    const course = await model_1.Course.findByPk(req.params.id);
    if (course)
        return res.send(course);
    else {
        return res.status(404).json({ msg: "Error finding course", route: '/api/courses/:id' });
    }
});
// POST route that creates a new course in the database
router.post("/", course_1.default.checkCreateCourse(), (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}, async (req, res) => {
    console.log(req.body);
    try {
        const course = await model_1.Course.create({ ...req.body });
        return res.status(201).send({ course, msg: "Course created successfully" });
    }
    catch (e) {
        return res.status(500).json({ msg: "Error creating course", route: '/api/courses' });
    }
});
// PUT route that updates a course in the database
router.put("/:id", course_1.default.checkCreateCourse(), (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}, async (req, res) => {
    try {
        const course = await model_1.Course.findByPk(req.params.id);
        if (course) {
            await course.update({ ...req.body });
            return res.status(200).send({ course, msg: "Course updated successfully" });
        }
        else {
            return res.status(404).json({ msg: "Error finding course", route: '/api/courses/:id' });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: "Error updating course", route: '/api/courses' });
    }
});
// DELETE route that deletes a course from the database
router.delete("/:id", async (req, res) => {
    try {
        const course = await model_1.Course.findByPk(req.params.id);
        if (course) {
            await course.destroy();
            return res.status(200).send({ msg: "Course deleted successfully" });
        }
        else {
            return res.status(404).json({ msg: "Error finding course", route: '/api/courses/:id' });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: "Error deleting course", route: '/api/courses' });
    }
});
module.exports = router;
