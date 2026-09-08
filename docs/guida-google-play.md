# Guida Google Play ‚Äî differenze e passi specifici rispetto ad Apple

Questa guida presume che tu abbia gi√† letto la guida App Store: qui copro **solo cosa cambia** per Google Play, non ripeto le parti identiche (contenuto, qualit√†, ecc.).

---

## La buona notizia: qui non serve un Mac

A differenza di Xcode, il progetto Android **si pu√≤ compilare da Linux o Windows**. Il progetto √® gi√† stato creato e configurato in questo lavoro (cartella `android/` nel progetto) ‚Äî ti manca solo l'ultimo passo pratico: scaricare Android Studio (o gli Android SDK command-line tools) sul tuo computer e lanciare la build da l√¨, dato che da questo ambiente di lavoro remoto non riesco a scaricare i tool Android (bloccati dalla rete disponibile qui, stesso tipo di limite di Xcode ma per un motivo diverso: qui manca l'accesso ai server Google, non manca un Mac).

**Cosa fare tu, in pratica:**
1. Installa [Android Studio](https://developer.android.com/studio) sul tuo computer (Windows, Mac o Linux ‚Äî qui √® pi√π flessibile di Apple)
2. Apri la cartella `android/` del progetto con Android Studio
3. Lascia che scarichi da solo Gradle e l'SDK Android (la prima volta ci vuole qualche minuto)
4. Build ‚Üí Generate Signed Bundle/APK

---

## 1. Account sviluppatore: molto pi√π economico

| | Apple | Google |
|---|---|---|
| Costo | 99 $/anno | **25 $ una tantum** (mai pi√π, per sempre) |
| Verifica identit√† | 24h-2 settimane | Di solito qualche ora, a volte giorni |

Iscriviti su [play.google.com/console/signup](https://play.google.com/console/signup).

---

## 2. Firma dell'app: un concetto che Apple non ha

Google richiede di **firmare digitalmente** ogni build con una chiave che generi tu (un "keystore"). A differenza di Apple (che gestisce i certificati per te tramite Xcode), qui la responsabilit√† √® tua:

```bash
keytool -genkey -v -keystore matryoshka-release.keystore -alias matryoshka -keyalg RSA -keysize 2048 -validity 10000
```

**Conserva questo file e la password in un posto sicuro, con un backup.** Se lo perdi, non potrai pi√π pubblicare aggiornamenti alla stessa app ‚Äî dovresti creare una scheda completamente nuova, perdendo recensioni e cronologia. Google offre anche "Play App Signing" (Google gestisce la chiave di firma finale per te, tu tieni solo una chiave di upload) ‚Äî **consigliato**, riduce il rischio di questo problema specifico.

---

## 3. Formato del pacchetto: AAB, non APK

Google richiede il formato **Android App Bundle (.aab)**, non il vecchio .apk, per le nuove pubblicazioni. Android Studio lo genera automaticamente con "Generate Signed Bundle" ‚Äî non serve fare nulla di diverso, solo sapere che √® quello il formato giusto da caricare.

---

## 4. "Data Safety" ‚Äî l'equivalente Google dell'etichetta privacy di Apple

Stesso concetto, modulo diverso. In Play Console ‚Üí **Politiche ‚Üí Sicurezza dei dati**, dichiara (stessa logica di quanto gi√† scritto per Apple):

| Categoria | Risposta per questa app |
|---|---|
| L'app raccoglie o condivide dati utente? | S√¨ (progressi salvati) |
| Tipo di dati | "Attivit√† app" (progressi, cronologia esercizi) |
| I dati sono condivisi con terzi? | No, tranne il testo inviato a ElevenLabs se l'utente attiva volontariamente la voce premium (spiegalo comunque, per trasparenza) |
| I dati sono crittografati in transito? | S√¨ (HTTPS) |
| L'utente pu√≤ richiedere la cancellazione? | S√¨, tramite l'email di contatto nella Privacy Policy |

Usa lo stesso testo della Privacy Policy gi√† scritta per Apple ‚Äî l'URL richiesto √® identico, va inserito anche qui.

---

## 5. Il rifiuto pi√π comune su Google Play: permessi "non giustificati"

Google √® molto attento se un permesso richiesto (es. `RECORD_AUDIO`) non √® chiaramente collegato a una funzione visibile nell'app. Dato che il microfono serve **solo** per il controllo di pronuncia (una funzione reale e visibile), non c'√® un problema di fondo ‚Äî ma assicurati che la richiesta del permesso avvenga **quando l'utente preme il pulsante del microfono**, non all'apertura dell'app: √® gi√† cos√¨ nel codice attuale, verificalo comunque al primo test su dispositivo reale.

---

## 6. Scheda Google Play ‚Äî testi (puoi riusare quasi tutto da Apple)

- **Titolo**: stesso di Apple, ma Google permette fino a 50 caratteri (pi√π margine di Apple)
- **Descrizione breve** (80 caratteri): "Il corso di russo pensato per chi parla italiano ‚Äî dall'A1 al C2"
- **Descrizione completa** (4000 caratteri): stessa descrizione gi√† scritta per Apple, funziona identica qui
- **Categoria**: Istruzione
- **Screenshot**: dimensioni diverse da Apple ‚Äî Google li genera automaticamente da un dispositivo/emulatore Android quando fai lo screenshot da l√¨, non serve prepararli a dimensioni fisse come su Apple

---

## 7. Revisione: pi√π veloce, ma occhio ai controlli automatici

La revisione umana di Google √® tipicamente **pi√π rapida** di Apple (spesso poche ore per un primo invio, a volte fino a un paio di giorni), ma il primo controllo √® **automatizzato**: se il target API level √® troppo basso, o mancano dichiarazioni sui permessi, viene bloccato *prima* che un umano la guardi ‚Äî √® gi√† tutto a posto in questo progetto (target API 36, permessi dichiarati), ma vale la pena saperlo.

---

## Riepilogo: cosa √® gi√† pronto, cosa manca

| Cosa | Stato |
|---|---|
| Progetto Android (Capacitor) creato e sincronizzato | ‚úÖ Fatto |
| Permessi (microfono, notifiche) dichiarati nel manifest | ‚úÖ Fatto |
| Gestione del permesso microfono nella WebView (necessaria solo su Android) | ‚úÖ Fatto |
| Icone adattive (tutte le densit√†) | ‚úÖ Fatto |
| Splash screen (chiaro/scuro, tutte le densit√†) | ‚úÖ Fatto |
| Target API level 36 (gi√† conforme al nuovo requisito 2026) | ‚úÖ Fatto |
| Compilazione vera del bundle .aab | ‚ùå Richiede Android Studio sul tuo computer |
| Keystore di firma | ‚ùå Da generare tu, con backup sicuro |
| Account Google Play Console | ‚ùå Da creare (25 $ una tantum) |
| Modulo "Sicurezza dei dati" in Play Console | ‚ùå Da compilare (guida sopra, riusa il testo della Privacy Policy) |
| Test su un dispositivo Android reale | ‚ùå Da fare |

