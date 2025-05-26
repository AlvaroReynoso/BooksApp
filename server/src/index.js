import express from "express";
import { PORT } from "./config.js";
import bookRouter from "./routes/book.routes.js";
import { sequelize } from "../db.js";
import "./models/book.js";
import userRouter from "./routes/user.routes.js";

const app = express();

try {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use(express.json());
  app.listen(PORT);
  app.use(bookRouter);
  app.use(userRouter);
  console.log(`Escuchando puerto`, PORT);
  await sequelize.sync();
} catch (error) {
  console.log("Hubo un error de inicialización");
}
