import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "matryoshka.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS storage (
    user_id TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, key)
  );
`);

const getStmt = db.prepare("SELECT value FROM storage WHERE user_id = ? AND key = ?");
const setStmt = db.prepare(`
  INSERT INTO storage (user_id, key, value, updated_at) VALUES (?, ?, ?, datetime('now'))
  ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
`);
const deleteStmt = db.prepare("DELETE FROM storage WHERE user_id = ? AND key = ?");
const listStmt = db.prepare("SELECT key FROM storage WHERE user_id = ? AND key LIKE ?");

// Stesso contratto di window.storage: get/set/delete/list.
// user_id è sempre "local" per un'app a singolo utente; se in futuro aggiungi
// account multipli, sostituiscilo con l'id dell'utente autenticato.
export function storageGet(userId, key) {
  const row = getStmt.get(userId, key);
  return row ? { key, value: row.value } : null;
}

export function storageSet(userId, key, value) {
  setStmt.run(userId, key, value);
  return { key, value };
}

export function storageDelete(userId, key) {
  deleteStmt.run(userId, key);
  return { key, deleted: true };
}

export function storageList(userId, prefix = "") {
  const rows = listStmt.all(userId, `${prefix}%`);
  return { keys: rows.map((r) => r.key) };
}

export default db;
