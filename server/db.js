import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "ATTENZIONE: DATABASE_URL non configurata — lo storage non funzionerà. Vedi .env.example."
  );
}

// Neon (e la maggior parte dei Postgres gestiti in cloud) richiede SSL.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

// Crea la tabella al primo avvio, se non esiste già.
await pool.query(`
  CREATE TABLE IF NOT EXISTS storage (
    user_id TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, key)
  );
`);

// Stesso contratto di prima (window.storage / la versione SQLite): get/set/delete/list.
// user_id è sempre "local" per un'app a singolo utente; se in futuro aggiungi
// account multipli, sostituiscilo con l'id dell'utente autenticato.
export async function storageGet(userId, key) {
  const { rows } = await pool.query(
    "SELECT value FROM storage WHERE user_id = $1 AND key = $2",
    [userId, key]
  );
  return rows[0] ? { key, value: rows[0].value } : null;
}

export async function storageSet(userId, key, value) {
  await pool.query(
    `INSERT INTO storage (user_id, key, value, updated_at) VALUES ($1, $2, $3, now())
     ON CONFLICT (user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [userId, key, value]
  );
  return { key, value };
}

export async function storageDelete(userId, key) {
  await pool.query("DELETE FROM storage WHERE user_id = $1 AND key = $2", [userId, key]);
  return { key, deleted: true };
}

export async function storageList(userId, prefix = "") {
  const { rows } = await pool.query(
    "SELECT key FROM storage WHERE user_id = $1 AND key LIKE $2",
    [userId, `${prefix}%`]
  );
  return { keys: rows.map((r) => r.key) };
}

export default pool;
