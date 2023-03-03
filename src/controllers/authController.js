import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
export async function createUser(req, res) {
  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  try {
    const userExists = await db.query(
      `SELECT (email) FROM users WHERE email = $1`,
      [email]
    );
    if (userExists.rowCount !== 0) {
      return res.sendStatus(409);
    }
    await db.query(
      `INSERT INTO users (name,email,password) VALUES ($1, $2, $3)`,
      [name, email, encryptedPassword]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
