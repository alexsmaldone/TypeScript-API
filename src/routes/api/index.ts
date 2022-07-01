const router = require("express").Router()
const studentsRouter = require("./students")
const coursesRouter = require("./courses")
const enrollmentsRouter = require("./enrollments")


router.use("/students", studentsRouter)
router.use("/courses", coursesRouter)
router.use("/enrollments", enrollmentsRouter)

module.exports = router
