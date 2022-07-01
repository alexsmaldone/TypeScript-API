import express, {Request, Response, NextFunction} from "express";
import db from "../../config/database.config";
import { Course } from "../../model";
import CourseValidator from "../../validator/course";
const {validationResult} = require('express-validator');


const router = express.Router();

// GET route that queries the database and returns an array of all courses
router.get("/",
async (req: Request,res: Response) => {
  try {
    const courses = await Course.findAll();
    return res.send(courses)
  } catch (e) {
    return res.status(500).json({msg: "Error finding courses", route: '/api/courses'});
  }
}
);

// GET route that queries the database and returns a single course
router.get("/:id", async (req: Request,res: Response) => {
  const course = await Course.findByPk(req.params.id);
  if (course) return res.send(course)
  else {
    return res.status(404).json({msg: "Error finding course", route: '/api/courses/:id'});
  }
}
);

// POST route that creates a new course in the database
router.post("/",
CourseValidator.checkCreateCourse(),
(req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error)
  }
  next();
},
async (req: Request,res: Response) => {
  console.log(req.body);
  try {
    const course = await Course.create({ ...req.body});
    return res.status(201).send({course, msg: "Course created successfully"});
  } catch (e) {
    return res.status(500).json({msg: "Error creating course", route: '/api/courses'});
  }
}
);

// PUT route that updates a course in the database
router.put("/:id",
CourseValidator.checkCreateCourse(),
(req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error)
  }
  next();
}
,
async (req: Request,res: Response) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.update({ ...req.body});
      return res.status(200).send({course, msg: "Course updated successfully"});
    } else {
      return res.status(404).json({msg: "Error finding course", route: '/api/courses/:id'});
    }
  } catch (e) {
    return res.status(500).json({msg: "Error updating course", route: '/api/courses'});
  }
}
);

// DELETE route that deletes a course from the database
router.delete("/:id",
async (req: Request,res: Response) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      return res.status(200).send({msg: "Course deleted successfully"});
    } else {
      return res.status(404).json({msg: "Error finding course", route: '/api/courses/:id'});
    }
  } catch (e) {
    return res.status(500).json({msg: "Error deleting course", route: '/api/courses'});
  }
}
);





module.exports = router
