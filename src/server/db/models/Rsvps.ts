// // eslint-disable-next-line @typescript-eslint/no-var-requires
import { DataTypes } from "sequelize";
import { db } from "../database";
// import { Farm } from "./Farm";

const RSVP = db.define("rsvp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: User, key: "id" }
  },
    farm_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    //   references: { model: Farm, key: "id" },
    },
    event_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    //   references: { model: Events, key: "id" },
    },
});

export default RSVP;
