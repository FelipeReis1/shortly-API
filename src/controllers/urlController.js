import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const token = res.locals;
  const shortenedUrl = nanoid();

  const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
    token,
  ]);
  await db.query(
    `INSERT INTO urls (url,"userId", "shortUrl") VALUES ($1, $2, $3)`,
    [url, session.rows[0].userId, shortenedUrl]
  );
  res.status(201).send({ id: session.rows[0].id, shortUrl: shortenedUrl });
}
