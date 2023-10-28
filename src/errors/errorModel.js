import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';

const Error = sequelize.define('error', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: null,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stack: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Error;
