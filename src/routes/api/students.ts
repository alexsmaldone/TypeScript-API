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


module.exports = router
