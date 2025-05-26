import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../helpers/validations.js";

export const registerUser = async (req, res) => {
  const result = validateRegisterUser(req.body);
  if (result.error)
    return res.status(400).json({
      message: result.message,
    });
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Todos los campos son obligatorios",
    });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).send({
      message: "El usuario ya existe",
    });
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.json(newUser);
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);
  if (result.error)
    return res.status(400).json({
      message: result.message,
    });
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "El usuario no se encuentra",
    });
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(401).json({
      message: "Email y/o contraseña incorrecta",
    });
  }

  const secretKey = "programacion2025-apiBocha";

  const token = jwt.sign({ email }, secretKey, { expiresIn: "5h" });

  return res.json(token);
};
