# Mappa tecnica del Freemium ‚Äî –ú–∞—Ç—Ä—ë—à–∫–∞ –ú–∞—Ä–∏—Å–∞

Riferimento pronto da usare quando implementeremo lo sblocco a pagamento. Non √® ancora codice ‚Äî √® la specifica esatta, cos√¨ quando procediamo non dobbiamo improvvisare le regole mentre scriviamo.

---

## Principio generale

**Non serve una lista di "sezioni premium"** separata dal contenuto ‚Äî la regola √® quasi tutta su UNA variabile: **il livello CEFR** (`A1`/`A2`/`B1`/`B2`/`C1`/`C2`). Le sezioni "trasversali" (Carte, Sessione, Corsivo) restano codice unico, semplicemente filtrano il contenuto in base al livello sbloccato ‚Äî non serve duplicare logica.

```js
const FREE_LEVELS = ["A1", "A2"];  // unica fonte di verit√† per "cosa √® gratis per livello" ‚Äî aggiornato: A2 esteso a gratuito
function isLevelFree(levelId) {
  return FREE_LEVELS.includes(levelId);
}
```

---

## üü¢ Sempre gratis (indipendentemente dal livello)

| Vista (`view`) | Componente | Note |
|---|---|---|
| `insidie` | `InsidieItalianiView` | Contenuto fisso, non dipende dal livello |
| `placement` | Test di piazzamento | Deve restare accessibile anche senza abbonamento |
| `search` | Ricerca vocabolario | Leggero, buon gancio per il freemium |
| `difficolta` | `DifficoltaView` | **Con tetto**: max 20 elementi in coda contemporaneamente (vedi sotto) |

## üîí Filtrate per livello (gratis su A1-A2, premium su B1-C2)

Tutte le seguenti viste gi√† ricevono `level` come prop o filtrano per livello attivo ‚Äî la modifica √® aggiungere un controllo `isLevelFree(level) || premium.active` prima di mostrare il contenuto, non prima di mostrare il pulsante (il pulsante resta visibile, il contenuto oltre A2 mostra un invito a sbloccare):

| Vista (`view`) | Componente | Dati coinvolti |
|---|---|---|
| `declensions` | Casi | `DECLENSIONS[level]` |
| `verbs` | Verbi | `VERBS[level]` |
| `adjectives` | Aggettivi | `ADJECTIVES[level]` |
| `prepositions` | Preposizioni | `PREPOSITIONS[level]` |
| `pronouns`, `numerals`, `numbers-practice`, `adverbs`, `conjunctions`, `particles`, `interjections` | Le 5 parti invariabili + numeri + pronomi | `grammar-minor.js` |
| `syntax` | Analisi sintattica | `grammar-minor.js` |
| `compose` | Componi | `phrases-compose.js` |
| `phrases` | Frasi | `phrases-compose.js` |
| `dialogues` | Dialoghi | `dialogues.js` |
| `flashcards` | Carte | filtra per livello attivo |
| `session` | Sessione | filtra per livello attivo |
| `corsivo` | Scrivi in corsivo | filtra per livello attivo |
| Lezioni (dentro `activeSector === "lezioni"`) | `allLessonsFor(level)` | `lessons.js` |

## üîí Sempre premium (nessuna versione gratuita, a qualsiasi livello)

| Funzione | Dove nel codice | Perch√© |
|---|---|---|
| Generazione pacchetti con IA | Ogni pulsante "+ Nuovo pacchetto" (`onGenerate*`) | Costo reale lato server ad ogni generazione |
| Piani di studio personalizzati | `view === "programma"` | Funzionalit√† di pianificazione, valore alto |
| Le mie difficolt√† **oltre 20 elementi** | `DifficoltaView`, filtro sulla `queue` | Il tetto stesso √® la leva di conversione |

---

## Come mostrare il muro (UX, non solo logica)

Per ogni sezione filtrata per livello: **non nascondere il pulsante del livello A2-C2** ‚Äî mostralo, ma al click apri una schermata con:
- Un assaggio (es. prima voce/frase visibile, il resto sfocato o coperto)
- Un pulsante chiaro "Sblocca [livello] con l'abbonamento ‚Äî X ‚Ç¨/anno"

Questo √® meglio di nascondere del tutto i livelli superiori: fa vedere quanto contenuto c'√® oltre, il che √® il miglior argomento di vendita che l'app ha (60 lezioni, non 10).

---

## Stato dell'abbonamento nel codice (quando implementeremo il pagamento vero)

Un solo punto di verit√†, da caricare all'avvio come gi√† fatto per `premium` (voce) ‚Äî probabilmente da rinominare per evitare confusione col nome attuale:

```js
const [subscription, setSubscription] = useState({ active: false, expiresAt: null });
```

Verificato tramite RevenueCat (o il plugin scelto) al mount, con fallback "non attivo" se il controllo fallisce ‚Äî mai bloccare l'app per un errore di verifica abbonamento.

---

*Documento di riferimento, non ancora implementato. Quando deciderai di procedere con l'abbonamento vero (RevenueCat + StoreKit), questa mappa diventa la checklist delle modifiche da fare, sezione per sezione.*

