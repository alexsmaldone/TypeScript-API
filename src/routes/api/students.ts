import express, {Request, Response} from "express";
import db from "../../config/database.config";
import { Student } from "../../model";

const router = express.Router();




// GET route that queries the database and returns an array of all students
router.get("/", async (req: Request,res: Response) => {
  try {
    const students = await Student.findAll();
    return res.send(students)
  } catch (e) {
    return res.json({msg: "Error finding students", status: 500, route: '/api/students'});
  }
}
);

// GET route that queries the database and returns a single student
router.get("/:id", async (req: Request,res: Response) => {

  const student = await Student.findByPk(req.params.id);
  if (student) return res.send(student)
  else {
    return res.json({msg: "Error finding student", status: 500, route: '/api/students/:id'});
  }
}
);

// POST route that creates a new student in the database
router.post("/", async (req: Request,res: Response) => {
  console.log(req.body);
  try {
    const student = await Student.create({ ...req.body});
    return res.send({student, msg: "Student created successfully"});
  } catch (e) {
    return res.json({msg: "Error creating student", status: 500, route: '/api/students'});
  }
}
);

// DELETE route that deletes a student from the database
router.delete("/:id", async (req: Request,res: Response) => {
  try {
    const student = await Student.destroy({ where: { id: req.params.id }});
    console.log(student)
    return res.send({msg: "Student deleted successfully"});
  } catch (e) {
    return res.json({msg: "Error deleting student", status: 500, route: '/api/students/:id'});
  }
}
);



module.exports = router
