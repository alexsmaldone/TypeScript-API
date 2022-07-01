import express, {NextFunction, Request, Response} from "express";
import db from "../../config/database.config";
import { Student } from "../../model";
import StudentValidator from "../../validator/student";
const {validationResult} = require('express-validator');

const router = express.Router();


// GET route that queries the database and returns an array of all students
router.get("/",
async (req: Request,res: Response) => {
  try {
    const students = await Student.findAll();
    return res.send(students)
  } catch (e) {
    return res.status(500).json({msg: "Error finding students", route: '/api/students'});
  }
}
);

// GET route that queries the database and returns a single student
router.get("/:id", async (req: Request,res: Response) => {
  const student = await Student.findByPk(req.params.id);
  if (student) return res.send(student)
  else {
    return res.status(404).json({msg: "Error finding student", route: '/api/students/:id'});
  }
}
);

// POST route that creates a new student in the database
router.post("/",
StudentValidator.checkCreateStudent(),
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
    const student = await Student.create({ ...req.body});
    return res.status(201).send({student, msg: "Student created successfully"});
  } catch (e) {
    return res.status(500).json({msg: "Error creating student", route: '/api/students'});
  }
}
);

// PUT route that updates a student in the database
router.put("/:id",
StudentValidator.checkCreateStudent(),
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
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update({ ...req.body});
      return res.send({student, msg: "Student updated successfully"});
    } else {
      return res.status(404).json({msg: "Error finding student", route: '/api/students/:id'});
    }
  } catch (e) {
    return res.status(500).json({msg: "Error updating student", route: '/api/students/:id'});
  }
}
);

// DELETE route that deletes a student from the database
router.delete("/:id", async (req: Request,res: Response) => {

  const student = await Student.findByPk(req.params.id);
  if (student) {
    await student.destroy();
    return res.send({msg: "Student deleted successfully"});
  }
  return res.status(404).json({msg: "Error deleting student", route: '/api/students/:id'});
}
);



module.exports = router
