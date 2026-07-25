# Матрёшка — app standalone

Versione indipendente dell'app, con salvataggio reale (SQLite) e generazione IA
tramite una tua chiave API Anthropic — non dipende più dagli artifact di Claude.ai.

## Struttura

```
matryoshka-app/
  server/     backend Express + SQLite + proxy verso l'API Anthropic
  client/     frontend React (Vite) — lo stesso codice dell'artifact, adattato
```

## 1. Ottieni una chiave API Anthropic

1. Vai su https://console.anthropic.com
2. Crea un account (se non l'hai già) e vai su **API Keys**
3. Crea una chiave e copiala
4. Nota: questo è un account **separato** dal tuo abbonamento Claude.ai — l'uso dell'API si paga a consumo (in genere pochi centesimi per lezione generata; puoi impostare un tetto di spesa in console)

## 2. Configura il server

```bash
cd server
npm install
cp .env.example .env
# apri .env e incolla la tua chiave: ANTHROPIC_API_KEY=sk-ant-...
```

## 3. Avvia in sviluppo (due terminali)

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

## 4. Build per produzione

```bash
cd client
npm run build
cd ../server
npm start
```

Apri http://localhost:3001 — il server ora serve anche il frontend compilato
dalla cartella `client/dist`, tutto da un solo processo.

## 5. Pubblicarla online (accesso stabile da telefono)

Qualunque host che supporti Node.js va bene. Due opzioni semplici e con piano
gratuito/economico:

**Render.com** (consigliato per iniziare)
1. Crea un repository Git con questa cartella
2. Su Render: New → Web Service → collega il repository
3. Build command: `cd client && npm install && npm run build && cd ../server && npm install`
4. Start command: `cd server && npm start`
5. Aggiungi la variabile d'ambiente `ANTHROPIC_API_KEY` nelle impostazioni del servizio
6. Aggiungi un **Persistent Disk** (Render lo offre a pagamento minimo) montato su `server/` così il file `matryoshka.db` non si perde ad ogni deploy — altrimenti lo storage si resetta ogni volta che il servizio riparte

**Railway.app** — flusso simile, con storage persistente incluso più facilmente nel piano gratuito iniziale.

Una volta pubblicata, apri l'URL fornito dal servizio da Safari su iPhone e
aggiungila alla schermata Home per un'esperienza da app quasi nativa.

## Cosa è cambiato rispetto alla versione artifact

- `window.storage` → chiamate REST a `/api/storage/:key`, salvate in un vero
  database SQLite (`server/matryoshka.db`) — persistente per sempre, non serve
  "pubblicare" nulla su Claude.ai.
- Le chiamate a `api.anthropic.com` ora passano dal tuo server (`/api/claude`),
  che usa la tua chiave API — nessun limite artificiale di `max_tokens: 1000`,
  quindi la generazione di una lezione è tornata a essere **una sola chiamata**
  invece di due.
- Rimossa la pausa artificiale di 400ms pre-fetch (era una mitigazione per un
  bug di Safari specifico dell'ambiente artifact) — restano i ritentativi
  automatici per errori di rete o del server genuinamente transitori.
- La voce premium ElevenLabs funziona esattamente come prima (chiamata diretta
  dal browser con la tua chiave, inserita nelle impostazioni dell'app).
