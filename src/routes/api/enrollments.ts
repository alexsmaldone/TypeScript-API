import express, {Request, Response, NextFunction} from "express";
import db from "../../config/database.config";
import { Enrollment } from "../../model";

const router = express.Router();


module.exports = router
