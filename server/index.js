import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { storageGet, storageSet, storageDelete, storageList } from "./db.js";
import claudeRouter from "./claude.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// In produzione, servi il frontend dallo stesso dominio: niente CORS da configurare.
// In sviluppo (Vite su un'altra porta), permetti richieste cross-origin dal dev server.
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Utente unico locale: se un giorno aggiungi login, sostituisci "local"
// con l'id dell'utente autenticato (es. da un cookie di sessione).
const USER_ID = "local";

app.get("/api/storage/:key", async (req, res) => {
  try {
    const result = await storageGet(USER_ID, req.params.key);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Errore database: " + e.message });
  }
});

app.post("/api/storage/:key", async (req, res) => {
  const { value } = req.body || {};
  if (typeof value !== "string") {
    return res.status(400).json({ error: "Campo 'value' mancante (deve essere una stringa)." });
  }
  try {
    const result = await storageSet(USER_ID, req.params.key, value);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Errore database: " + e.message });
  }
});

app.delete("/api/storage/:key", async (req, res) => {
  try {
    const result = await storageDelete(USER_ID, req.params.key);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Errore database: " + e.message });
  }
});

app.get("/api/storage", async (req, res) => {
  try {
    const prefix = req.query.prefix || "";
    res.json(await storageList(USER_ID, prefix));
  } catch (e) {
    res.status(500).json({ error: "Errore database: " + e.message });
  }
});

app.use("/api", claudeRouter);

// Serve il frontend compilato (dopo `npm run build` nella cartella client)
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDist, "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`Matryoshka server in ascolto su http://localhost:${PORT}`);
});
// Alcune generazioni IA (specialmente lezioni complete) possono richiedere più
// tempo: estendiamo il timeout del server oltre il default di Node (2 minuti
// invece di ~poche decine di secondi) per non tagliare richieste legittime.
server.timeout = 120000;
server.headersTimeout = 125000;
