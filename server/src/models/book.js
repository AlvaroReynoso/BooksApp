import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Book = sequelize.define(
  "Book",
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookRating: {
      type: DataTypes.INTEGER,
    },
    bookLength: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    summary: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
