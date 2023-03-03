import { db } from "../database/database.connection.js";

export async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const response = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    if (response.rowCount === 0) {
      return res.sendStatus(401);
    }
    res.locals = token;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
