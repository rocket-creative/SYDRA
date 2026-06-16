// Thin Postgres helper (works against Supabase's Postgres connection string).
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requires SSL; relax cert check for the pooled connection string.
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
  max: 4,
});

export async function query(text, params) {
  return pool.query(text, params);
}

// Generic batched upsert. rows = array of objects; columns = ordered keys.
// conflictCols define the ON CONFLICT target; updateCols are set on conflict.
export async function upsert(table, columns, rows, conflictCols, updateCols, batchSize = 1000) {
  let total = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const slice = rows.slice(i, i + batchSize);
    if (slice.length === 0) continue;
    const values = [];
    const params = [];
    let p = 1;
    for (const row of slice) {
      const placeholders = columns.map(() => `$${p++}`);
      values.push(`(${placeholders.join(',')})`);
      for (const c of columns) params.push(row[c] ?? null);
    }
    const setClause = (updateCols && updateCols.length)
      ? `DO UPDATE SET ${updateCols.map((c) => `${c} = EXCLUDED.${c}`).join(', ')}`
      : 'DO NOTHING';
    const sql =
      `INSERT INTO ${table} (${columns.join(',')}) VALUES ${values.join(',')} ` +
      `ON CONFLICT (${conflictCols.join(',')}) ${setClause}`;
    const res = await query(sql, params);
    total += res.rowCount || slice.length;
  }
  return total;
}

export async function end() {
  await pool.end();
}
