import express from "express";
const router = express.Router();
const apiRouter = require("./api")

router.use("/api", apiRouter)
