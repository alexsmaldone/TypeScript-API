import express from "express";
const asyncHandler = require("express-async-handler");
const {check} = require("express-validator");
import db from "../../config/database.config";
import { Student } from "../../model";

const router = express.Router();


console.log(Student)


// GET route that queries the database and returns an array of all students
router.get("/", asyncHandler(async (req: Request,res: Response) => {
  const students = await Student.findAll();
  return res.json(students);
}
, (err: any) => { console.log(err) }
));

module.exports = router
