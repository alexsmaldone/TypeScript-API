import express from "express";
const asyncHandler = require("express-async-handler");
const {check} = require("express-validator");
import db from "../../config/database.config";
import { Course } from "../../model";

const router = express.Router();


module.exports = router
