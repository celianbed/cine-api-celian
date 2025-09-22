import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_hLP2UcHZwt6N@ep-purple-cell-aga0vcqz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }, // requis pour Neon
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV !== "test") {
    console.log("executed query", { text, duration, rows: res.rowCount });
  }
  return res;
}
