"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = exports.Course = exports.Student = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class Student extends sequelize_1.Model {
}
exports.Student = Student;
class Course extends sequelize_1.Model {
}
exports.Course = Course;
class Enrollment extends sequelize_1.Model {
}
exports.Enrollment = Enrollment;
// --------------------------------------------------------------------------------
// MODELS
// --------------------------------------------------------------------------------
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "students",
});
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    course_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_config_1.default,
    tableName: "courses",
});
// Enrollment.init({
//   student_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {model: Student, key: "id"}
//   },
//   course_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {model: Course, key: "id"}
//   }
// },
//   {
//     sequelize: db,
//     tableName: "enrollments",
//   }
// )
// --------------------------------------------------------------------------------
// ASSOCIATIONS
// --------------------------------------------------------------------------------
Student.belongsToMany(Course, {
    through: 'Enrollments',
    foreignKey: 'studentId',
});
Course.belongsToMany(Student, {
    through: 'Enrollments',
    foreignKey: 'courseId',
});
