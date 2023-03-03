import { db } from "../database/database.connection.js";

export async function userData(req, res) {
  const token = res.locals;

  try {
    const session = await db.query(
      `SELECT users.id, users.name  
    FROM users 
    JOIN sessions 
    ON users.id = sessions."userId" 
    WHERE token = $1`,
      [token]
    );
    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }

    const urls = await db.query(
      `SELECT urls.id, urls."shortUrl", urls.url, SUM(urls."visitCount") AS "visitCount"
    FROM urls
    JOIN sessions
    ON urls."userId" = sessions."userId"
    WHERE token = $1 
    GROUP BY urls.id`,
      [token]
    );

    res.status(200).send({
      id: session.rows[0].id,
      name: session.rows[0].name,
      visitCount: urls.rows[0].visitCount,
      shortenedUrls: urls.rows,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
