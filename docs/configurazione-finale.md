# Configurazione finale prima della pubblicazione

Questo è l'UNICO file da seguire per compilare tutto ciò che resta prima di
inviare l'app agli store. Ogni voce dice esattamente dove si trova nel
codice, cosa metterci, e da dove prenderlo. Nessun altro segnaposto esiste
nel progetto oltre a questi quattro.

## 1. Chiavi RevenueCat (abbonamenti)

**File**: `client/src/App.jsx`, righe 477-478

```js
const REVENUECAT_API_KEY_IOS = "REPLACE_WITH_REVENUECAT_IOS_PUBLIC_KEY";
const REVENUECAT_API_KEY_ANDROID = "REPLACE_WITH_REVENUECAT_ANDROID_PUBLIC_KEY";
```

**Da dove prenderle**: dashboard RevenueCat (app.revenuecat.com) → Project
settings → API keys. Sono chiavi **pubbliche** (non segrete), una per
piattaforma. Serve un account RevenueCat collegato ai prodotti creati in
App Store Connect e Play Console.

**Finché restano `REPLACE_WITH_`**: l'app funziona normalmente, ma gli
acquisti risultano sempre "non disponibili" — nessun crash, comportamento
già gestito (vedi riga 542, `apiKey.startsWith("REPLACE_WITH_")`).

## 2. URL Termini di Servizio e Privacy Policy

**File**: `client/src/App.jsx`, righe 490-491

```js
const TERMS_OF_SERVICE_URL = "REPLACE_WITH_TERMS_URL";
const PRIVACY_POLICY_URL = "REPLACE_WITH_PRIVACY_POLICY_URL";
```

**Da dove prenderli**: devono essere URL **pubblici e stabili**, raggiungibili
da chiunque senza login. Passi pratici:
1. Il testo della Privacy Policy è già pronto in `docs/privacy-policy.md` —
   va solo pubblicato online (es. una pagina sul tuo sito, o un servizio
   gratuito come GitHub Pages).
2. Per i Termini di Servizio, se non ne hai di tuoi, puoi usare l'EULA
   standard di Apple (si applica automaticamente se non ne alleghi uno
   proprio — cerca "Apple's Standard EULA" nella documentazione sviluppatori)
   e collegarlo comunque esplicitamente qui, come richiesto dalla Guideline
   3.1.2.
3. Incolla i due URL finali in queste due righe.

**Perché conta**: questi link sono mostrati **direttamente nella schermata
del paywall**, vicino ai pulsanti d'acquisto — Apple verifica che siano
raggiungibili durante la revisione, non solo che esistano.

## 3. Privacy Manifest iOS — passaggio in Xcode

**File già creato**: `client/ios/App/App/PrivacyInfo.xcprivacy` (nessuna
modifica di testo necessaria, è già completo e corretto).

**Cosa fare**: aprire il progetto (`client/ios/App/App.xcworkspace`) in Xcode
e verificare che il file compaia nel navigatore del progetto, dentro il
target "App". Se non compare (perché creato da fuori Xcode), trascinarlo
nella cartella del progetto con "Copy items if needed" e la checkbox del
target "App" spuntata.

**Perché conta**: senza questo file incluso nel target, App Store Connect
rifiuta automaticamente la build in fase di validazione — prima ancora
della revisione umana.

## 4. Account sviluppatore

Non c'è nulla da scrivere nel codice per questo punto — sono account che
solo tu puoi creare:
- **Apple Developer Program**: 99$/anno, richiesto per pubblicare su App Store.
- **Google Play Console**: quota di registrazione una tantum, richiesta per
  pubblicare su Google Play.

---

## Come verificare di aver finito

Dopo aver compilato i primi due punti, esegui questo comando dalla cartella
`client/` — se non stampa nulla, sei a posto:

```bash
grep -n "REPLACE_WITH_" src/App.jsx
```
