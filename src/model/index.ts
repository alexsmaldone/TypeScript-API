import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface StudentAttributes {
  id: number,
  first_name: string,
  last_name: string,
  email: string
}

class Student extends Model<StudentAttributes> {}

Student.init({
  id: {
    type: DataTypes.INTEGER,
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize: db,
    tableName: "students",
  }
)
