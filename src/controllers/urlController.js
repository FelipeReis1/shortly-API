import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const token = res.locals;
  const shortenedUrl = nanoid();
  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    await db.query(
      `INSERT INTO urls (url,"userId", "shortUrl") VALUES ($1, $2, $3)`,
      [url, session.rows[0].userId, shortenedUrl]
    );
    res.status(201).send({ id: session.rows[0].id, shortUrl: shortenedUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const urlId = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

    if (urlId.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send({
      id: urlId.rows[0].id,
      shortUrl: urlId.rows[0].shortUrl,
      url: urlId.rows[0].url,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
      shortUrl,
    ]);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }
    let visitCountAdder = url.rows[0].visitCount + 1;

    await db.query(`UPDATE urls SET "visitCount"=$1 WHERE id = $2;`, [
      visitCountAdder,
      url.rows[0].id,
    ]);

    res.redirect(url.rows[0].url);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const token = res.locals;

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    const url = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (session.rows[0].userId !== url.rows[0].userId) {
      return res.sendStatus(401);
    }
    await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
