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

export async function getUrlById(req, res) {
  const url = (await db.query(`SELECT * FROM urls`)).rows[0].url;
  const shortUrl = (await db.query(`SELECT * FROM urls`)).rows[0].shortUrl;
  const { id } = req.params;
  if (!url) {
    return res.sendStatus(404);
  }
  res.status(200).send({
    id: id,
    shortUrl,
    url,
  });
}
