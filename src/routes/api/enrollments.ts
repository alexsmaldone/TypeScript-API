import express, {Request, Response, NextFunction} from "express";
import db from "../../config/database.config";
import { Enrollment, Student, Course } from "../../model";
import EnrollmentValidator from "../../validator/enrollment";
import {validationResult} from "express-validator";

const router = express.Router();


// GET route that queries the database and returns an array of all enrollments
router.get("/",
async (req: Request,res: Response) => {
  try {
    const enrollments = await Enrollment.findAll();
    return res.send(enrollments)
  } catch (e) {
    return res.status(500).json({msg: "Error finding enrollments", route: '/api/enrollments'});
  }
}
);

// POST route that creates a new enrollment in the database
router.post("/",
EnrollmentValidator.checkCreateEnrollment(),
(req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error)
  }
  next();
},
async (req: Request,res: Response) => {
  try {
    const {student_id, course_id} = req.body;
    const student = await Student.findByPk(student_id);
    const course = await Course.findByPk(course_id);

    if (student && course) {
      console.log("YES HITTING THISSSSSSSSSSSSS")
      const enrollment = await Enrollment.create({"student_id": student_id, "course_id": course_id});
      return res.status(201).send({enrollment, msg: "Enrollment created successfully"});
    } else {
      return res.status(404).json({msg: "Error finding student or course", route: '/api/enrollments'});
    }
  } catch (e) {
    return res.status(500).json({msg: "Error creating enrollment", route: '/api/enrollments'});
  }
}
);


module.exports = router
