[README.md](https://github.com/user-attachments/files/30616582/README.md)
# Матрёшка — app standalone

Versione indipendente dell'app, con salvataggio reale (database Postgres, es. Neon
gratuito) e generazione IA tramite una tua chiave API Anthropic — non dipende
più dagli artifact di Claude.ai.

## Struttura

```
matryoshka-app/
  server/     backend Express + Postgres + proxy verso l'API Anthropic
  client/     frontend React (Vite) — lo stesso codice dell'artifact, adattato
```

## 1. Crea un database Postgres gratuito su Neon

1. Vai su https://neon.tech e crea un account gratuito
2. Crea un nuovo progetto (bastano pochi secondi)
3. Nella dashboard del progetto, copia la **Connection string** — un indirizzo
   che inizia con `postgresql://...` — ti servirà tra poco
4. Il piano gratuito di Neon non ha scadenza e non si "addormenta" cancellando
   i dati, a differenza del filesystem gratuito di Render

## 2. Ottieni una chiave API Anthropic

1. Vai su https://console.anthropic.com
2. Crea un account (se non l'hai già) e vai su **API Keys**
3. Crea una chiave e copiala
4. Nota: questo è un account **separato** dal tuo abbonamento Claude.ai — l'uso dell'API si paga a consumo (in genere pochi centesimi per lezione generata; puoi impostare un tetto di spesa in console)

## 3. Configura il server

```bash
cd server
npm install
cp .env.example .env
# apri .env e incolla:
#   ANTHROPIC_API_KEY=sk-ant-...
#   DATABASE_URL=postgresql://... (quella copiata da Neon)
```

## 4. Avvia in sviluppo (due terminali)

```bash
# terminale 1
cd server
npm run dev

# terminale 2
cd client
npm run dev
```

Apri http://localhost:5173 — il frontend Vite inoltra automaticamente le
chiamate `/api/...` al server su `localhost:3001`.

## 5. Build per produzione

```bash
cd client
npm run build
cd ../server
npm start
```

Apri http://localhost:3001 — il server ora serve anche il frontend compilato
dalla cartella `client/dist`, tutto da un solo processo.

## 6. Pubblicarla online (accesso stabile da telefono)

Qualunque host che supporti Node.js va bene.

**Render.com** (consigliato per iniziare)
1. Crea un repository Git con questa cartella
2. Su Render: New → Web Service → collega il repository
3. Build command: `cd client && npm install && npm run build && cd ../server && npm install`
4. Start command: `cd server && npm start`
5. Aggiungi le variabili d'ambiente nelle impostazioni del servizio (sezione Environment):
   - `ANTHROPIC_API_KEY`
   - `DATABASE_URL` (la connection string di Neon)
6. Non serve nessun Persistent Disk: il database vive su Neon, non sul filesystem
   di Render — i dati sopravvivono a riavvii, addormentamenti e redeploy del servizio

Una volta pubblicata, apri l'URL fornito dal servizio da Safari su iPhone e
aggiungila alla schermata Home per un'esperienza da app quasi nativa.

## Cosa è cambiato rispetto alla versione artifact

- `window.storage` → chiamate REST a `/api/storage/:key`, salvate in un vero
  database Postgres esterno (Neon) — persistente per sempre, indipendente dal
  ciclo di vita del server, non serve "pubblicare" nulla su Claude.ai.
- Le chiamate a `api.anthropic.com` ora passano dal tuo server (`/api/claude`),
  che usa la tua chiave API — nessun limite artificiale di `max_tokens: 1000`,
  quindi la generazione di una lezione è tornata a essere **una sola chiamata**
  invece di due.
- Rimossa la pausa artificiale di 400ms pre-fetch (era una mitigazione per un
  bug di Safari specifico dell'ambiente artifact) — restano i ritentativi
  automatici per errori di rete o del server genuinamente transitori.
- La voce premium ElevenLabs funziona esattamente come prima (chiamata diretta
  dal browser con la tua chiave, inserita nelle impostazioni dell'app).

## Perché Neon invece di SQLite locale

La prima versione di questa app usava SQLite salvato direttamente sul disco
del server. Su Render, il piano gratuito ha un filesystem "usa e getta": ogni
volta che il servizio si riavvia (anche solo per il normale addormentamento
dopo inattività) i file locali vengono cancellati, e con loro i progressi
salvati. Neon è un database esterno indipendente dal server, quindi i dati
restano anche quando Render riavvia o riaddormenta il servizio.
