import { db } from "../database/database.connection.js";

export async function rankingStats(req, res) {
  try {
    const stats = await db.query(`SELECT users.name, users.id, 
    COUNT(urls.url) AS "linksCount", 
    SUM(urls."visitCount") AS "visitCount"
    FROM urls
    LEFT JOIN users ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10`);

    res.status(200).send(stats.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
