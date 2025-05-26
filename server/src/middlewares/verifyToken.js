import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"] || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "No posee autorizacion",
    });
  }
  try {
    const payload = jwt.verify(token, "programacion2025-apiBocha");
    console.log(payload);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "No posee permisos correctos",
    });
  }
};
