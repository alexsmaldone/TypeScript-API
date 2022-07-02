import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface StudentAttributes {
  id: number,
  first_name: string,
  last_name: string,
}

interface CourseAttributes {
  id: number,
  course_name: string,
}

interface EnrollmentAttributes {
  student_id: number,
  course_id: number,
}


export class Student extends Model<StudentAttributes> {}
export class Course extends Model<CourseAttributes> {}
export class Enrollment extends Model<EnrollmentAttributes> {}

// --------------------------------------------------------------------------------
// MODELS
// --------------------------------------------------------------------------------

Student.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize: db,
    tableName: "students",
  }
)

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    sequelize: db,
    tableName: "courses",
  }
)

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
  through: 'Enrollment',
  foreignKey: 'studentId',
})
Course.belongsToMany(Student, {
  through: 'Enrollment',
  foreignKey: 'courseId',
})
