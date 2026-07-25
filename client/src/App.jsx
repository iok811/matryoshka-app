import React, { useState, useEffect, useCallback, useRef } from "react";
import { BookOpen, Flame, Check, X, Volume2, Mic, ChevronRight, Sparkles, Layers, Languages } from "lucide-react";

// ---------- Content ----------

const LEVELS = [
  { id: "A1", label: "Principiante", color: "#C1543C", size: 50, ready: true },
  { id: "A2", label: "Elementare", color: "#D9A441", size: 80, ready: true },
  { id: "B1", label: "Intermedio", color: "#5B84B1", size: 112, ready: true },
  { id: "B2", label: "Intermedio alto", color: "#7C8C6B", size: 146, ready: true },
  { id: "C1", label: "Avanzato", color: "#9A6B9E", size: 182, ready: true },
  { id: "C2", label: "Madrelingua", color: "#E8D9B5", size: 220, ready: true },
];

const LESSONS = {
  A1: [
    {
      id: "a1-1",
      title: "Знакомство",
      subtitle: "Conoscersi",
      story: [
        { ru: "— Привет! Меня зовут Анна.", it: "— Ciao! Mi chiamo Anna." },
        { ru: "— Привет, Анна! Я Иван. Очень приятно.", it: "— Ciao, Anna! Io sono Ivan. Piacere." },
        { ru: "— Откуда ты?", it: "— Di dove sei?" },
        { ru: "— Я из Италии. А ты?", it: "— Sono dell'Italia. E tu?" },
        { ru: "— Я из России, из Москвы.", it: "— Sono della Russia, di Mosca." },
      ],
      vocab: [
        { ru: "меня зовут", translit: "menyá zavút", it: "mi chiamo" },
        { ru: "очень приятно", translit: "óchen' priyátna", it: "molto piacere" },
        { ru: "откуда", translit: "atkúda", it: "da dove" },
        { ru: "я из", translit: "ya iz", it: "io sono da/di" },
      ],
      grammar: {
        pattern: "Меня зовут + [nome]",
        explanation_it:
          "\"Меня зовут\" è una formula fissa (letteralmente \"chiamano me\") per dire il tuo nome: non si coniuga, si impara così com'è. \"Я из\" + genitivo indica provenienza.",
        examples: ["Меня зовут Иван.", "Я из Италии.", "Я из Москвы."],
        exercise: { template: "___ зовут Анна.", options: ["Меня", "Тебя", "Она"], correct: 0, full_ru: "Меня зовут Анна.", full_it: "Mi chiamo Anna." },
      },
      quiz: {
        question: "Come si dice 'di dove sei?'",
        options: ["Как тебя зовут?", "Откуда ты?", "Как дела?"],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["Италии.", "из", "Я"],
        answer: "Я из Италии.",
        answer_it: "Vengo dall'Italia.",
      },
      translationDrills: [
        { prompt_it: "Mi chiamo Marco.", answer_ru: "Меня зовут Марко." },
        { prompt_it: "Molto piacere.", answer_ru: "Очень приятно." },
        { prompt_it: "Sono di Francoforte.", answer_ru: "Я из Франкфурта." },
      ],
      production: "Presentati in russo: nome e da dove vieni.",
    },
    {
      id: "a1-2",
      title: "Моя семья",
      subtitle: "La mia famiglia",
      story: [
        { ru: "— Это моя семья.", it: "— Questa è la mia famiglia." },
        { ru: "— Это мой папа, а это моя мама.", it: "— Questo è mio papà, e questa è mia mamma." },
        { ru: "— У меня есть брат и сестра.", it: "— Ho un fratello e una sorella." },
        { ru: "— А у тебя большая семья?", it: "— E tu, hai una famiglia numerosa?" },
      ],
      vocab: [
        { ru: "семья", translit: "sem'yá", it: "famiglia" },
        { ru: "у меня есть", translit: "u menyá yest'", it: "io ho" },
        { ru: "брат / сестра", translit: "brat / sestrá", it: "fratello / sorella" },
        { ru: "большая", translit: "bal'sháya", it: "grande, numerosa" },
      ],
      grammar: {
        pattern: "У + [genitivo] + есть + [cosa posseduta]",
        explanation_it:
          "\"У меня есть\" letteralmente è \"presso di me c'è\": il soggetto grammaticale è la cosa posseduta, non \"io\". Per questo cambia solo il pronome dopo \"у\", non il verbo.",
        examples: ["У меня есть брат.", "У неё есть сестра.", "У нас есть машина."],
        exercise: { template: "У ___ есть сестра. (io ho una sorella)", options: ["меня", "он", "мы"], correct: 0, full_ru: "У меня есть сестра.", full_it: "Ho una sorella." },
      },
      quiz: {
        question: "'У меня есть' significa...",
        options: ["Io sono", "Io ho", "Io voglio"],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["сестра.", "есть", "У", "меня"],
        answer: "У меня есть сестра.",
        answer_it: "Ho una sorella.",
      },
      translationDrills: [
        { prompt_it: "Ho un fratello.", answer_ru: "У меня есть брат." },
        { prompt_it: "Questa è mia mamma.", answer_ru: "Это моя мама." },
        { prompt_it: "Hai una famiglia numerosa?", answer_ru: "У тебя большая семья?" },
      ],
      production: "Descrivi la tua famiglia in due frasi in russo.",
    },
    {
      id: "a1-3",
      title: "Мой день",
      subtitle: "La mia giornata",
      story: [
        { ru: "— Что ты делаешь утром?", it: "— Cosa fai la mattina?" },
        { ru: "— Утром я встаю в семь часов.", it: "— La mattina mi alzo alle sette." },
        { ru: "— А потом?", it: "— E poi?" },
        { ru: "— Потом я завтракаю и иду на работу.", it: "— Poi faccio colazione e vado al lavoro." },
      ],
      vocab: [
        { ru: "утром", translit: "utram", it: "la mattina" },
        { ru: "встаю", translit: "vstayu", it: "mi alzo" },
        { ru: "завтракаю", translit: "zavtrakayu", it: "faccio colazione" },
        { ru: "потом", translit: "patom", it: "poi, dopo" },
      ],
      grammar: {
        pattern: "Presente dei verbi in -ать (prima coniugazione)",
        explanation_it: "I verbi regolari in -ать (встава́ть, за́втракать) alla prima persona singolare prendono la desinenza -ю se il tema termina in vocale, altrimenti -у. La forma \"я встаю\" viene da вставать con caduta di -ва-.",
        examples: ["Я встаю рано.","Я завтракаю дома.","Я работаю в офисе."],
        exercise: { template: "Утром я ___ в семь часов. (mi alzo)", options: ["встаю","встаёшь","встаёт"], correct: 0, full_ru: "Утром я встаю в семь часов.", full_it: "La mattina mi alzo alle sette." },
      },
      quiz: { question: "Cosa fa la persona 'потом' (dopo)?", options: ["Lavora subito","Fa colazione e va al lavoro","Dorme ancora"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["на","работу.","иду","Я"], answer: "Я иду на работу.", answer_it: "Vado al lavoro." },
      translationDrills: [
        { prompt_it: "Mi alzo alle sette.", answer_ru: "Я встаю в семь часов." },
        { prompt_it: "Faccio colazione a casa.", answer_ru: "Я завтракаю дома." },
        { prompt_it: "Vado a scuola.", answer_ru: "Я иду в школу." },
      ],
      production: "Descrivi la tua mattina in russo, usando almeno due verbi al presente.",
    },
    {
      id: "a1-4",
      title: "В магазине",
      subtitle: "Al negozio",
      story: [
        { ru: "— Здравствуйте! Сколько стоит это яблоко?", it: "— Buongiorno! Quanto costa questa mela?" },
        { ru: "— Это яблоко стоит тридцать рублей.", it: "— Questa mela costa trenta rubli." },
        { ru: "— А хлеб?", it: "— E il pane?" },
        { ru: "— Хлеб стоит пятьдесят рублей.", it: "— Il pane costa cinquanta rubli." },
      ],
      vocab: [
        { ru: "магазин", translit: "magazin", it: "negozio" },
        { ru: "сколько стоит", translit: "skolka stoit", it: "quanto costa" },
        { ru: "рубль", translit: "rubl'", it: "rublo" },
        { ru: "дёшево / дорого", translit: "dyosheva / doraga", it: "economico / caro" },
      ],
      grammar: {
        pattern: "Numeri e prezzi: сколько стоит + nominativo",
        explanation_it: "\"Сколько стоит\" (quanto costa) regge il nominativo del soggetto (l'oggetto di cui si chiede il prezzo). I numeri da 20 in su si costruiscono componendo le decine (два́дцать, три́дцать...) con le unità.",
        examples: ["Сколько стоит хлеб?","Это стоит тридцать рублей.","Это дорого!"],
        exercise: { template: "___ стоит это яблоко? (quanto costa)", options: ["Сколько","Как","Где"], correct: 0, full_ru: "Сколько стоит это яблоко?", full_it: "Quanto costa questa mela?" },
      },
      quiz: { question: "Quanto costa il pane nel dialogo?", options: ["Trenta rubli","Cinquanta rubli","Venti rubli"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["рублей.","тридцать","стоит","Это"], answer: "Это стоит тридцать рублей.", answer_it: "Questo costa trenta rubli." },
      translationDrills: [
        { prompt_it: "Quanto costa il latte?", answer_ru: "Сколько стоит молоко?" },
        { prompt_it: "È troppo caro.", answer_ru: "Это слишком дорого." },
        { prompt_it: "Ho venti rubli.", answer_ru: "У меня двадцать рублей." },
      ],
      production: "Immagina di essere al negozio: scrivi un breve dialogo per chiedere il prezzo di due prodotti.",
    },
    {
      id: "a1-5",
      title: "Времена года",
      subtitle: "Le stagioni",
      story: [
        { ru: "— Какое время года тебе нравится?", it: "— Quale stagione ti piace?" },
        { ru: "— Мне нравится лето. Летом тепло.", it: "— Mi piace l'estate. D'estate fa caldo." },
        { ru: "— А зимой холодно?", it: "— E d'inverno fa freddo?" },
        { ru: "— Да, зимой очень холодно и идёт снег.", it: "— Sì, d'inverno fa molto freddo e nevica." },
      ],
      vocab: [
        { ru: "весна / лето", translit: "vesna / leta", it: "primavera / estate" },
        { ru: "осень / зима", translit: "osen' / zima", it: "autunno / inverno" },
        { ru: "тепло / холодно", translit: "teplo / kholadna", it: "fa caldo / fa freddo" },
        { ru: "идёт снег", translit: "idyot sneg", it: "nevica" },
      ],
      grammar: {
        pattern: "Стрementale temporale: летом, зимой (in estate, in inverno)",
        explanation_it: "Per dire 'in [stagione]' il russo usa lo strumentale senza preposizione: ле́то→ле́том, зима́→зимо́й, весна́→весно́й, о́сень→о́сенью. È una costruzione fissa da imparare a memoria.",
        examples: ["Летом тепло.","Зимой холодно.","Осенью идёт дождь."],
        exercise: { template: "___ идёт снег. (in inverno)", options: ["Зимой","Зима","Зиму"], correct: 0, full_ru: "Зимой идёт снег.", full_it: "In inverno nevica." },
      },
      quiz: { question: "Che tempo fa d'estate secondo il dialogo?", options: ["Fa freddo","Fa caldo","Nevica"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["холодно.","очень","Зимой"], answer: "Зимой очень холодно.", answer_it: "D'inverno fa molto freddo." },
      translationDrills: [
        { prompt_it: "Mi piace la primavera.", answer_ru: "Мне нравится весна." },
        { prompt_it: "In autunno piove spesso.", answer_ru: "Осенью часто идёт дождь." },
        { prompt_it: "D'estate vado al mare.", answer_ru: "Летом я езжу на море." },
      ],
      production: "Racconta in russo qual è la tua stagione preferita e perché.",
    },
    {
      id: "a1-6",
      title: "Мой дом",
      subtitle: "La mia casa",
      story: [
        { ru: "— Это твой дом?", it: "— Questa è casa tua?" },
        { ru: "— Да, это мой дом. У нас три комнаты.", it: "— Sì, questa è casa mia. Abbiamo tre stanze." },
        { ru: "— А кухня большая?", it: "— E la cucina è grande?" },
        { ru: "— Нет, кухня маленькая, но уютная.", it: "— No, la cucina è piccola, ma accogliente." },
      ],
      vocab: [
        { ru: "дом / кварти́ра", translit: "dom / kvartira", it: "casa / appartamento" },
        { ru: "комната", translit: "komnata", it: "stanza" },
        { ru: "кухня", translit: "kukhnya", it: "cucina" },
        { ru: "большой / маленький", translit: "bal'shoy / malen'kiy", it: "grande / piccolo" },
      ],
      grammar: {
        pattern: "Aggettivi concordati: большая/маленькая (femminile)",
        explanation_it: "Gli aggettivi in russo concordano in genere con il sostantivo: кухня è femminile, quindi 'большая кухня' (grande) e 'маленькая кухня' (piccola), con desinenza -ая.",
        examples: ["Большая комната.","Маленькая кухня.","Уютный дом."],
        exercise: { template: "Кухня ___, но уютная. (piccola)", options: ["маленькая","маленький","маленькое"], correct: 0, full_ru: "Кухня маленькая, но уютная.", full_it: "La cucina è piccola, ma accogliente." },
      },
      quiz: { question: "Quante stanze ci sono in casa, secondo il dialogo?", options: ["Due","Tre","Quattro"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["комнаты.","три","нас","У"], answer: "У нас три комнаты.", answer_it: "Abbiamo tre stanze." },
      translationDrills: [
        { prompt_it: "La mia casa è grande.", answer_ru: "Мой дом большой." },
        { prompt_it: "La camera è piccola.", answer_ru: "Комната маленькая." },
        { prompt_it: "Il salotto è accogliente.", answer_ru: "Гостиная уютная." },
      ],
      production: "Descrivi la tua casa in russo: quante stanze ha e come sono.",
    },
    {
      id: "a1-7",
      title: "Любимые занятия",
      subtitle: "Le attività preferite",
      story: [
        { ru: "— Что ты любишь делать?", it: "— Cosa ti piace fare?" },
        { ru: "— Я люблю читать и слушать музыку.", it: "— Mi piace leggere e ascoltare musica." },
        { ru: "— А спорт?", it: "— E lo sport?" },
        { ru: "— Иногда я играю в футбол.", it: "— A volte gioco a calcio." },
      ],
      vocab: [
        { ru: "любить", translit: "lyubit'", it: "amare, piacere" },
        { ru: "читать", translit: "chitat'", it: "leggere" },
        { ru: "слушать музыку", translit: "slushat' muzyku", it: "ascoltare musica" },
        { ru: "иногда", translit: "inagda", it: "a volte" },
      ],
      grammar: {
        pattern: "Любить + infinito",
        explanation_it: "Il verbo 'любить' (amare/piacere) può reggere direttamente un infinito per esprimere un'attività che piace fare: 'я люблю читать' = mi piace leggere.",
        examples: ["Я люблю читать.","Он любит гулять.","Мы любим готовить."],
        exercise: { template: "Я ___ читать и слушать музыку. (mi piace)", options: ["люблю","любишь","любит"], correct: 0, full_ru: "Я люблю читать и слушать музыку.", full_it: "Mi piace leggere e ascoltare musica." },
      },
      quiz: { question: "Cosa fa 'иногда' (a volte) la persona nel dialogo?", options: ["Legge","Gioca a calcio","Ascolta musica"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["футбол.","играю","в","Я"], answer: "Я играю в футбол.", answer_it: "Gioco a calcio." },
      translationDrills: [
        { prompt_it: "Mi piace cucinare.", answer_ru: "Я люблю готовить." },
        { prompt_it: "Ascolto musica ogni giorno.", answer_ru: "Я слушаю музыку каждый день." },
        { prompt_it: "A volte leggo un libro.", answer_ru: "Иногда я читаю книгу." },
      ],
      production: "Scrivi in russo tre cose che ti piace fare nel tempo libero.",
    },
    {
      id: "a1-8",
      title: "Который час?",
      subtitle: "Che ora è?",
      story: [
        { ru: "— Извините, который час?", it: "— Scusi, che ore sono?" },
        { ru: "— Сейчас три часа.", it: "— Sono le tre." },
        { ru: "— А когда открывается магазин?", it: "— E quando apre il negozio?" },
        { ru: "— Магазин открывается в девять часов утра.", it: "— Il negozio apre alle nove di mattina." },
      ],
      vocab: [
        { ru: "который час", translit: "katory chas", it: "che ore sono" },
        { ru: "сейчас", translit: "seychas", it: "adesso" },
        { ru: "открывается", translit: "atkryvayetsya", it: "apre (si apre)" },
        { ru: "час / часы", translit: "chas / chasy", it: "ora / orologio, ore" },
      ],
      grammar: {
        pattern: "L'ora: в + accusativo per l'orario",
        explanation_it: "Per dire 'alle [ora]' si usa 'в' + accusativo: 'в три часа' (alle tre), 'в девять часов' (alle nove). Con numeri da 2 a 4 il sostantivo 'час' va al genitivo singolare (часа), da 5 in su al genitivo plurale (часов).",
        examples: ["Сейчас два часа.","В пять часов вечера.","В девять часов утра."],
        exercise: { template: "Магазин открывается ___ девять часов. (alle)", options: ["в","на","к"], correct: 0, full_ru: "Магазин открывается в девять часов.", full_it: "Il negozio apre alle nove." },
      },
      quiz: { question: "A che ora apre il negozio nel dialogo?", options: ["Alle tre","Alle nove di mattina","Alle nove di sera"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["часа.","три","Сейчас"], answer: "Сейчас три часа.", answer_it: "Sono le tre." },
      translationDrills: [
        { prompt_it: "Che ore sono?", answer_ru: "Который час?" },
        { prompt_it: "Sono le cinque.", answer_ru: "Сейчас пять часов." },
        { prompt_it: "Il negozio chiude alle otto.", answer_ru: "Магазин закрывается в восемь часов." },
      ],
      production: "Scrivi in russo un breve dialogo in cui chiedi e dici l'ora.",
    },
    {
      id: "a1-9",
      title: "В школе",
      subtitle: "A scuola",
      story: [
        { ru: "— Какой у тебя любимый предмет?", it: "— Qual è la tua materia preferita?" },
        { ru: "— Мой любимый предмет — математика.", it: "— La mia materia preferita è la matematica." },
        { ru: "— А русский язык тебе нравится?", it: "— E il russo ti piace?" },
        { ru: "— Да, но это трудно.", it: "— Sì, ma è difficile." },
      ],
      vocab: [
        { ru: "предмет", translit: "predmet", it: "materia (scolastica)" },
        { ru: "математика", translit: "matematika", it: "matematica" },
        { ru: "трудно / легко", translit: "trudna / lekhko", it: "difficile / facile" },
        { ru: "урок", translit: "urok", it: "lezione" },
      ],
      grammar: {
        pattern: "Aggettivo predicativo neutro: трудно, легко",
        explanation_it: "Aggettivi come 'трудно' (difficile) e 'легко' (facile) alla forma neutra breve si usano come predicati impersonali riferiti a un'azione o situazione generale, senza bisogno di soggetto esplicito.",
        examples: ["Это трудно.","Русский язык — это интересно.","Математика легко даётся мне."],
        exercise: { template: "Русский язык нравится, но это ___. (difficile)", options: ["трудно","трудный","трудная"], correct: 0, full_ru: "Русский язык нравится, но это трудно.", full_it: "Il russo piace, ma è difficile." },
      },
      quiz: { question: "Qual è la materia preferita nel dialogo?", options: ["Il russo","La matematica","L'inglese"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["трудно.","это","Да,"], answer: "Да, это трудно.", answer_it: "Sì, è difficile." },
      translationDrills: [
        { prompt_it: "La matematica è facile per me.", answer_ru: "Математика легко даётся мне." },
        { prompt_it: "Ho una lezione oggi.", answer_ru: "У меня сегодня урок." },
        { prompt_it: "Questa materia è interessante.", answer_ru: "Этот предмет интересный." },
      ],
      production: "Scrivi in russo qual è la tua materia preferita e perché.",
    },
    {
      id: "a1-10",
      title: "Мои друзья",
      subtitle: "I miei amici",
      story: [
        { ru: "— Расскажи о своём друге.", it: "— Parlami del tuo amico." },
        { ru: "— Моего друга зовут Антон. Он весёлый и добрый.", it: "— Il mio amico si chiama Anton. È allegro e gentile." },
        { ru: "— Сколько ему лет?", it: "— Quanti anni ha?" },
        { ru: "— Ему двадцать пять лет.", it: "— Ha venticinque anni." },
      ],
      vocab: [
        { ru: "друг / подруга", translit: "drug / padruga", it: "amico / amica" },
        { ru: "весёлый / добрый", translit: "vesyoly / dobry", it: "allegro / gentile" },
        { ru: "сколько лет", translit: "skolka let", it: "quanti anni" },
        { ru: "зовут", translit: "zavut", it: "si chiama (lett. chiamano)" },
      ],
      grammar: {
        pattern: "Età con дательный: Ему двадцать пять лет",
        explanation_it: "Per dire l'età si usa il dativo della persona + numero + 'лет/год/года': 'ему двадцать пять лет' (letteralmente 'a lui venticinque anni'). Дательный (dativo) è обязателен, non nominativo.",
        examples: ["Мне двадцать лет.","Ей десять лет.","Сколько тебе лет?"],
        exercise: { template: "___ двадцать пять лет. (lui ha)", options: ["Ему","Он","Его"], correct: 0, full_ru: "Ему двадцать пять лет.", full_it: "Lui ha venticinque anni." },
      },
      quiz: { question: "Come si chiama l'amico nel dialogo?", options: ["Иван","Антон","Дмитрий"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["добрый.","и","весёлый","Он"], answer: "Он весёлый и добрый.", answer_it: "È allegro e gentile." },
      translationDrills: [
        { prompt_it: "Il mio amico è simpatico.", answer_ru: "Мой друг симпатичный." },
        { prompt_it: "Quanti anni hai?", answer_ru: "Сколько тебе лет?" },
        { prompt_it: "Ha venti anni.", answer_ru: "Ему двадцать лет." },
      ],
      production: "Descrivi in russo un tuo amico: nome, età e due aggettivi che lo descrivono.",
    },
  ],
  A2: [
    {
      id: "a2-1",
      title: "В кафе",
      subtitle: "Al bar",
      story: [
        { ru: "— Что вы будете заказывать?", it: "— Cosa desidera ordinare?" },
        { ru: "— Один кофе с молоком, пожалуйста.", it: "— Un caffè con latte, per favore." },
        { ru: "— А вам что-нибудь ещё?", it: "— E a lei, qualcos'altro?" },
        { ru: "— Нет, спасибо, это всё.", it: "— No grazie, è tutto." },
      ],
      vocab: [
        { ru: "заказывать", translit: "zakázyvat'", it: "ordinare" },
        { ru: "пожалуйста", translit: "pazhálusta", it: "per favore" },
        { ru: "что-нибудь", translit: "shto-nibud'", it: "qualcosa" },
        { ru: "это всё", translit: "éta vsyo", it: "è tutto" },
      ],
      grammar: {
        pattern: "с + [strumentale] per dire 'con qualcosa'",
        explanation_it:
          "Con \"с\" (con) il sostantivo va allo strumentale: молоко → с молоком. L'imperativo di cortesia si forma spesso con \"Дайте\" + accusativo.",
        examples: ["кофе с молоком", "чай с сахаром", "Дайте, пожалуйста, счёт."],
        exercise: { template: "Кофе ___ молоком.", options: ["с", "в", "на"], correct: 0, full_ru: "Кофе с молоком.", full_it: "Caffè con latte." },
      },
      quiz: {
        question: "Come chiedi 'un caffè con latte, per favore'?",
        options: [
          "Один кофе с молоком, пожалуйста.",
          "Один чай без сахара.",
          "Дайте мне меню.",
        ],
        correct: 0,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["пожалуйста.", "с", "молоком,", "кофе", "Один"],
        answer: "Один кофе с молоком, пожалуйста.",
        answer_it: "Un caffè con latte, per favore.",
      },
      translationDrills: [
        { prompt_it: "Un tè con zucchero.", answer_ru: "Чай с сахаром." },
        { prompt_it: "Il conto, per favore.", answer_ru: "Счёт, пожалуйста." },
        { prompt_it: "Vorrei qualcos'altro.", answer_ru: "Я хочу что-нибудь ещё." },
      ],
      production: "Ordina al bar: un tè e un croissant, in russo.",
    },
    {
      id: "a2-2",
      title: "Погода",
      subtitle: "Il meteo",
      story: [
        { ru: "— Какая сегодня погода?", it: "— Che tempo fa oggi?" },
        { ru: "— На улице холодно и идёт дождь.", it: "— Fuori fa freddo e piove." },
        { ru: "— А завтра будет солнце?", it: "— E domani ci sarà il sole?" },
        { ru: "— Да, говорят, будет тепло.", it: "— Sì, dicono che farà caldo." },
      ],
      vocab: [
        { ru: "погода", translit: "pagóda", it: "tempo/meteo" },
        { ru: "холодно / тепло", translit: "khólodna / tepló", it: "fa freddo / fa caldo" },
        { ru: "идёт дождь", translit: "idyot dozhd'", it: "piove" },
        { ru: "говорят, что", translit: "gavaryát shto", it: "si dice che" },
      ],
      grammar: {
        pattern: "Costruzioni impersonali: [aggettivo neutro] senza soggetto",
        explanation_it:
          "Per il meteo il russo non usa un soggetto: l'aggettivo va alla forma neutra breve (холодно = fa freddo). Oppure si usa \"идёт\" + sostantivo (идёт дождь = piove, letteralmente 'va la pioggia').",
        examples: ["Сегодня холодно.", "Идёт снег.", "Завтра будет тепло."],
        exercise: { template: "Сегодня ___ . (fa freddo)", options: ["холодно", "холодный", "холодная"], correct: 0, full_ru: "Сегодня холодно.", full_it: "Oggi fa freddo." },
      },
      quiz: {
        question: "'Идёт дождь' significa...",
        options: ["C'è il sole", "Piove", "Nevica"],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["тепло.", "будет", "Завтра"],
        answer: "Завтра будет тепло.",
        answer_it: "Domani farà caldo.",
      },
      translationDrills: [
        { prompt_it: "Oggi fa freddo.", answer_ru: "Сегодня холодно." },
        { prompt_it: "Nevica.", answer_ru: "Идёт снег." },
        { prompt_it: "Che tempo farà domani?", answer_ru: "Какая завтра будет погода?" },
      ],
      production: "Descrivi il tempo di oggi a Francoforte, in russo.",
    },
    {
      id: "a2-3",
      title: "На вокзале",
      subtitle: "Alla stazione",
      story: [
        { ru: "— Один билет до Москвы, пожалуйста.", it: "— Un biglietto per Mosca, per favore." },
        { ru: "— Туда и обратно или в одну сторону?", it: "— Andata e ritorno o solo andata?" },
        { ru: "— Туда и обратно.", it: "— Andata e ritorno." },
        { ru: "— Поезд отправляется через двадцать минут, платформа третья.", it: "— Il treno parte tra venti minuti, binario tre." },
      ],
      vocab: [
        { ru: "билет", translit: "bilet", it: "biglietto" },
        { ru: "туда и обратно", translit: "tuda i abratna", it: "andata e ritorno" },
        { ru: "отправляется", translit: "atpravlyaetsya", it: "parte" },
        { ru: "платформа", translit: "platforma", it: "binario" },
      ],
      grammar: {
        pattern: "Через + accusativo per il tempo futuro ('tra...')",
        explanation_it: "'Через' + accusativo indica quanto tempo manca a un evento futuro: 'через двадцать минут' (tra venti minuti), 'через час' (tra un'ora). È diverso da 'после' (dopo un evento passato).",
        examples: ["Поезд отправляется через час.","Через неделю у меня отпуск.","Я вернусь через два дня."],
        exercise: { template: "Поезд отправляется ___ двадцать минут. (tra)", options: ["через","после","за"], correct: 0, full_ru: "Поезд отправляется через двадцать минут.", full_it: "Il treno parte tra venti minuti." },
      },
      quiz: { question: "Da quale binario parte il treno?", options: ["Dal primo","Dal secondo","Dal terzo"], correct: 2 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["Москвы,","билет","до","Один","пожалуйста."], answer: "Один билет до Москвы, пожалуйста.", answer_it: "Un biglietto per Mosca, per favore." },
      translationDrills: [
        { prompt_it: "Il treno parte tra un'ora.", answer_ru: "Поезд отправляется через час." },
        { prompt_it: "Un biglietto di sola andata.", answer_ru: "Билет в одну сторону." },
        { prompt_it: "Da quale binario?", answer_ru: "С какой платформы?" },
      ],
      production: "Scrivi in russo un breve dialogo per comprare un biglietto del treno.",
    },
    {
      id: "a2-4",
      title: "Мой рабочий день",
      subtitle: "La mia giornata lavorativa",
      story: [
        { ru: "— Как прошёл твой рабочий день?", it: "— Com'è andata la tua giornata di lavoro?" },
        { ru: "— Хорошо. Утром я написал два письма и позвонил клиенту.", it: "— Bene. Stamattina ho scritto due lettere e ho chiamato un cliente." },
        { ru: "— А после обеда?", it: "— E dopo pranzo?" },
        { ru: "— После обеда у меня была встреча с коллегами.", it: "— Dopo pranzo ho avuto una riunione con i colleghi." },
      ],
      vocab: [
        { ru: "рабочий день", translit: "rabochiy den'", it: "giornata lavorativa" },
        { ru: "написал / позвонил", translit: "napisal / pazvanil", it: "ho scritto / ho chiamato" },
        { ru: "встреча", translit: "vstrecha", it: "riunione, incontro" },
        { ru: "коллега", translit: "kalyega", it: "collega" },
      ],
      grammar: {
        pattern: "Passato perfettivo per azioni completate",
        explanation_it: "Per raccontare azioni concluse nel passato si usa il perfettivo: написа́л (ho scritto, azione finita) invece di писа́л (scrivevo, processo). Il perfettivo risponde alla domanda 'cosa ho fatto/completato?'.",
        examples: ["Я написал письмо.","Он позвонил другу.","Мы закончили проект."],
        exercise: { template: "Утром я ___ два письма. (ho scritto)", options: ["написал","пишу","писал"], correct: 0, full_ru: "Утром я написал два письма.", full_it: "Stamattina ho scritto due lettere." },
      },
      quiz: { question: "Cosa è successo dopo pranzo?", options: ["Una telefonata","Una riunione con i colleghi","Ha scritto lettere"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["клиенту.","позвонил","Я"], answer: "Я позвонил клиенту.", answer_it: "Ho chiamato il cliente." },
      translationDrills: [
        { prompt_it: "Ho scritto un'email.", answer_ru: "Я написал письмо." },
        { prompt_it: "Ho avuto una riunione.", answer_ru: "У меня была встреча." },
        { prompt_it: "Ho chiamato un collega.", answer_ru: "Я позвонил коллеге." },
      ],
      production: "Racconta in russo la tua giornata lavorativa di ieri, usando il passato perfettivo.",
    },
    {
      id: "a2-5",
      title: "В аптеке",
      subtitle: "In farmacia",
      story: [
        { ru: "— У меня болит горло. Что вы посоветуете?", it: "— Mi fa male la gola. Cosa mi consiglia?" },
        { ru: "— Возьмите эти таблетки, три раза в день после еды.", it: "— Prenda queste pastiglie, tre volte al giorno dopo i pasti." },
        { ru: "— А от температуры есть что-нибудь?", it: "— C'è qualcosa per la febbre?" },
        { ru: "— Да, вот сироп. Он помогает быстро.", it: "— Sì, ecco lo sciroppo. Aiuta velocemente." },
      ],
      vocab: [
        { ru: "боле́ть", translit: "balet'", it: "far male, essere malato" },
        { ru: "табле́тка", translit: "tabletka", it: "pastiglia" },
        { ru: "температу́ра", translit: "temperatura", it: "febbre, temperatura" },
        { ru: "сиро́п", translit: "sirop", it: "sciroppo" },
      ],
      grammar: {
        pattern: "Imperativo di cortesia: возьмите (prenda)",
        explanation_it: "L'imperativo formale/plurale si forma di solito con -ите: взять→возьми́те (prenda/prendete). Si usa per consigli o istruzioni rivolti a una persona con il 'lei' o a più persone.",
        examples: ["Возьмите таблетки.","Позвоните завтра.","Приходите вовремя."],
        exercise: { template: "___ эти таблетки три раза в день. (prenda)", options: ["Возьмите","Взять","Берёте"], correct: 0, full_ru: "Возьмите эти таблетки три раза в день.", full_it: "Prenda queste pastiglie tre volte al giorno." },
      },
      quiz: { question: "Cosa consiglia il farmacista per la febbre?", options: ["Pastiglie","Sciroppo","Niente"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["горло.","болит","меня","У"], answer: "У меня болит горло.", answer_it: "Mi fa male la gola." },
      translationDrills: [
        { prompt_it: "Ho la febbre.", answer_ru: "У меня температура." },
        { prompt_it: "Prenda questo sciroppo.", answer_ru: "Возьмите этот сироп." },
        { prompt_it: "Tre volte al giorno.", answer_ru: "Три раза в день." },
      ],
      production: "Scrivi in russo un dialogo in farmacia: spiega un sintomo e chiedi un consiglio.",
    },
    {
      id: "a2-6",
      title: "Свободное время",
      subtitle: "Il tempo libero",
      story: [
        { ru: "— Что ты делал в субботу?", it: "— Cosa hai fatto sabato?" },
        { ru: "— Я гулял в парке и катался на велосипеде.", it: "— Ho passeggiato nel parco e sono andato in bicicletta." },
        { ru: "— А вечером?", it: "— E la sera?" },
        { ru: "— Вечером я смотрел фильм с друзьями.", it: "— La sera ho guardato un film con gli amici." },
      ],
      vocab: [
        { ru: "гуля́ть", translit: "gulyat'", it: "passeggiare" },
        { ru: "ката́ться на велосипе́де", translit: "katatsya na velasipede", it: "andare in bicicletta" },
        { ru: "вечером", translit: "vecheram", it: "la sera" },
        { ru: "фильм", translit: "fil'm", it: "film" },
      ],
      grammar: {
        pattern: "Passato imperfettivo per attività ripetute/di durata",
        explanation_it: "L'imperfettivo al passato (гуля́л, ката́лся, смотре́л) descrive un'attività che è durata nel tempo o è stata semplicemente svolta, senza enfasi sul completamento: perfetto per raccontare come si è passato il tempo libero.",
        examples: ["Я гулял весь день.","Мы катались на велосипеде.","Он смотрел телевизор."],
        exercise: { template: "Вечером я ___ фильм. (guardavo)", options: ["смотрел","посмотрел","смотрю"], correct: 0, full_ru: "Вечером я смотрел фильм.", full_it: "La sera guardavo un film." },
      },
      quiz: { question: "Cosa ha fatto la persona di sabato mattina?", options: ["Ha guardato un film","Ha passeggiato e fatto bici","Ha lavorato"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["парке.","в","гулял","Я"], answer: "Я гулял в парке.", answer_it: "Ho passeggiato nel parco." },
      translationDrills: [
        { prompt_it: "Ho guardato un film ieri sera.", answer_ru: "Вчера вечером я смотрел фильм." },
        { prompt_it: "Vado in bicicletta ogni weekend.", answer_ru: "Я катаюсь на велосипеде каждые выходные." },
        { prompt_it: "Cosa hai fatto sabato?", answer_ru: "Что ты делал в субботу?" },
      ],
      production: "Racconta in russo come hai passato il tuo ultimo weekend.",
    },
    {
      id: "a2-7",
      title: "У врача",
      subtitle: "Dal medico",
      story: [
        { ru: "— На что вы жалуетесь?", it: "— Di cosa si lamenta? (Qual è il disturbo?)" },
        { ru: "— У меня болит живот и небольшая температура.", it: "— Mi fa male la pancia e ho un po' di febbre." },
        { ru: "— Когда это началось?", it: "— Quando è iniziato?" },
        { ru: "— Вчера вечером.", it: "— Ieri sera." },
      ],
      vocab: [
        { ru: "жа́ловаться", translit: "zhalavat'sya", it: "lamentarsi" },
        { ru: "живо́т", translit: "zhivot", it: "pancia" },
        { ru: "небольшо́й", translit: "nebal'shoy", it: "piccolo, leggero" },
        { ru: "начало́сь", translit: "nachalos'", it: "è iniziato/a" },
      ],
      grammar: {
        pattern: "На что вы жалуетесь? (formula fissa medica)",
        explanation_it: "'Жаловаться на' + accusativo è la formula standard per esprimere un disturbo: 'жаловаться на живот' (lamentarsi per la pancia/avere mal di pancia). È l'espressione tipica che sentirai da un medico russo.",
        examples: ["Я жалуюсь на головную боль.","Он жалуется на усталость.","На что вы жалуетесь?"],
        exercise: { template: "У меня болит живот и небольшая ___. (febbre)", options: ["температура","температуру","температуре"], correct: 0, full_ru: "У меня болит живот и небольшая температура.", full_it: "Mi fa male la pancia e ho un po' di febbre." },
      },
      quiz: { question: "Quando sono iniziati i sintomi?", options: ["Stamattina","Ieri sera","La settimana scorsa"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["жалуетесь?","что","На"], answer: "На что вы жалуетесь?", answer_it: "Di cosa si lamenta?" },
      translationDrills: [
        { prompt_it: "Ho mal di pancia.", answer_ru: "У меня болит живот." },
        { prompt_it: "È iniziato ieri.", answer_ru: "Это началось вчера." },
        { prompt_it: "Ho un po' di febbre.", answer_ru: "У меня небольшая температура." },
      ],
      production: "Scrivi in russo un breve dialogo dal medico, descrivendo un sintomo.",
    },
    {
      id: "a2-8",
      title: "Общественный транспорт",
      subtitle: "I mezzi pubblici",
      story: [
        { ru: "— Этот автобус едет до центра?", it: "— Questo autobus va in centro?" },
        { ru: "— Нет, вам нужен автобус номер семь.", it: "— No, le serve l'autobus numero sette." },
        { ru: "— А где остановка?", it: "— E dov'è la fermata?" },
        { ru: "— Остановка справа, за светофором.", it: "— La fermata è a destra, dopo il semaforo." },
      ],
      vocab: [
        { ru: "авто́бус", translit: "avtobus", it: "autobus" },
        { ru: "остано́вка", translit: "astanovka", it: "fermata" },
        { ru: "све́тофор", translit: "svetafor", it: "semaforo" },
        { ru: "спра́ва / сле́ва", translit: "sprava / sleva", it: "a destra / a sinistra" },
      ],
      grammar: {
        pattern: "Вам нужен + nominativo (costruzione impersonale con dativo)",
        explanation_it: "'Вам нужен автобус' (le serve l'autobus) usa il dativo della persona (вам) + 'нужен/нужна/нужно' concordato in genere con il sostantivo che segue (нужен con maschile, нужна con femminile, нужно con neutro).",
        examples: ["Вам нужен автобус номер семь.","Мне нужна остановка.","Ему нужно такси."],
        exercise: { template: "Вам ___ автобус номер семь. (serve)", options: ["нужен","нужна","нужно"], correct: 0, full_ru: "Вам нужен автобус номер семь.", full_it: "Le serve l'autobus numero sette." },
      },
      quiz: { question: "Dove si trova la fermata?", options: ["A sinistra","A destra, dopo il semaforo","Dritto avanti"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["центра?","до","едет","автобус","Этот"], answer: "Этот автобус едет до центра?", answer_it: "Questo autobus va in centro?" },
      translationDrills: [
        { prompt_it: "Mi serve l'autobus numero cinque.", answer_ru: "Мне нужен автобус номер пять." },
        { prompt_it: "La fermata è a sinistra.", answer_ru: "Остановка слева." },
        { prompt_it: "Dov'è il semaforo?", answer_ru: "Где светофор?" },
      ],
      production: "Scrivi in russo un dialogo in cui chiedi indicazioni per prendere l'autobus giusto.",
    },
    {
      id: "a2-9",
      title: "Мой город",
      subtitle: "La mia città",
      story: [
        { ru: "— Ты живёшь в большом городе?", it: "— Vivi in una grande città?" },
        { ru: "— Да, но мой родной город меньше и тише.", it: "— Sì, ma la mia città natale è più piccola e più tranquilla." },
        { ru: "— Что тебе нравится в твоём городе?", it: "— Cosa ti piace della tua città?" },
        { ru: "— Мне нравится старый центр и парк у реки.", it: "— Mi piace il centro storico e il parco vicino al fiume." },
      ],
      vocab: [
        { ru: "родно́й го́род", translit: "radnoy gorad", it: "città natale" },
        { ru: "ме́ньше / ти́ше", translit: "men'she / tishe", it: "più piccolo / più tranquillo" },
        { ru: "центр", translit: "tsentr", it: "centro" },
        { ru: "река́", translit: "reka", it: "fiume" },
      ],
      grammar: {
        pattern: "Comparativo semplice: меньше, тише (senza чем)",
        explanation_it: "Alcuni comparativi irregolari come ме́ньше (più piccolo, da ма́ленький) e ти́ше (più tranquillo, da ти́хий) si usano da soli o con 'чем' + nominativo per il paragone: 'меньше, чем Москва' (più piccola di Mosca).",
        examples: ["Мой город меньше.","Здесь тише, чем в Москве.","Этот парк больше."],
        exercise: { template: "Мой родной город ___ и тише. (più piccolo)", options: ["меньше","маленький","мало"], correct: 0, full_ru: "Мой родной город меньше и тише.", full_it: "La mia città natale è più piccola e più tranquilla." },
      },
      quiz: { question: "Cosa piace della città nel dialogo?", options: ["Il traffico","Il centro storico e il parco","I grattacieli"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["реки.","у","парк","и","центр","старый"], answer: "Старый центр и парк у реки.", answer_it: "Il centro storico e il parco vicino al fiume." },
      translationDrills: [
        { prompt_it: "La mia città è tranquilla.", answer_ru: "Мой город тихий." },
        { prompt_it: "Questo fiume è grande.", answer_ru: "Эта река большая." },
        { prompt_it: "Vivo vicino al centro.", answer_ru: "Я живу возле центра." },
      ],
      production: "Descrivi in russo la tua città: cosa ti piace e come si confronta con una città più grande.",
    },
    {
      id: "a2-10",
      title: "Праздники",
      subtitle: "Le feste",
      story: [
        { ru: "— Какой твой любимый праздник?", it: "— Qual è la tua festa preferita?" },
        { ru: "— Мой любимый праздник — Новый год.", it: "— La mia festa preferita è il Capodanno." },
        { ru: "— Как вы его празднуете?", it: "— Come lo festeggiate?" },
        { ru: "— Мы украшаем ёлку и дарим подарки.", it: "— Decoriamo l'albero e ci scambiamo i regali." },
      ],
      vocab: [
        { ru: "пра́здник", translit: "prazdnik", it: "festa, ricorrenza" },
        { ru: "пра́здновать", translit: "prazdnavat'", it: "festeggiare" },
        { ru: "украша́ть ёлку", translit: "ukrashat' yolku", it: "decorare l'albero (di Natale/Capodanno)" },
        { ru: "дари́ть пода́рки", translit: "darit' padarki", it: "fare/scambiarsi regali" },
      ],
      grammar: {
        pattern: "Verbi riflessivi vs non riflessivi: дарить (senza -ся)",
        explanation_it: "'Дарить' (fare un regalo a qualcuno) è già transitivo e non riflessivo: 'мы дарим подарки' (facciamo regali). Da non confondere con verbi simili in -ся come 'общаться' (comunicare tra di sé).",
        examples: ["Мы дарим подарки.","Я дарю тебе книгу.","Они празднуют вместе."],
        exercise: { template: "Мы украшаем ёлку и ___ подарки. (regaliamo)", options: ["дарим","даримся","дарить"], correct: 0, full_ru: "Мы украшаем ёлку и дарим подарки.", full_it: "Decoriamo l'albero e ci scambiamo i regali." },
      },
      quiz: { question: "Qual è la festa preferita nel dialogo?", options: ["Il compleanno","Il Capodanno","Pasqua"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["ёлку.","украшаем","Мы"], answer: "Мы украшаем ёлку.", answer_it: "Decoriamo l'albero." },
      translationDrills: [
        { prompt_it: "Qual è la tua festa preferita?", answer_ru: "Какой твой любимый праздник?" },
        { prompt_it: "Ci scambiamo regali.", answer_ru: "Мы дарим подарки друг другу." },
        { prompt_it: "Festeggiamo insieme.", answer_ru: "Мы празднуем вместе." },
      ],
      production: "Racconta in russo come festeggi la tua festa preferita.",
    },
  ],
  B1: [
    {
      id: "b1-1",
      title: "Планы на выходные",
      subtitle: "Piani per il weekend",
      story: [
        { ru: "— Какие у тебя планы на выходные?", it: "— Che programmi hai per il weekend?" },
        { ru: "— Ещё не знаю точно. Может быть, съезжу к друзьям.", it: "— Non lo so ancora di preciso. Forse andrò dagli amici." },
        { ru: "— А если будет дождь?", it: "— E se piove?" },
        { ru: "— Тогда просто останусь дома и отдохну.", it: "— Allora resterò semplicemente a casa e mi riposerò." },
      ],
      vocab: [
        { ru: "выходные", translit: "vykhadnýye", it: "il weekend" },
        { ru: "точно", translit: "tóchna", it: "di preciso" },
        { ru: "может быть", translit: "mózhet byt'", it: "forse" },
        { ru: "остаться дома", translit: "astát'sya dóma", it: "restare a casa" },
      ],
      grammar: {
        pattern: "Futuro perfettivo + может быть / если + futuro (condizione reale)",
        explanation_it:
          "Il futuro perfettivo (съезжу, останусь) descrive un'azione singola e completa. \"Может быть\" introduce un'ipotesi generica; \"если\" + futuro esprime una condizione reale e possibile.",
        examples: ["Может быть, я съезжу к друзьям.", "Если будет дождь, я останусь дома.", "Я отдохну в субботу."],
        exercise: { template: "___, я пойду гулять. (forse)", options: ["Может быть", "Если бы", "Потому что"], correct: 0, full_ru: "Может быть, я пойду гулять.", full_it: "Forse andrò a fare una passeggiata." },
      },
      quiz: {
        question: "'Может быть, съезжу к друзьям' significa...",
        options: [
          "Sicuramente andrò dagli amici",
          "Forse andrò dagli amici",
          "Non andrò mai dagli amici",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["дома.", "останусь", "Я", "просто"],
        answer: "Я просто останусь дома.",
        answer_it: "Resterò semplicemente a casa.",
      },
      translationDrills: [
        { prompt_it: "Che programmi hai per oggi?", answer_ru: "Какие у тебя планы на сегодня?" },
        { prompt_it: "Forse pioverà.", answer_ru: "Может быть, будет дождь." },
        { prompt_it: "Mi riposerò sabato.", answer_ru: "Я отдохну в субботу." },
      ],
      production: "Racconta in russo cosa farai (forse) questo weekend.",
    },
    {
      id: "b1-2",
      title: "Работа мечты",
      subtitle: "Il lavoro dei sogni",
      story: [
        { ru: "— Тебе нравится твоя работа?", it: "— Ti piace il tuo lavoro?" },
        { ru: "— В целом да, но иногда не хватает времени на себя.", it: "— In generale sì, ma a volte manca tempo per me stesso." },
        { ru: "— Если бы у тебя был выбор, что бы ты изменил?", it: "— Se avessi una scelta, cosa cambieresti?" },
        { ru: "— Наверное, я бы работал из дома чаще.", it: "— Probabilmente lavorerei da casa più spesso." },
      ],
      vocab: [
        { ru: "в целом", translit: "v tsélam", it: "in generale" },
        { ru: "не хватает", translit: "ne khvatáyet", it: "manca" },
        { ru: "если бы", translit: "yésli by", it: "se (ipotetico)" },
        { ru: "наверное", translit: "navérnaye", it: "probabilmente" },
      ],
      grammar: {
        pattern: "Если бы + passato ... + бы + passato (condizionale irreale)",
        explanation_it:
          "Il russo non ha un vero tempo condizionale: l'ipotesi irreale si forma sempre con il verbo al passato + la particella \"бы\", sia nella condizione che nella conseguenza.",
        examples: [
          "Если бы у меня было время, я бы отдохнул.",
          "Я бы работал из дома чаще.",
          "Что бы ты изменил?",
        ],
        exercise: {
          template: "Если бы у меня ___ время, я бы отдохнул. (avessi)",
          options: ["было", "есть", "будет"],
          correct: 0,
          full_ru: "Если бы у меня было время, я бы отдохнул.",
          full_it: "Se avessi tempo, mi riposerei.",
        },
      },
      quiz: {
        question: "'Если бы у тебя был выбор' è una frase...",
        options: ["Al presente", "Ipotetica/condizionale", "Al passato"],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["чаще.", "из", "дома", "работал", "бы", "Я"],
        answer: "Я бы работал из дома чаще.",
        answer_it: "Lavorerei da casa più spesso.",
      },
      translationDrills: [
        { prompt_it: "Ti piace il tuo lavoro?", answer_ru: "Тебе нравится твоя работа?" },
        { prompt_it: "Cosa cambieresti?", answer_ru: "Что бы ты изменил?" },
        { prompt_it: "Mi manca il tempo.", answer_ru: "Мне не хватает времени." },
      ],
      production: "Rispondi in russo: cosa cambieresti del tuo lavoro, se potessi?",
    },
    {
      id: "b1-3",
      title: "Поиск квартиры",
      subtitle: "La ricerca di un appartamento",
      story: [
        { ru: "— Я ищу квартиру недалеко от центра.", it: "— Sto cercando un appartamento vicino al centro." },
        { ru: "— Какой у вас бюджет?", it: "— Qual è il suo budget?" },
        { ru: "— Не больше семисот евро в месяц.", it: "— Non più di settecento euro al mese." },
        { ru: "— Тогда посмотрите это объявление, оно может подойти.", it: "— Allora guardi questo annuncio, potrebbe andare bene." },
      ],
      vocab: [
        { ru: "иска́ть", translit: "iskat'", it: "cercare" },
        { ru: "бюдже́т", translit: "byudzhet", it: "budget" },
        { ru: "не бо́льше", translit: "ne bol'she", it: "non più di" },
        { ru: "объявле́ние", translit: "ab\"yavlenie", it: "annuncio" },
      ],
      grammar: {
        pattern: "Не больше + genitivo (limite superiore)",
        explanation_it: "'Не больше' (non più di) regge il genitivo del numero+sostantivo: 'не больше семисот евро' (non più di settecento euro). È il modo standard per esprimere un tetto massimo in russo.",
        examples: ["Не больше ста рублей.","Не больше двух часов.","Не больше пяти минут."],
        exercise: { template: "Не ___ семисот евро в месяц. (più di)", options: ["больше","больший","более"], correct: 0, full_ru: "Не больше семисот евро в месяц.", full_it: "Non più di settecento euro al mese." },
      },
      quiz: { question: "Qual è il budget massimo menzionato?", options: ["500 euro","700 euro","900 euro"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["центра.","от","недалеко","квартиру","ищу","Я"], answer: "Я ищу квартиру недалеко от центра.", answer_it: "Sto cercando un appartamento vicino al centro." },
      translationDrills: [
        { prompt_it: "Sto cercando lavoro.", answer_ru: "Я ищу работу." },
        { prompt_it: "Qual è il tuo budget?", answer_ru: "Какой у тебя бюджет?" },
        { prompt_it: "Non più di un'ora.", answer_ru: "Не больше часа." },
      ],
      production: "Scrivi in russo un annuncio per cercare un appartamento, specificando budget e zona.",
    },
    {
      id: "b1-4",
      title: "Спор с коллегой",
      subtitle: "Un disaccordo con un collega",
      story: [
        { ru: "— Мне кажется, этот план не сработает.", it: "— Mi sembra che questo piano non funzionerà." },
        { ru: "— Почему ты так думаешь?", it: "— Perché la pensi così?" },
        { ru: "— Потому что у нас мало времени и ресурсов.", it: "— Perché abbiamo poco tempo e poche risorse." },
        { ru: "— Хорошо, давай обсудим альтернативы.", it: "— Va bene, discutiamo delle alternative." },
      ],
      vocab: [
        { ru: "план", translit: "plan", it: "piano" },
        { ru: "сработать", translit: "srabotat'", it: "funzionare, riuscire" },
        { ru: "ресу́рсы", translit: "resursy", it: "risorse" },
        { ru: "обсуди́ть", translit: "absudit'", it: "discutere" },
      ],
      grammar: {
        pattern: "Потому что vs почему (perché causale vs interrogativo)",
        explanation_it: "'Почему' introduce una domanda ('perché?'), mentre 'потому что' introduce la risposta/causa ('perché, poiché'). Sono due parole distinte, spesso confuse dai principianti perché entrambe si traducono 'perché' in italiano.",
        examples: ["Почему ты опоздал?","Я опоздал, потому что было много машин.","Потому что я устал."],
        exercise: { template: "___ у нас мало времени. (perché, poiché)", options: ["Потому что","Почему","Зачем"], correct: 0, full_ru: "Потому что у нас мало времени.", full_it: "Perché abbiamo poco tempo." },
      },
      quiz: { question: "Perché il collega pensa che il piano non funzionerà?", options: ["Costa troppo","Poco tempo e risorse","Non gli piace"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["альтернативы.","обсудим","давай","Хорошо,"], answer: "Хорошо, давай обсудим альтернативы.", answer_it: "Va bene, discutiamo delle alternative." },
      translationDrills: [
        { prompt_it: "Perché non funziona?", answer_ru: "Почему это не работает?" },
        { prompt_it: "Perché non ho tempo.", answer_ru: "Потому что у меня нет времени." },
        { prompt_it: "Discutiamo il piano.", answer_ru: "Давай обсудим план." },
      ],
      production: "Scrivi in russo un breve disaccordo con un collega e la sua motivazione (потому что).",
    },
    {
      id: "b1-5",
      title: "На собеседовании",
      subtitle: "Al colloquio di lavoro",
      story: [
        { ru: "— Расскажите о своём опыте работы.", it: "— Mi parli della sua esperienza lavorativa." },
        { ru: "— Я работал в этой сфере три года.", it: "— Ho lavorato in questo settore per tre anni." },
        { ru: "— Какие у вас сильные стороны?", it: "— Quali sono i suoi punti di forza?" },
        { ru: "— Я организованный и быстро учусь новому.", it: "— Sono organizzato e imparo velocemente cose nuove." },
      ],
      vocab: [
        { ru: "о́пыт рабо́ты", translit: "opyt raboty", it: "esperienza lavorativa" },
        { ru: "сфе́ра", translit: "sfera", it: "settore, ambito" },
        { ru: "си́льные сто́роны", translit: "sil'nye starony", it: "punti di forza" },
        { ru: "организо́ванный", translit: "arganizovanny", it: "organizzato" },
      ],
      grammar: {
        pattern: "Durata con 'за + accusativo' vs semplice accusativo",
        explanation_it: "Per dire 'per tre anni' (durata semplice, senza preposizione) si usa l'accusativo da solo: 'три года' regge il tempo trascorso. Non confondere con 'за три года' (nell'arco di tre anni, con risultato).",
        examples: ["Я работал там три года.","Она училась пять лет.","Мы жили здесь два месяца."],
        exercise: { template: "Я работал в этой сфере ___ года. (per tre)", options: ["три","трёх","третий"], correct: 0, full_ru: "Я работал в этой сфере три года.", full_it: "Ho lavorato in questo settore per tre anni." },
      },
      quiz: { question: "Quali sono i punti di forza del candidato?", options: ["Puntualità e pazienza","Organizzazione e apprendimento veloce","Creatività"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["новому.","учусь","быстро","и","организованный","Я"], answer: "Я организованный и быстро учусь новому.", answer_it: "Sono organizzato e imparo velocemente cose nuove." },
      translationDrills: [
        { prompt_it: "Ho lavorato lì per due anni.", answer_ru: "Я работал там два года." },
        { prompt_it: "Qual è la sua esperienza?", answer_ru: "Какой у вас опыт?" },
        { prompt_it: "Imparo velocemente.", answer_ru: "Я быстро учусь." },
      ],
      production: "Scrivi in russo come risponderesti alla domanda 'Расскажите о своём опыте работы'.",
    },
    {
      id: "b1-6",
      title: "Экологичный образ жизни",
      subtitle: "Uno stile di vita ecologico",
      story: [
        { ru: "— Ты стараешься жить экологично?", it: "— Cerchi di vivere in modo ecologico?" },
        { ru: "— Да, я сортирую мусор и меньше пользуюсь машиной.", it: "— Sì, riciclo e uso meno la macchina." },
        { ru: "— А что насчёт покупок?", it: "— E per quanto riguarda gli acquisti?" },
        { ru: "— Я стараюсь покупать меньше пластика.", it: "— Cerco di comprare meno plastica." },
      ],
      vocab: [
        { ru: "стара́ться", translit: "staratsya", it: "cercare di, impegnarsi a" },
        { ru: "сортирова́ть му́сор", translit: "sartiravat' musar", it: "differenziare i rifiuti" },
        { ru: "по́льзоваться", translit: "pol'zavatsya", it: "usare, servirsi di" },
        { ru: "пла́стик", translit: "plastik", it: "plastica" },
      ],
      grammar: {
        pattern: "Стараться + infinito imperfettivo",
        explanation_it: "'Стараться' (cercare di, impegnarsi) regge un infinito, tipicamente imperfettivo perché descrive uno sforzo continuo: 'стараюсь покупать меньше' (cerco di comprare meno), non 'купить' (comprare, un'unica volta).",
        examples: ["Я стараюсь помогать.","Он старается не опаздывать.","Мы стараемся экономить."],
        exercise: { template: "Я стараюсь ___ меньше пластика. (comprare)", options: ["покупать","купить","покупаю"], correct: 0, full_ru: "Я стараюсь покупать меньше пластика.", full_it: "Cerco di comprare meno plastica." },
      },
      quiz: { question: "Cosa fa la persona per l'ambiente, oltre a differenziare i rifiuti?", options: ["Usa meno la macchina","Ricicla la carta","Non compra nulla"], correct: 0 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["мусор.","сортирую","я","Да,"], answer: "Да, я сортирую мусор.", answer_it: "Sì, differenzio i rifiuti." },
      translationDrills: [
        { prompt_it: "Cerco di vivere in modo ecologico.", answer_ru: "Я стараюсь жить экологично." },
        { prompt_it: "Uso meno plastica.", answer_ru: "Я пользуюсь меньше пластиком." },
        { prompt_it: "Differenziamo i rifiuti a casa.", answer_ru: "Мы сортируем мусор дома." },
      ],
      production: "Scrivi in russo tre cose che fai (o vorresti fare) per uno stile di vita più ecologico.",
    },
    {
      id: "b1-7",
      title: "Изучение языков",
      subtitle: "Lo studio delle lingue",
      story: [
        { ru: "— Сколько языков ты знаешь?", it: "— Quante lingue conosci?" },
        { ru: "— Я говорю на трёх языках: итальянском, английском и немного по-русски.", it: "— Parlo tre lingue: italiano, inglese e un po' di russo." },
        { ru: "— Как ты учишь русский?", it: "— Come studi il russo?" },
        { ru: "— Я занимаюсь каждый день и стараюсь смотреть фильмы на русском.", it: "— Studio ogni giorno e cerco di guardare film in russo." },
      ],
      vocab: [
        { ru: "язы́к", translit: "yazyk", it: "lingua" },
        { ru: "говори́ть на + prepositivo", translit: "gavarit' na", it: "parlare in (una lingua)" },
        { ru: "занима́ться", translit: "zanimatsya", it: "esercitarsi, dedicarsi" },
        { ru: "немно́го", translit: "nemnoga", it: "un po'" },
      ],
      grammar: {
        pattern: "Говорить на + prepositivo per le lingue",
        explanation_it: "Per dire 'parlo in [lingua]' il russo usa 'говорить на' + prepositivo: 'говорю на русском' (parlo in russo). È diverso da 'говорить по-русски' (parlare russo), entrambe corrette ma con costruzioni diverse.",
        examples: ["Я говорю на английском.","Она говорит на трёх языках.","Мы говорим на разных языках."],
        exercise: { template: "Я говорю ___ трёх языках. (in)", options: ["на","в","по"], correct: 0, full_ru: "Я говорю на трёх языках.", full_it: "Parlo tre lingue." },
      },
      quiz: { question: "Cosa fa la persona per migliorare il russo?", options: ["Legge libri","Studia ogni giorno e guarda film","Va in Russia"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["языках?","языков","ты","Сколько","знаешь?"], answer: "Сколько языков ты знаешь?", answer_it: "Quante lingue conosci?" },
      translationDrills: [
        { prompt_it: "Parlo due lingue.", answer_ru: "Я говорю на двух языках." },
        { prompt_it: "Studio russo ogni giorno.", answer_ru: "Я занимаюсь русским каждый день." },
        { prompt_it: "Guardo film in russo.", answer_ru: "Я смотрю фильмы на русском." },
      ],
      production: "Racconta in russo quante lingue parli e come le hai imparate.",
    },
    {
      id: "b1-8",
      title: "Планы на будущее",
      subtitle: "Progetti per il futuro",
      story: [
        { ru: "— Кем ты хочешь стать через десять лет?", it: "— Cosa vuoi diventare tra dieci anni?" },
        { ru: "— Я хочу открыть свой бизнес.", it: "— Voglio aprire una mia attività." },
        { ru: "— А где ты хочешь жить?", it: "— E dove vuoi vivere?" },
        { ru: "— Наверное, в другой стране, может быть в России.", it: "— Probabilmente in un altro paese, magari in Russia." },
      ],
      vocab: [
        { ru: "стать", translit: "stat'", it: "diventare" },
        { ru: "откры́ть би́знес", translit: "otkryt' biznes", it: "aprire un'attività" },
        { ru: "наве́рное", translit: "navernoe", it: "probabilmente" },
        { ru: "друга́я страна́", translit: "drugaya strana", it: "un altro paese" },
      ],
      grammar: {
        pattern: "Кем + infinito (diventare qualcosa)",
        explanation_it: "Il verbo 'стать' (diventare) regge lo strumentale della professione/ruolo: 'кем ты хочешь стать?' (chi/cosa vuoi diventare?) usa 'кем', forma strumentale di 'кто'. Risposta tipica: 'стать врачом' (diventare medico).",
        examples: ["Я хочу стать врачом.","Кем ты хочешь стать?","Она хочет стать учителем."],
        exercise: { template: "___ ты хочешь стать через десять лет? (chi/cosa)", options: ["Кем","Кто","Кого"], correct: 0, full_ru: "Кем ты хочешь стать через десять лет?", full_it: "Cosa vuoi diventare tra dieci anni?" },
      },
      quiz: { question: "Dove vorrebbe vivere la persona, secondo il dialogo?", options: ["Nel suo paese","In un altro paese, forse in Russia","Non lo sa"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["бизнес.","свой","открыть","хочу","Я"], answer: "Я хочу открыть свой бизнес.", answer_it: "Voglio aprire una mia attività." },
      translationDrills: [
        { prompt_it: "Voglio diventare medico.", answer_ru: "Я хочу стать врачом." },
        { prompt_it: "Tra dieci anni.", answer_ru: "Через десять лет." },
        { prompt_it: "Forse vivrò in un altro paese.", answer_ru: "Может быть, я буду жить в другой стране." },
      ],
      production: "Racconta in russo i tuoi progetti per il futuro: dove vuoi vivere e cosa vuoi fare.",
    },
    {
      id: "b1-9",
      title: "Конфликт с соседями",
      subtitle: "Un conflitto con i vicini",
      story: [
        { ru: "— Соседи опять шумят по ночам.", it: "— I vicini fanno di nuovo rumore di notte." },
        { ru: "— Ты уже говорил с ними об этом?", it: "— Hai già parlato con loro di questo?" },
        { ru: "— Да, но ничего не изменилось.", it: "— Sì, ma non è cambiato niente." },
        { ru: "— Тогда напиши жалобу в управляющую компанию.", it: "— Allora scrivi un reclamo all'amministratore condominiale." },
      ],
      vocab: [
        { ru: "сосе́ди", translit: "sasedi", it: "vicini di casa" },
        { ru: "шуме́ть", translit: "shumet'", it: "fare rumore" },
        { ru: "измени́ться", translit: "izmenitsya", it: "cambiare" },
        { ru: "жа́лоба", translit: "zhalaba", it: "reclamo" },
      ],
      grammar: {
        pattern: "Ничего не + verbo negativo (doppia negazione)",
        explanation_it: "In russo la doppia negazione è obbligatoria e corretta: 'ничего не изменилось' (letteralmente 'niente non è cambiato' = non è cambiato niente). A differenza dell'italiano formale, qui non è un errore.",
        examples: ["Ничего не случилось.","Никто не пришёл.","Я ничего не сказал."],
        exercise: { template: "Ничего не ___. (è cambiato)", options: ["изменилось","изменилась","изменился"], correct: 0, full_ru: "Ничего не изменилось.", full_it: "Non è cambiato niente." },
      },
      quiz: { question: "Cosa consiglia l'ultima battuta del dialogo?", options: ["Chiamare la polizia","Scrivere un reclamo all'amministratore","Traslocare"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["ночам.","по","шумят","опять","Соседи"], answer: "Соседи опять шумят по ночам.", answer_it: "I vicini fanno di nuovo rumore di notte." },
      translationDrills: [
        { prompt_it: "Non è cambiato niente.", answer_ru: "Ничего не изменилось." },
        { prompt_it: "I vicini fanno rumore.", answer_ru: "Соседи шумят." },
        { prompt_it: "Scriverò un reclamo.", answer_ru: "Я напишу жалобу." },
      ],
      production: "Scrivi in russo un breve reclamo sul rumore dei vicini.",
    },
    {
      id: "b1-10",
      title: "Кулинарные традиции",
      subtitle: "Le tradizioni culinarie",
      story: [
        { ru: "— Какое твоё любимое русское блюдо?", it: "— Qual è il tuo piatto russo preferito?" },
        { ru: "— Мне очень нравятся пельмени.", it: "— Mi piacciono molto i pel'meni." },
        { ru: "— Ты умеешь их готовить?", it: "— Sai cucinarli?" },
        { ru: "— Ещё нет, но моя бабушка обещала научить меня.", it: "— Non ancora, ma mia nonna ha promesso di insegnarmi." },
      ],
      vocab: [
        { ru: "блю́до", translit: "blyuda", it: "piatto (di cibo)" },
        { ru: "пельме́ни", translit: "pel'meni", it: "pelmeni (ravioli russi)" },
        { ru: "уме́ть", translit: "umet'", it: "saper fare (una capacità)" },
        { ru: "научи́ть", translit: "nauchit'", it: "insegnare (perfettivo)" },
      ],
      grammar: {
        pattern: "Уметь vs знать: la capacità appresa",
        explanation_it: "'Уметь' + infinito indica una capacità/abilità appresa ('so fare qualcosa', es. cucinare, nuotare), diverso da 'знать' (sapere un'informazione). 'Я умею готовить' = so cucinare; 'я знаю рецепт' = conosco la ricetta.",
        examples: ["Я умею готовить.","Она умеет плавать.","Ты умеешь водить машину?"],
        exercise: { template: "Ты ___ их готовить? (sai)", options: ["умеешь","знаешь","можешь"], correct: 0, full_ru: "Ты умеешь их готовить?", full_it: "Sai cucinarli?" },
      },
      quiz: { question: "Chi ha promesso di insegnare a cucinare i pel'meni?", options: ["La madre","La nonna","Un amico"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["пельмени.","нравятся","очень","Мне"], answer: "Мне очень нравятся пельмени.", answer_it: "Mi piacciono molto i pel'meni." },
      translationDrills: [
        { prompt_it: "So cucinare la pasta.", answer_ru: "Я умею готовить пасту." },
        { prompt_it: "Qual è il tuo piatto preferito?", answer_ru: "Какое твоё любимое блюдо?" },
        { prompt_it: "Mia nonna mi insegnerà.", answer_ru: "Моя бабушка меня научит." },
      ],
      production: "Racconta in russo qual è il tuo piatto preferito e se sai cucinarlo.",
    },
  ],
  B2: [
    {
      id: "b2-1",
      title: "Слухи в офисе",
      subtitle: "Pettegolezzi in ufficio",
      story: [
        { ru: "— Ты слышал новость? Говорят, что начальник уходит.", it: "— Hai sentito la notizia? Dicono che il capo se ne va." },
        { ru: "— Кто тебе это сказал?", it: "— Chi te l'ha detto?" },
        { ru: "— Коллега сказала, что она читала это в письме.", it: "— Una collega ha detto che l'ha letto in una mail." },
        { ru: "— Странно, что нам ничего не сообщили официально.", it: "— Strano che non ci abbiano comunicato nulla ufficialmente." },
      ],
      vocab: [
        { ru: "слух", translit: "slukh", it: "voce, diceria" },
        { ru: "сказать, что", translit: "skazát' shto", it: "dire che" },
        { ru: "сообщить", translit: "saabshchít'", it: "comunicare, informare" },
        { ru: "странно, что", translit: "stránna shto", it: "è strano che" },
      ],
      grammar: {
        pattern: "Discorso indiretto: [verbo dichiarativo] + что + [frase]",
        explanation_it:
          "Per riportare ciò che qualcuno ha detto si usa \"что\" (che) senza cambiare i tempi verbali come in italiano: \"Она сказала, что она читала\" resta al passato così com'è, non retrocede.",
        examples: [
          "Он сказал, что уходит.",
          "Коллега сказала, что она читала это в письме.",
          "Странно, что нам не сообщили.",
        ],
        exercise: {
          template: "Она сказала, ___ уходит.",
          options: ["что", "если", "потому что"],
          correct: 0,
          full_ru: "Она сказала, что уходит.",
          full_it: "Ha detto che se ne va.",
        },
      },
      quiz: {
        question: "'Странно, что нам ничего не сообщили' significa...",
        options: [
          "È normale che non ci abbiano detto niente",
          "È strano che non ci abbiano detto niente",
          "Ci hanno detto tutto",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["уходит.", "что", "начальник", "Говорят,"],
        answer: "Говорят, что начальник уходит.",
        answer_it: "Dicono che il capo se ne va.",
      },
      translationDrills: [
        { prompt_it: "Hai sentito la notizia?", answer_ru: "Ты слышал новость?" },
        { prompt_it: "Ha detto che è stanca.", answer_ru: "Она сказала, что устала." },
        { prompt_it: "È strano che lui non abbia scritto.", answer_ru: "Странно, что он не написал." },
      ],
      production: "Racconta in russo un pettegolezzo (vero o inventato) usando 'сказал(а), что'.",
    },
    {
      id: "b2-2",
      title: "Планы меняются",
      subtitle: "I piani cambiano",
      story: [
        { ru: "— Ты уже читаешь эту книгу неделю. Прочитал?", it: "— Leggi questo libro già da una settimana. L'hai finito?" },
        { ru: "— Нет, я читаю её медленно, по вечерам.", it: "— No, la leggo lentamente, di sera." },
        { ru: "— А проект, который ты обещал закончить?", it: "— E il progetto che avevi promesso di finire?" },
        { ru: "— Проект, который я делаю сейчас, оказался сложнее, чем я думал.", it: "— Il progetto a cui lavoro adesso si è rivelato più complicato di quanto pensassi." },
      ],
      vocab: [
        { ru: "читать / прочитать", translit: "chitát' / prachitát'", it: "leggere (processo / risultato)" },
        { ru: "который", translit: "katóry", it: "che, il quale" },
        { ru: "обещать", translit: "abeshchát'", it: "promettere" },
        { ru: "оказаться", translit: "akazát'sya", it: "rivelarsi" },
      ],
      grammar: {
        pattern: "Aspetto: imperfettivo (processo) vs perfettivo (risultato)",
        explanation_it:
          "\"Читать\" (imperfettivo) descrive il processo o un'azione ripetuta/in corso; \"прочитать\" (perfettivo) ne indica il completamento con risultato. \"Который\" introduce una frase relativa e si declina come un aggettivo.",
        examples: [
          "Я читаю книгу неделю. (processo)",
          "Я прочитал книгу вчера. (risultato)",
          "Проект, который я делаю, сложный.",
        ],
        exercise: {
          template: "Ты уже ___ эту книгу? (l'hai finita?)",
          options: ["прочитал", "читаешь", "читал"],
          correct: 0,
          full_ru: "Ты уже прочитал эту книгу?",
          full_it: "Hai già letto questo libro?",
        },
      },
      quiz: {
        question: "Qual è la differenza tra 'читать' e 'прочитать'?",
        options: [
          "Nessuna, sono sinonimi",
          "'читать' = processo, 'прочитать' = azione completata",
          "'прочитать' è più formale",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["сложнее.", "оказался", "Проект", "думал,", "чем", "я"],
        answer: "Проект оказался сложнее, чем я думал.",
        answer_it: "Il progetto si è rivelato più difficile di quanto pensassi.",
      },
      translationDrills: [
        { prompt_it: "Leggo un libro interessante.", answer_ru: "Я читаю интересную книгу." },
        { prompt_it: "Ho finito il lavoro ieri.", answer_ru: "Я закончил работу вчера." },
        { prompt_it: "Il libro che ho letto era bello.", answer_ru: "Книга, которую я прочитал, была хорошая." },
      ],
      production: "Racconta in russo un progetto o un libro che si è rivelato più difficile del previsto.",
    },
    {
      id: "b2-3",
      title: "Реформа на работе",
      subtitle: "Una riforma sul lavoro",
      story: [
        { ru: "— Слышал, что компания меняет структуру отделов?", it: "— Hai sentito che l'azienda cambia la struttura dei reparti?" },
        { ru: "— Да, говорят, будет меньше менеджеров.", it: "— Sì, dicono che ci saranno meno manager." },
        { ru: "— Это может повлиять на наши бонусы.", it: "— Questo potrebbe influire sui nostri bonus." },
        { ru: "— Будем надеяться, что всё останется как есть.", it: "— Speriamo che tutto rimanga come adesso." },
      ],
      vocab: [
        { ru: "структу́ра", translit: "struktura", it: "struttura" },
        { ru: "отде́л", translit: "atdel", it: "reparto, dipartimento" },
        { ru: "повлия́ть на", translit: "pavliyat' na", it: "influire su" },
        { ru: "остава́ться как есть", translit: "astavat'sya kak yest'", it: "rimanere così com'è" },
      ],
      grammar: {
        pattern: "Будущее время после 'будем надеяться, что'",
        explanation_it: "Dopo verbi come 'надеяться' (sperare) la frase subordinata con 'что' segue il tempo naturale dell'evento sperato, spesso il futuro o il presente, senza il congiuntivo che avremmo in italiano: 'надеюсь, что всё будет хорошо'.",
        examples: ["Надеюсь, что ты придёшь.","Будем надеяться, что это сработает.","Я надеюсь, что всё останется как есть."],
        exercise: { template: "Будем надеяться, что всё ___ как есть. (rimarrà)", options: ["останется","остаться","оставит"], correct: 0, full_ru: "Будем надеяться, что всё останется как есть.", full_it: "Speriamo che tutto rimanga come adesso." },
      },
      quiz: { question: "Cosa potrebbe cambiare secondo il dialogo?", options: ["Gli orari","Il numero di manager","Lo stipendio base"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["бонусы.","наши","на","повлиять","может","Это"], answer: "Это может повлиять на наши бонусы.", answer_it: "Questo potrebbe influire sui nostri bonus." },
      translationDrills: [
        { prompt_it: "Speriamo che funzioni.", answer_ru: "Будем надеяться, что это сработает." },
        { prompt_it: "L'azienda cambia struttura.", answer_ru: "Компания меняет структуру." },
        { prompt_it: "Questo influisce sul bonus.", answer_ru: "Это влияет на бонус." },
      ],
      production: "Scrivi in russo le tue preoccupazioni su un cambiamento ipotetico al lavoro.",
    },
    {
      id: "b2-4",
      title: "Городская жизнь vs деревня",
      subtitle: "Vita in città contro vita in campagna",
      story: [
        { ru: "— Ты бы хотел жить в деревне?", it: "— Ti piacerebbe vivere in campagna?" },
        { ru: "— Иногда да, там тише и воздух чище.", it: "— A volte sì, lì è più tranquillo e l'aria è più pulita." },
        { ru: "— Но там меньше возможностей для карьеры.", it: "— Ma lì ci sono meno opportunità di carriera." },
        { ru: "— Это правда, поэтому я пока остаюсь в городе.", it: "— È vero, per questo per ora resto in città." },
      ],
      vocab: [
        { ru: "дере́вня", translit: "derevnya", it: "campagna, villaggio" },
        { ru: "во́здух", translit: "vozdukh", it: "aria" },
        { ru: "возмо́жность", translit: "vazmozhnost'", it: "opportunità, possibilità" },
        { ru: "пока́", translit: "paka", it: "per ora, per il momento" },
      ],
      grammar: {
        pattern: "Comparativi predicativi in serie: тише, чище, меньше",
        explanation_it: "In una frase con più comparativi in serie (тише - più tranquillo, чище - più pulito), ciascuno concorda semplicemente con il soggetto sottinteso 'там' (lì) senza bisogno di ripetere il verbo essere, tipico dello stile colloquiale.",
        examples: ["Там тише.","Здесь воздух чище.","Там меньше возможностей."],
        exercise: { template: "Там тише и воздух ___. (più pulito)", options: ["чище","чистый","чисто"], correct: 0, full_ru: "Там тише и воздух чище.", full_it: "Lì è più tranquillo e l'aria è più pulita." },
      },
      quiz: { question: "Perché la persona resta in città per ora?", options: ["Non le piace la campagna","Per le opportunità di carriera","Per la famiglia"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["карьеры.","для","возможностей","меньше","там","Но"], answer: "Но там меньше возможностей для карьеры.", answer_it: "Ma lì ci sono meno opportunità di carriera." },
      translationDrills: [
        { prompt_it: "Vorrei vivere in campagna.", answer_ru: "Я хотел бы жить в деревне." },
        { prompt_it: "L'aria qui è più pulita.", answer_ru: "Здесь воздух чище." },
        { prompt_it: "Per ora resto qui.", answer_ru: "Пока я остаюсь здесь." },
      ],
      production: "Scrivi in russo i pro e i contro della vita in città rispetto alla campagna.",
    },
    {
      id: "b2-5",
      title: "Социальные сети",
      subtitle: "I social network",
      story: [
        { ru: "— Сколько времени ты проводишь в соцсетях?", it: "— Quanto tempo passi sui social network?" },
        { ru: "— Наверное, слишком много, если честно.", it: "— Probabilmente troppo, a essere sincero." },
        { ru: "— Ты не думал удалить приложения?", it: "— Non hai pensato di eliminare le app?" },
        { ru: "— Думал, но пока не решился.", it: "— Ci ho pensato, ma non mi sono ancora deciso." },
      ],
      vocab: [
        { ru: "проводи́ть вре́мя", translit: "pravadit' vremya", it: "passare tempo" },
        { ru: "е́сли че́стно", translit: "yesli chestna", it: "a essere sincero" },
        { ru: "удали́ть приложе́ние", translit: "udalit' prilazhenie", it: "eliminare un'app" },
        { ru: "реши́ться", translit: "reshit'sya", it: "decidersi (a fare qualcosa)" },
      ],
      grammar: {
        pattern: "Verbo riflessivo решиться (decidersi) + infinito",
        explanation_it: "'Решиться' (decidersi, prendere coraggio per fare qualcosa) è riflessivo e regge l'infinito: 'не решился удалить' (non si è deciso a eliminare). Diverso da 'решить' (decidere/risolvere), non riflessivo.",
        examples: ["Я решился на это.","Она не решилась сказать правду.","Он решился уехать."],
        exercise: { template: "Думал, но пока не ___. (mi sono deciso)", options: ["решился","решил","решать"], correct: 0, full_ru: "Думал, но пока не решился.", full_it: "Ci ho pensato, ma non mi sono ancora deciso." },
      },
      quiz: { question: "Cosa considera di fare la persona nel dialogo?", options: ["Creare un nuovo profilo","Eliminare le app dei social","Cambiare telefono"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["соцсетях?","в","времени","проводишь","ты","Сколько"], answer: "Сколько времени ты проводишь в соцсетях?", answer_it: "Quanto tempo passi sui social network?" },
      translationDrills: [
        { prompt_it: "Passo troppo tempo online.", answer_ru: "Я провожу слишком много времени онлайн." },
        { prompt_it: "Non mi sono ancora deciso.", answer_ru: "Я пока не решился." },
        { prompt_it: "A essere sincero, sì.", answer_ru: "Если честно, да." },
      ],
      production: "Scrivi in russo quanto tempo passi sui social e se vorresti cambiare qualcosa.",
    },
    {
      id: "b2-6",
      title: "Культурные различия",
      subtitle: "Le differenze culturali",
      story: [
        { ru: "— Что тебя удивило в русской культуре?", it: "— Cosa ti ha sorpreso della cultura russa?" },
        { ru: "— То, что гости всегда снимают обувь дома.", it: "— Il fatto che gli ospiti si tolgono sempre le scarpe in casa." },
        { ru: "— А что тебе показалось похожим на Италию?", it: "— E cosa ti è sembrato simile all'Italia?" },
        { ru: "— Гостеприимство и важность семьи.", it: "— L'ospitalità e l'importanza della famiglia." },
      ],
      vocab: [
        { ru: "удиви́ть", translit: "udivit'", it: "sorprendere" },
        { ru: "снима́ть о́бувь", translit: "snimat' obuv'", it: "togliersi le scarpe" },
        { ru: "показа́ться похо́жим", translit: "pakazat'sya pokhozhim", it: "sembrare simile" },
        { ru: "гостеприи́мство", translit: "gastepriimstva", it: "ospitalità" },
      ],
      grammar: {
        pattern: "То, что + frase (per introdurre 'il fatto che')",
        explanation_it: "'То, что' introduce una frase come oggetto o soggetto astratto: 'то, что гости снимают обувь' (il fatto che gli ospiti si tolgono le scarpe). È una costruzione molto comune per riferirsi a un fatto o un'idea intera.",
        examples: ["То, что он сказал, было правдой.","Меня удивило то, что все пришли вовремя.","То, что ты здесь, — это хорошо."],
        exercise: { template: "___, что гости снимают обувь. (il fatto)", options: ["То","Это","Что"], correct: 0, full_ru: "То, что гости снимают обувь дома.", full_it: "Il fatto che gli ospiti si tolgono le scarpe in casa." },
      },
      quiz: { question: "Cosa hanno in comune Russia e Italia, secondo il dialogo?", options: ["Il cibo","Ospitalità e importanza della famiglia","Il clima"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["семьи.","важность","и","Гостеприимство"], answer: "Гостеприимство и важность семьи.", answer_it: "L'ospitalità e l'importanza della famiglia." },
      translationDrills: [
        { prompt_it: "Mi ha sorpreso questo.", answer_ru: "Меня это удивило." },
        { prompt_it: "Ci togliamo le scarpe in casa.", answer_ru: "Мы снимаем обувь дома." },
        { prompt_it: "Sembra simile all'Italia.", answer_ru: "Это кажется похожим на Италию." },
      ],
      production: "Racconta in russo una differenza culturale che ti ha sorpreso.",
    },
    {
      id: "b2-7",
      title: "Финансовая грамотность",
      subtitle: "L'educazione finanziaria",
      story: [
        { ru: "— Ты откладываешь деньги каждый месяц?", it: "— Metti da parte dei soldi ogni mese?" },
        { ru: "— Стараюсь, хотя бы десять процентов от зарплаты.", it: "— Ci provo, almeno il dieci percento dello stipendio." },
        { ru: "— А во что ты инвестируешь?", it: "— E in cosa investi?" },
        { ru: "— Пока просто держу деньги на депозите.", it: "— Per ora tengo semplicemente i soldi in un deposito." },
      ],
      vocab: [
        { ru: "откла́дывать де́ньги", translit: "atkladyvat' den'gi", it: "mettere via soldi, risparmiare" },
        { ru: "хотя́ бы", translit: "khatya by", it: "almeno" },
        { ru: "инвести́ровать", translit: "investiravat'", it: "investire" },
        { ru: "депози́т", translit: "depazit", it: "deposito bancario" },
      ],
      grammar: {
        pattern: "Хотя бы + numero (almeno)",
        explanation_it: "'Хотя бы' significa 'almeno' nel senso di un minimo accettabile: 'хотя бы десять процентов' (almeno il dieci percento). Non confondere con 'хотя' da solo, che significa 'sebbene, anche se'.",
        examples: ["Хотя бы раз в неделю.","Дай мне хотя бы час.","Позвони хотя бы вечером."],
        exercise: { template: "Стараюсь откладывать ___ десять процентов. (almeno)", options: ["хотя бы","хотя","если бы"], correct: 0, full_ru: "Стараюсь откладывать хотя бы десять процентов.", full_it: "Cerco di mettere da parte almeno il dieci percento." },
      },
      quiz: { question: "Dove tiene i risparmi la persona nel dialogo?", options: ["In azioni","In un deposito bancario","In contanti a casa"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["месяц?","каждый","деньги","откладываешь","Ты"], answer: "Ты откладываешь деньги каждый месяц?", answer_it: "Metti da parte dei soldi ogni mese?" },
      translationDrills: [
        { prompt_it: "Risparmio ogni mese.", answer_ru: "Я откладываю деньги каждый месяц." },
        { prompt_it: "Investo poco per ora.", answer_ru: "Я пока мало инвестирую." },
        { prompt_it: "Almeno il dieci percento.", answer_ru: "Хотя бы десять процентов." },
      ],
      production: "Scrivi in russo come gestisci i tuoi risparmi o come vorresti gestirli.",
    },
    {
      id: "b2-8",
      title: "Спорт и мотивация",
      subtitle: "Sport e motivazione",
      story: [
        { ru: "— Как тебе удаётся тренироваться каждый день?", it: "— Come riesci ad allenarti ogni giorno?" },
        { ru: "— Я просто не даю себе выбора — это уже привычка.", it: "— Semplicemente non mi do scelta — ormai è un'abitudine." },
        { ru: "— А что делать, если нет мотивации?", it: "— E cosa fare se manca la motivazione?" },
        { ru: "— Начни с малого, мотивация появится позже.", it: "— Inizia con poco, la motivazione arriverà dopo." },
      ],
      vocab: [
        { ru: "тренирова́ться", translit: "trenirovat'sya", it: "allenarsi" },
        { ru: "привы́чка", translit: "privychka", it: "abitudine" },
        { ru: "мотива́ция", translit: "motivatsiya", it: "motivazione" },
        { ru: "начина́ть с ма́лого", translit: "nachinat' s malava", it: "iniziare con poco" },
      ],
      grammar: {
        pattern: "Как тебе удаётся + infinito (come riesci a...)",
        explanation_it: "'Как тебе удаётся' + infinito è una costruzione impersonale con dativo per chiedere come qualcuno riesce a fare qualcosa: letteralmente 'come a te riesce'. Molto comune per esprimere ammirazione o curiosità su un'abitudine.",
        examples: ["Как тебе удаётся всё успевать?","Как ей удаётся быть такой спокойной?","Мне удаётся тренироваться благодаря привычке."],
        exercise: { template: "Как тебе ___ тренироваться каждый день? (riesci)", options: ["удаётся","удалось","удастся"], correct: 0, full_ru: "Как тебе удаётся тренироваться каждый день?", full_it: "Come riesci ad allenarti ogni giorno?" },
      },
      quiz: { question: "Cosa consiglia l'ultima battuta per chi non ha motivazione?", options: ["Aspettare l'ispirazione","Iniziare con poco","Cambiare sport"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["привычка.","уже","это","выбора","себе","не","даю","Я"], answer: "Я не даю себе выбора, это уже привычка.", answer_it: "Non mi do scelta, ormai è un'abitudine." },
      translationDrills: [
        { prompt_it: "Mi alleno ogni giorno.", answer_ru: "Я тренируюсь каждый день." },
        { prompt_it: "È già un'abitudine.", answer_ru: "Это уже привычка." },
        { prompt_it: "Come ci riesci?", answer_ru: "Как тебе это удаётся?" },
      ],
      production: "Racconta in russo come mantieni (o vorresti mantenere) una buona abitudine sportiva.",
    },
    {
      id: "b2-9",
      title: "Искусственный интеллект дома",
      subtitle: "L'intelligenza artificiale in casa",
      story: [
        { ru: "— У тебя дома есть умные устройства?", it: "— Hai dispositivi intelligenti in casa?" },
        { ru: "— Да, умная колонка и термостат.", it: "— Sì, un altoparlante intelligente e un termostato." },
        { ru: "— Тебя не беспокоит вопрос приватности?", it: "— Non ti preoccupa la questione della privacy?" },
        { ru: "— Немного, но удобство перевешивает риски.", it: "— Un po', ma la comodità supera i rischi." },
      ],
      vocab: [
        { ru: "у́мное устро́йство", translit: "umnoe ustroystva", it: "dispositivo intelligente" },
        { ru: "коло́нка", translit: "kalonka", it: "altoparlante, cassa" },
        { ru: "приватность", translit: "privatnost'", it: "privacy" },
        { ru: "перевешивать", translit: "perevešivat'", it: "superare, prevalere (in peso)" },
      ],
      grammar: {
        pattern: "Беспокоить кого-то (preoccupare qualcuno) — accusativo",
        explanation_it: "'Беспокоить' (preoccupare) regge l'accusativo della persona preoccupata: 'тебя не беспокоит' (non ti preoccupa). È l'opposto di 'беспокоиться о' (riflessivo, preoccuparsi PER qualcosa), già visto in altre lezioni.",
        examples: ["Меня беспокоит этот вопрос.","Тебя это не беспокоит?","Его беспокоит будущее."],
        exercise: { template: "___ не беспокоит вопрос приватности? (ti)", options: ["Тебя","Ты","Тебе"], correct: 0, full_ru: "Тебя не беспокоит вопрос приватности?", full_it: "Non ti preoccupa la questione della privacy?" },
      },
      quiz: { question: "Cosa ha in casa la persona intervistata?", options: ["Robot aspirapolvere","Altoparlante e termostato intelligenti","Solo lo smartphone"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["риски.","перевешивает","удобство","но"], answer: "Но удобство перевешивает риски.", answer_it: "Ma la comodità supera i rischi." },
      translationDrills: [
        { prompt_it: "Mi preoccupa la privacy.", answer_ru: "Меня беспокоит приватность." },
        { prompt_it: "Ho un altoparlante intelligente.", answer_ru: "У меня есть умная колонка." },
        { prompt_it: "La comodità è importante.", answer_ru: "Удобство важно." },
      ],
      production: "Scrivi in russo la tua opinione sui dispositivi intelligenti in casa e la privacy.",
    },
    {
      id: "b2-10",
      title: "Волонтёрство",
      subtitle: "Il volontariato",
      story: [
        { ru: "— Ты когда-нибудь занимался волонтёрством?", it: "— Hai mai fatto volontariato?" },
        { ru: "— Да, я помогал в приюте для животных.", it: "— Sì, ho aiutato in un rifugio per animali." },
        { ru: "— Что тебе это дало?", it: "— Cosa ti ha dato questa esperienza?" },
        { ru: "— Это научило меня ценить то, что у меня есть.", it: "— Mi ha insegnato ad apprezzare quello che ho." },
      ],
      vocab: [
        { ru: "волонтёрство", translit: "valantyorstva", it: "volontariato" },
        { ru: "прию́т для живо́тных", translit: "priyut dlya zhivotnykh", it: "rifugio per animali" },
        { ru: "дать (что-то)", translit: "dat'", it: "dare, fornire (in senso figurato: 'cosa ti ha dato')" },
        { ru: "цени́ть", translit: "tsenit'", it: "apprezzare, valorizzare" },
      ],
      grammar: {
        pattern: "То, что у меня есть (ciò che ho) — frase relativa senza pronome esplicito",
        explanation_it: "'То, что у меня есть' (ciò che ho) usa 'то, что' per riferirsi genericamente a 'le cose che possiedo', una struttura molto usata per esprimere concetti astratti derivati da un'intera frase, come già visto con 'меня удивило то, что...'.",
        examples: ["Цени то, что у тебя есть.","Я ценю то, что ты сделал.","То, что у меня есть, — это немного, но достаточно."],
        exercise: { template: "Это научило меня ___ то, что у меня есть. (apprezzare)", options: ["ценить","ценю","ценил"], correct: 0, full_ru: "Это научило меня ценить то, что у меня есть.", full_it: "Mi ha insegnato ad apprezzare quello che ho." },
      },
      quiz: { question: "Dove ha fatto volontariato la persona?", options: ["In un ospedale","In un rifugio per animali","In una scuola"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["дало?","это","тебе","Что"], answer: "Что тебе это дало?", answer_it: "Cosa ti ha dato questa esperienza?" },
      translationDrills: [
        { prompt_it: "Ho fatto volontariato l'anno scorso.", answer_ru: "Я занимался волонтёрством в прошлом году." },
        { prompt_it: "Apprezzo quello che ho.", answer_ru: "Я ценю то, что у меня есть." },
        { prompt_it: "Ho aiutato in un rifugio.", answer_ru: "Я помогал в приюте." },
      ],
      production: "Racconta in russo un'esperienza di volontariato (reale o immaginata) e cosa ti ha insegnato.",
    },
  ],
  C1: [
    {
      id: "c1-1",
      title: "Человек, который изменил всё",
      subtitle: "La persona che ha cambiato tutto",
      story: [
        { ru: "— Расскажи о человеке, повлиявшем на твою жизнь.", it: "— Parlami di una persona che ha influenzato la tua vita." },
        { ru: "— Это была моя первая начальница, работавшая в проекте пять лет.", it: "— È stata la mia prima capa, che lavorava nel progetto da cinque anni." },
        { ru: "— Что именно она сделала?", it: "— Cosa ha fatto esattamente?" },
        { ru: "— Она, не сомневаясь ни секунды, доверила мне сложную задачу.", it: "— Senza esitare un secondo, mi ha affidato un compito complesso." },
      ],
      vocab: [
        { ru: "повлиять на", translit: "pavliyát' na", it: "influenzare" },
        { ru: "доверить", translit: "davérit'", it: "affidare, confidare" },
        { ru: "не сомневаясь", translit: "ne samneváyas'", it: "senza esitare (gerundio)" },
        { ru: "именно", translit: "ímenna", it: "esattamente, proprio" },
      ],
      grammar: {
        pattern: "Participio attivo (-вший/-ющий) al posto di 'который'",
        explanation_it:
          "In russo colto/scritto, la frase relativa con \"который\" viene spesso sostituita da un participio: \"начальница, которая работала\" → \"начальница, работавшая\". Il gerundio (деепричастие, es. \"не сомневаясь\") descrive un'azione simultanea a quella principale, senza soggetto proprio.",
        examples: [
          "Начальница, работавшая в проекте пять лет.",
          "Человек, повлиявший на мою жизнь.",
          "Она, не сомневаясь, доверила мне задачу.",
        ],
        exercise: {
          template: "Человек, ___ на мою жизнь, был мой учитель. (che ha influenzato)",
          options: ["повлиявший", "который влияет", "повлиять"],
          correct: 0,
          full_ru: "Человек, повлиявший на мою жизнь, был мой учитель.",
          full_it: "La persona che ha influenzato la mia vita è stata il mio insegnante.",
        },
      },
      quiz: {
        question: "'Работавшая в проекте пять лет' è equivalente a...",
        options: [
          "которая будет работать в проекте",
          "которая работала в проекте",
          "которая не работала в проекте",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["задачу.", "мне", "сложную", "доверила", "Она"],
        answer: "Она доверила мне сложную задачу.",
        answer_it: "Mi ha affidato un compito difficile.",
      },
      translationDrills: [
        { prompt_it: "La persona che lavora qui è brava.", answer_ru: "Человек, работающий здесь, хороший." },
        { prompt_it: "Senza pensarci, ha accettato.", answer_ru: "Не задумываясь, он согласился." },
        { prompt_it: "Un progetto che ha cambiato tutto.", answer_ru: "Проект, изменивший всё." },
      ],
      production: "Descrivi in russo una persona che ha influenzato la tua carriera, usando almeno un participio.",
    },
    {
      id: "c1-2",
      title: "Несмотря на трудности",
      subtitle: "Nonostante le difficoltà",
      story: [
        { ru: "— Несмотря на трудности, компания продолжает расти.", it: "— Nonostante le difficoltà, l'azienda continua a crescere." },
        { ru: "— Работая в таких условиях, легко устать.", it: "— Lavorando in queste condizioni, è facile stancarsi." },
        { ru: "— Верно, хотя команда старается не показывать усталость.", it: "— Vero, anche se il team cerca di non mostrare la stanchezza." },
        { ru: "— Главное — не терять мотивацию, что бы ни случилось.", it: "— L'importante è non perdere la motivazione, qualunque cosa succeda." },
      ],
      vocab: [
        { ru: "несмотря на", translit: "nesmatryá na", it: "nonostante" },
        { ru: "хотя", translit: "khatyá", it: "sebbene, anche se" },
        { ru: "терять", translit: "teryát'", it: "perdere" },
        { ru: "что бы ни случилось", translit: "shto by ni sluchílas'", it: "qualunque cosa succeda" },
      ],
      grammar: {
        pattern: "Деепричастие (gerundio): [radice] + -я/-а per azione simultanea",
        explanation_it:
          "Il gerundio russo (работая = lavorando) descrive un'azione che accompagna quella principale, senza declinarsi e senza soggetto proprio: il soggetto è sempre lo stesso della frase principale. \"Что бы ни\" + verbo esprime concessione universale (\"qualunque cosa...\").",
        examples: [
          "Работая много, он не терял мотивацию.",
          "Несмотря на трудности, всё получилось.",
          "Что бы ни случилось, я буду рядом.",
        ],
        exercise: {
          template: "___ много, она не уставала. (lavorando)",
          options: ["Работая", "Работать", "Работает"],
          correct: 0,
          full_ru: "Работая много, она не уставала.",
          full_it: "Lavorando molto, non si stancava.",
        },
      },
      quiz: {
        question: "'Несмотря на' introduce...",
        options: ["Una causa", "Una concessione (nonostante)", "Uno scopo"],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["мотивацию.", "терять", "не", "Главное", "—"],
        answer: "Главное — не терять мотивацию.",
        answer_it: "La cosa importante è non perdere la motivazione.",
      },
      translationDrills: [
        { prompt_it: "Nonostante la pioggia, siamo usciti.", answer_ru: "Несмотря на дождь, мы вышли." },
        { prompt_it: "Camminando, pensava al lavoro.", answer_ru: "Идя, он думал о работе." },
        { prompt_it: "Qualunque cosa dica, non cambierò idea.", answer_ru: "Что бы он ни сказал, я не изменю мнение." },
      ],
      production: "Scrivi in russo due frasi su una difficoltà che hai superato, usando 'несмотря на' e un gerundio.",
    },
    {
      id: "c1-3",
      title: "Дискуссия о климате",
      subtitle: "Un dibattito sul clima",
      story: [
        { ru: "— Считаете ли вы изменение климата главной угрозой?", it: "— Considera il cambiamento climatico la minaccia principale?" },
        { ru: "— Безусловно, хотя проблема требует комплексного подхода.", it: "— Assolutamente, sebbene il problema richieda un approccio complessivo." },
        { ru: "— Какие меры вы бы предложили в первую очередь?", it: "— Quali misure proporrebbe prima di tutto?" },
        { ru: "— Сокращение выбросов и переход на возобновляемые источники энергии.", it: "— La riduzione delle emissioni e il passaggio a fonti di energia rinnovabili." },
      ],
      vocab: [
        { ru: "угро́за", translit: "ugroza", it: "minaccia" },
        { ru: "ко́мплексный подхо́д", translit: "kompleksny podkhod", it: "approccio complessivo" },
        { ru: "сокраще́ние вы́бросов", translit: "sokrashchenie vybrasov", it: "riduzione delle emissioni" },
        { ru: "возобновля́емые исто́чники", translit: "vazabnavlyaemye istochniki", it: "fonti rinnovabili" },
      ],
      grammar: {
        pattern: "Considerare che... сон + accusativo + strumentale predicativo",
        explanation_it: "'Считать X + strumentale' significa 'considerare X come qualcosa': 'считаете изменение климата угрозой' (considera il cambiamento climatico una minaccia). Il predicato dopo 'считать' va allo strumentale, non al nominativo.",
        examples: ["Я считаю это важным.","Он считает себя экспертом.","Мы считаем это ошибкой."],
        exercise: { template: "Считаете ли вы изменение климата главной ___? (minaccia)", options: ["угрозой","угроза","угрозу"], correct: 0, full_ru: "Считаете ли вы изменение климата главной угрозой?", full_it: "Considera il cambiamento climatico la minaccia principale?" },
      },
      quiz: { question: "Quale misura è menzionata per prima nel dialogo?", options: ["Piantare alberi","Ridurre le emissioni","Vietare le auto"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["подхода.","комплексного","требует","проблема"], answer: "Проблема требует комплексного подхода.", answer_it: "Il problema richiede un approccio complessivo." },
      translationDrills: [
        { prompt_it: "Considero questo importante.", answer_ru: "Я считаю это важным." },
        { prompt_it: "Bisogna ridurre le emissioni.", answer_ru: "Нужно сократить выбросы." },
        { prompt_it: "È una minaccia seria.", answer_ru: "Это серьёзная угроза." },
      ],
      production: "Scrivi in russo la tua opinione su una misura efficace contro il cambiamento climatico.",
    },
    {
      id: "c1-4",
      title: "Литературная критика",
      subtitle: "La critica letteraria",
      story: [
        { ru: "— Что вы думаете о новом романе этого автора?", it: "— Cosa pensa del nuovo romanzo di questo autore?" },
        { ru: "— Стиль впечатляет, хотя сюжет местами затянут.", it: "— Lo stile impressiona, sebbene la trama sia a tratti dilungata." },
        { ru: "— А как вам финал?", it: "— E come le è sembrato il finale?" },
        { ru: "— Неожиданный, но вполне оправданный.", it: "— Inaspettato, ma abbastanza giustificato." },
      ],
      vocab: [
        { ru: "впечатля́ть", translit: "vpechatlyat'", it: "impressionare" },
        { ru: "затя́нутый", translit: "zatyanuty", it: "dilungato, tirato per le lunghe" },
        { ru: "неожи́данный", translit: "neazhidanny", it: "inaspettato" },
        { ru: "оправ́данный", translit: "apravdanny", it: "giustificato" },
      ],
      grammar: {
        pattern: "Местами (a tratti) — avverbio di frequenza distribuita",
        explanation_it: "'Местами' (letteralmente 'in luoghi/punti') indica che qualcosa avviene in alcuni tratti o parti, non ovunque: 'сюжет местами затянут' (la trama è a tratti dilungata). Utile per critiche sfumate.",
        examples: ["Местами было скучно.","Текст местами сложный.","Погода местами дождливая."],
        exercise: { template: "Сюжет ___ затянут. (a tratti)", options: ["местами","иногда","везде"], correct: 0, full_ru: "Сюжет местами затянут.", full_it: "La trama è a tratti dilungata." },
      },
      quiz: { question: "Come descrive il finale il critico?", options: ["Prevedibile e debole","Inaspettato ma giustificato","Confuso"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["впечатляет.","Стиль"], answer: "Стиль впечатляет.", answer_it: "Lo stile impressiona." },
      translationDrills: [
        { prompt_it: "Lo stile è impressionante.", answer_ru: "Стиль впечатляющий." },
        { prompt_it: "Il finale era inaspettato.", answer_ru: "Финал был неожиданным." },
        { prompt_it: "A tratti era noioso.", answer_ru: "Местами было скучно." },
      ],
      production: "Scrivi in russo una breve recensione di un libro o film che hai letto/visto di recente.",
    },
    {
      id: "c1-5",
      title: "Переговоры о зарплате",
      subtitle: "La trattativa sullo stipendio",
      story: [
        { ru: "— Я хотел бы обсудить моё вознаграждение.", it: "— Vorrei discutere della mia retribuzione." },
        { ru: "— Какие у вас аргументы для повышения?", it: "— Quali argomenti ha per un aumento?" },
        { ru: "— За последний год я взял на себя дополнительные обязанности.", it: "— Nell'ultimo anno mi sono assunto responsabilità aggiuntive." },
        { ru: "— Хорошо, я рассмотрю ваш запрос.", it: "— Va bene, prenderò in considerazione la sua richiesta." },
      ],
      vocab: [
        { ru: "вознагражде́ние", translit: "vaznagrazhdenie", it: "retribuzione, compenso" },
        { ru: "повыше́ние", translit: "pavyshenie", it: "aumento (di stipendio, ruolo)" },
        { ru: "взять на себя́", translit: "vzyat' na sebya", it: "assumersi (una responsabilità)" },
        { ru: "рассмотре́ть", translit: "rassmotret'", it: "prendere in considerazione, esaminare" },
      ],
      grammar: {
        pattern: "Взять на себя + accusativo (assumersi qualcosa)",
        explanation_it: "'Взять на себя' è un'espressione idiomatica che significa 'assumersi' (una responsabilità, un compito): 'взял на себя обязанности' (si è assunto delle responsabilità). Letteralmente 'ha preso su di sé'.",
        examples: ["Я беру это на себя.","Он взял на себя ответственность.","Мы возьмём на себя расходы."],
        exercise: { template: "Я взял на ___ дополнительные обязанности. (me stesso)", options: ["себя","себе","собой"], correct: 0, full_ru: "Я взял на себя дополнительные обязанности.", full_it: "Mi sono assunto responsabilità aggiuntive." },
      },
      quiz: { question: "Cosa risponde il capo alla richiesta?", options: ["Rifiuta subito","La prenderà in considerazione","Accetta subito"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["вознаграждение.","моё","обсудить","бы","хотел","Я"], answer: "Я хотел бы обсудить моё вознаграждение.", answer_it: "Vorrei discutere della mia retribuzione." },
      translationDrills: [
        { prompt_it: "Vorrei un aumento.", answer_ru: "Я хотел бы повышение." },
        { prompt_it: "Mi sono assunto nuove responsabilità.", answer_ru: "Я взял на себя новые обязанности." },
        { prompt_it: "Esaminerò la richiesta.", answer_ru: "Я рассмотрю запрос." },
      ],
      production: "Scrivi in russo come argomenteresti una richiesta di aumento di stipendio.",
    },
    {
      id: "c1-6",
      title: "Философский разговор",
      subtitle: "Una conversazione filosofica",
      story: [
        { ru: "— Как ты думаешь, существует ли свобода воли?", it: "— Secondo te, esiste il libero arbitrio?" },
        { ru: "— Это зависит от того, как определить свободу.", it: "— Dipende da come si definisce la libertà." },
        { ru: "— А ты веришь в судьбу?", it: "— E tu credi nel destino?" },
        { ru: "— Скорее в то, что мы сами создаём свою судьбу.", it: "— Piuttosto nel fatto che siamo noi a creare il nostro destino." },
      ],
      vocab: [
        { ru: "свобо́да во́ли", translit: "svaboda voli", it: "libero arbitrio" },
        { ru: "зави́сеть от", translit: "zaviset' at", it: "dipendere da" },
        { ru: "определи́ть", translit: "apredelit'", it: "definire" },
        { ru: "ско́рее", translit: "skaree", it: "piuttosto" },
      ],
      grammar: {
        pattern: "Зависит от того, как/что (dipende da come/cosa)",
        explanation_it: "'Зависит от того' + subordinata è la struttura per dire 'dipende dal fatto che/da come': 'зависит от того, как определить' (dipende da come si definisce). 'То' funge da segnaposto per l'intera proposizione seguente.",
        examples: ["Это зависит от того, что ты хочешь.","Всё зависит от того, как посмотреть.","Зависит от того, сколько времени у нас есть."],
        exercise: { template: "Это зависит ___ того, как определить свободу. (da)", options: ["от","из","с"], correct: 0, full_ru: "Это зависит от того, как определить свободу.", full_it: "Dipende da come si definisce la libertà." },
      },
      quiz: { question: "Cosa pensa la seconda persona sul destino?", options: ["Non esiste","Siamo noi a crearlo","È già scritto"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["воли?","свобода","ли","существует"], answer: "Существует ли свобода воли?", answer_it: "Esiste il libero arbitrio?" },
      translationDrills: [
        { prompt_it: "Dipende da te.", answer_ru: "Это зависит от тебя." },
        { prompt_it: "Credo nel destino.", answer_ru: "Я верю в судьбу." },
        { prompt_it: "Creiamo il nostro destino.", answer_ru: "Мы создаём свою судьбу." },
      ],
      production: "Scrivi in russo la tua opinione su una domanda filosofica: libertà, destino o un'altra a tua scelta.",
    },
    {
      id: "c1-7",
      title: "Кризис в компании",
      subtitle: "Una crisi in azienda",
      story: [
        { ru: "— Компания столкнулась с серьёзными трудностями.", it: "— L'azienda si è imbattuta in serie difficoltà." },
        { ru: "— Какие меры принимаются для их преодоления?", it: "— Quali misure si stanno prendendo per superarle?" },
        { ru: "— Сокращаются расходы и пересматривается стратегия.", it: "— Si riducono le spese e si rivede la strategia." },
        { ru: "— Будем надеяться, что этого будет достаточно.", it: "— Speriamo che questo sia sufficiente." },
      ],
      vocab: [
        { ru: "тру́дности", translit: "trudnasti", it: "difficoltà" },
        { ru: "преодоле́ние", translit: "preadalenie", it: "superamento" },
        { ru: "сокраща́ться", translit: "sakrashchat'sya", it: "ridursi" },
        { ru: "пересма́тривать", translit: "peresmatrivat'", it: "rivedere, riesaminare" },
      ],
      grammar: {
        pattern: "Passivo riflessivo con -ся: сокращаются, пересматривается",
        explanation_it: "Il russo forma spesso il passivo con verbi riflessivi in -ся: 'расходы сокращаются' (le spese si riducono = vengono ridotte), 'стратегия пересматривается' (la strategia viene rivista). Il soggetto grammaticale è la cosa subita, non l'agente.",
        examples: ["Проблема решается.","Ситуация улучшается.","Документы готовятся."],
        exercise: { template: "Расходы ___ и пересматривается стратегия. (si riducono)", options: ["сокращаются","сокращают","сократить"], correct: 0, full_ru: "Расходы сокращаются и пересматривается стратегия.", full_it: "Le spese si riducono e si rivede la strategia." },
      },
      quiz: { question: "Cosa si sta facendo per la crisi, secondo il dialogo?", options: ["Licenziamenti immediati","Riduzione spese e revisione strategia","Nulla per ora"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["трудностями.","серьёзными","с","столкнулась","Компания"], answer: "Компания столкнулась с серьёзными трудностями.", answer_it: "L'azienda si è imbattuta in serie difficoltà." },
      translationDrills: [
        { prompt_it: "La situazione migliora.", answer_ru: "Ситуация улучшается." },
        { prompt_it: "I costi si riducono.", answer_ru: "Расходы сокращаются." },
        { prompt_it: "Speriamo sia sufficiente.", answer_ru: "Будем надеяться, что этого достаточно." },
      ],
      production: "Scrivi in russo come descriveresti una crisi aziendale e le misure per affrontarla.",
    },
    {
      id: "c1-8",
      title: "Психология принятия решений",
      subtitle: "La psicologia delle decisioni",
      story: [
        { ru: "— Почему нам так трудно принимать решения?", it: "— Perché ci è così difficile prendere decisioni?" },
        { ru: "— Отчасти из-за страха сделать неправильный выбор.", it: "— In parte per paura di fare la scelta sbagliata." },
        { ru: "— Есть ли способ упростить этот процесс?", it: "— C'è un modo per semplificare questo processo?" },
        { ru: "— Да, стоит ограничить количество вариантов.", it: "— Sì, vale la pena limitare il numero di opzioni." },
      ],
      vocab: [
        { ru: "принима́ть реше́ния", translit: "prinimat' resheniya", it: "prendere decisioni" },
        { ru: "отча́сти", translit: "atchasti", it: "in parte" },
        { ru: "из-за", translit: "iz-za", it: "a causa di" },
        { ru: "упрости́ть", translit: "uprastit'", it: "semplificare" },
      ],
      grammar: {
        pattern: "Из-за + genitivo (causa negativa/neutra)",
        explanation_it: "'Из-за' + genitivo introduce una causa, tipicamente negativa o neutra: 'из-за страха' (a causa della paura). Si distingue da 'благодаря' (grazie a), usato per cause positive.",
        examples: ["Я опоздал из-за пробок.","Из-за дождя мы остались дома.","Это случилось из-за ошибки."],
        exercise: { template: "Отчасти ___ страха сделать неправильный выбор. (a causa di)", options: ["из-за","благодаря","для"], correct: 0, full_ru: "Отчасти из-за страха сделать неправильный выбор.", full_it: "In parte per paura di fare la scelta sbagliata." },
      },
      quiz: { question: "Cosa consiglia l'esperto per semplificare le decisioni?", options: ["Chiedere consiglio agli altri","Limitare il numero di opzioni","Decidere velocemente"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["решения?","принимать","трудно","так","нам","Почему"], answer: "Почему нам так трудно принимать решения?", answer_it: "Perché ci è così difficile prendere decisioni?" },
      translationDrills: [
        { prompt_it: "A causa della pioggia.", answer_ru: "Из-за дождя." },
        { prompt_it: "Ho paura di sbagliare.", answer_ru: "Я боюсь ошибиться." },
        { prompt_it: "Bisogna semplificare il processo.", answer_ru: "Нужно упростить процесс." },
      ],
      production: "Scrivi in russo perché, secondo te, è difficile prendere decisioni importanti.",
    },
    {
      id: "c1-9",
      title: "Медицинская этика",
      subtitle: "L'etica medica",
      story: [
        { ru: "— Врач обязан всегда говорить пациенту правду?", it: "— Il medico è tenuto a dire sempre la verità al paziente?" },
        { ru: "— Это сложный вопрос, зависящий от обстоятельств.", it: "— È una questione complessa, che dipende dalle circostanze." },
        { ru: "— А как насчёт согласия на лечение?", it: "— E per quanto riguarda il consenso al trattamento?" },
        { ru: "— Пациент должен быть полностью информирован.", it: "— Il paziente deve essere pienamente informato." },
      ],
      vocab: [
        { ru: "обя́зан", translit: "abyazan", it: "è tenuto a, ha l'obbligo di" },
        { ru: "обстоя́тельства", translit: "abstayatel'stva", it: "circostanze" },
        { ru: "согла́сие на лече́ние", translit: "saglasie na lechenie", it: "consenso al trattamento" },
        { ru: "полностью информи́рован", translit: "polnast'yu infarmiravan", it: "pienamente informato" },
      ],
      grammar: {
        pattern: "Participio presente attivo: зависящий (che dipende)",
        explanation_it: "'Зависящий' è il participio presente attivo di 'зависеть' (dipendere), usato per descrivere qualcosa 'che dipende': 'вопрос, зависящий от обстоятельств' (una questione che dipende dalle circostanze) — equivalente formale a 'который зависит'.",
        examples: ["Вопрос, зависящий от контекста.","Решение, зависящее от бюджета.","Проблема, зависящая от многих факторов."],
        exercise: { template: "Сложный вопрос, ___ от обстоятельств. (che dipende)", options: ["зависящий","который зависеть","зависит"], correct: 0, full_ru: "Сложный вопрос, зависящий от обстоятельств.", full_it: "Una questione complessa, che dipende dalle circostanze." },
      },
      quiz: { question: "Cosa deve essere il paziente, secondo il dialogo?", options: ["Tranquillo","Pienamente informato","Accompagnato da un familiare"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["информирован.","полностью","быть","должен","Пациент"], answer: "Пациент должен быть полностью информирован.", answer_it: "Il paziente deve essere pienamente informato." },
      translationDrills: [
        { prompt_it: "È una questione complessa.", answer_ru: "Это сложный вопрос." },
        { prompt_it: "Dipende dalle circostanze.", answer_ru: "Это зависит от обстоятельств." },
        { prompt_it: "Il paziente deve essere informato.", answer_ru: "Пациент должен быть информирован." },
      ],
      production: "Scrivi in russo la tua opinione su un dilemma etico in medicina.",
    },
    {
      id: "c1-10",
      title: "Урбанизация и её последствия",
      subtitle: "L'urbanizzazione e le sue conseguenze",
      story: [
        { ru: "— Как урбанизация повлияла на этот регион?", it: "— Come ha influito l'urbanizzazione su questa regione?" },
        { ru: "— Население города удвоилось за двадцать лет.", it: "— La popolazione della città è raddoppiata in vent'anni." },
        { ru: "— Какие проблемы это создало?", it: "— Quali problemi ha creato?" },
        { ru: "— В первую очередь — нехватку жилья и пробки.", it: "— Prima di tutto la carenza di alloggi e il traffico." },
      ],
      vocab: [
        { ru: "урбаниза́ция", translit: "urbanizatsiya", it: "urbanizzazione" },
        { ru: "населе́ние", translit: "naselenie", it: "popolazione" },
        { ru: "удво́иться", translit: "udvoit'sya", it: "raddoppiare" },
        { ru: "нехва́тка жилья́", translit: "nekhvatka zhil'ya", it: "carenza di alloggi" },
      ],
      grammar: {
        pattern: "В первую очередь (prima di tutto, in primo luogo)",
        explanation_it: "'В первую очередь' è un connettore di registro formale/scritto per introdurre il punto più importante o il primo di una lista: 'в первую очередь — нехватку жилья' (prima di tutto, la carenza di alloggi).",
        examples: ["В первую очередь нужно решить этот вопрос.","Он думает в первую очередь о семье.","В первую очередь это касается молодёжи."],
        exercise: { template: "___ — нехватку жилья и пробки. (prima di tutto)", options: ["В первую очередь","Во-первых просто","Сначала уже"], correct: 0, full_ru: "В первую очередь — нехватку жилья и пробки.", full_it: "Prima di tutto la carenza di alloggi e il traffico." },
      },
      quiz: { question: "Di quanto è cresciuta la popolazione in vent'anni?", options: ["È aumentata del 50%","È raddoppiata","È triplicata"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["лет.","двадцать","за","удвоилось","города","Население"], answer: "Население города удвоилось за двадцать лет.", answer_it: "La popolazione della città è raddoppiata in vent'anni." },
      translationDrills: [
        { prompt_it: "La popolazione è cresciuta.", answer_ru: "Население выросло." },
        { prompt_it: "C'è carenza di alloggi.", answer_ru: "Есть нехватка жилья." },
        { prompt_it: "Prima di tutto, il traffico.", answer_ru: "В первую очередь, пробки." },
      ],
      production: "Scrivi in russo un breve testo sull'urbanizzazione e i suoi effetti su una città che conosci.",
    },
  ],
  C2: [
    {
      id: "c2-1",
      title: "Ирония и намёк",
      subtitle: "Ironia e sottintesi",
      story: [
        { ru: "— Ну ты же понимаешь, что это была шутка?", it: "— Ma dai, capisci che era uno scherzo, no?" },
        { ru: "— Конечно понимаю, я же не вчера родился.", it: "— Certo che capisco, mica sono nato ieri." },
        { ru: "— А он-то думал, что мы поверим!", it: "— E lui pensava proprio che ci credessimo!" },
        { ru: "— Ладно, проехали. Давай к делу.", it: "— Va bene, lasciamo perdere. Veniamo al dunque." },
      ],
      vocab: [
        { ru: "же (particella)", translit: "zhe", it: "rafforza/richiama un'ovvietà condivisa" },
        { ru: "-то (particella)", translit: "-ta", it: "mette in risalto/contrasto un elemento" },
        { ru: "проехали", translit: "prayékhali", it: "lasciamo perdere (idiomatico)" },
        { ru: "к делу", translit: "k délu", it: "veniamo al dunque" },
      ],
      grammar: {
        pattern: "Particelle pragmatiche: же, -то, ведь",
        explanation_it:
          "Queste particelle non si traducono con una parola fissa: \"же\" richiama qualcosa di già condiviso o ovvio (\"ты же понимаешь\" = lo sai bene, no?); \"-то\" attaccato a una parola la mette in risalto o contrasto (\"он-то думал\" = lui, invece, pensava); \"ведь\" introduce una giustificazione implicita. Il loro uso naturale è ciò che distingue un parlante fluente da uno che traduce parola per parola.",
        examples: [
          "Ты же знаешь, что я не люблю опаздывать.",
          "Он-то думал, что мы поверим.",
          "Я ведь тебе говорил!",
        ],
        exercise: {
          template: "Ты ___ понимаешь, что это шутка? (lo sai bene, no?)",
          options: ["же", "-то", "ли"],
          correct: 0,
          full_ru: "Ты же понимаешь, что это шутка?",
          full_it: "Lo capisci bene che è uno scherzo, no?",
        },
      },
      quiz: {
        question: "'Он-то думал, что мы поверим' sottolinea che...",
        options: [
          "Tutti pensavano la stessa cosa",
          "Proprio lui, in particolare, lo pensava (in contrasto con gli altri)",
          "Nessuno ci ha creduto",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["делу.", "к", "Давай"],
        answer: "Давай к делу.",
        answer_it: "Veniamo al dunque.",
      },
      translationDrills: [
        { prompt_it: "Lo sai bene che ho ragione.", answer_ru: "Ты же знаешь, что я прав." },
        { prompt_it: "Te l'avevo detto!", answer_ru: "Я же тебе говорил!" },
        { prompt_it: "Lasciamo perdere, va bene?", answer_ru: "Проехали, ладно?" },
      ],
      production: "Scrivi un breve scambio ironico in russo usando almeno una particella (же, -то o ведь).",
    },
    {
      id: "c2-2",
      title: "Пословицы и мудрость",
      subtitle: "Proverbi e saggezza",
      story: [
        { ru: "— Как говорится, тише едешь — дальше будешь.", it: "— Come si dice, chi va piano va sano (letteralmente: più piano vai, più lontano arrivi)." },
        { ru: "— Легко сказать! У меня дедлайн через два дня.", it: "— Facile a dirsi! Ho una scadenza tra due giorni." },
        { ru: "— Ну, семь раз отмерь, один раз отрежь.", it: "— Beh, misura sette volte, taglia una (pensa bene prima di agire)." },
        { ru: "— Ладно, ты прав. Не буду торопиться.", it: "— Va bene, hai ragione. Non mi affretterò." },
      ],
      vocab: [
        { ru: "как говорится", translit: "kak gavarítsya", it: "come si dice, come recita il proverbio" },
        { ru: "тише едешь, дальше будешь", translit: "tíshe yédesh', dál'she búdesh'", it: "chi va piano va sano" },
        { ru: "семь раз отмерь, один раз отрежь", translit: "sem' raz atmér', adín raz atrézh'", it: "pensa bene prima di agire" },
        { ru: "торопиться", translit: "tarapít'sya", it: "affrettarsi" },
      ],
      grammar: {
        pattern: "Proverbi ed espressioni fisse: registro idiomatico",
        explanation_it:
          "I proverbi russi spesso usano forme verbali arcaiche o costruzioni imperative fisse che non si analizzano più grammaticalmente parola per parola: si imparano e si usano come blocchi interi, proprio come in italiano 'chi va piano va sano'. Riconoscerli (senza doverli tradurre letteralmente) è un segno di padronanza avanzata.",
        examples: [
          "Тише едешь, дальше будешь.",
          "Семь раз отмерь, один раз отрежь.",
          "Как говорится...",
        ],
        exercise: {
          template: "Не буду ___. (non mi affretterò)",
          options: ["торопиться", "торопится", "торопить"],
          correct: 0,
          full_ru: "Не буду торопиться.",
          full_it: "Non mi affretterò.",
        },
      },
      quiz: {
        question: "'Семь раз отмерь, один раз отрежь' consiglia di...",
        options: [
          "Agire d'impulso",
          "Riflettere bene prima di agire",
          "Misurare esattamente sette volte in cucina",
        ],
        correct: 1,
      },
      sentenceBuilder: {
        instruction_it: "Metti le parole in ordine.",
        tokens: ["прав.", "Ты"],
        answer: "Ты прав.",
        answer_it: "Hai ragione.",
      },
      translationDrills: [
        { prompt_it: "Come si dice...", answer_ru: "Как говорится..." },
        { prompt_it: "Ho una scadenza domani.", answer_ru: "У меня дедлайн завтра." },
        { prompt_it: "Non affrettarti, pensaci bene.", answer_ru: "Не торопись, подумай хорошо." },
      ],
      production: "Usa un proverbio russo in una frase tua, spiegando in italiano quando lo useresti.",
    },
    {
      id: "c2-3",
      title: "Игра слов",
      subtitle: "Il gioco di parole",
      story: [
        { ru: "— Он мастер каламбуров, ты заметил?", it: "— È un maestro dei giochi di parole, l'hai notato?" },
        { ru: "— Да уж, иной раз и не поймёшь сразу.", it: "— Eccome, a volte non capisci subito." },
        { ru: "— В этом и вся соль его юмора.", it: "— È proprio questo il sale del suo umorismo." },
        { ru: "— Согласен, тонкая работа.", it: "— Concordo, un lavoro raffinato." },
      ],
      vocab: [
        { ru: "каламбу́р", translit: "kalambur", it: "gioco di parole, calembour" },
        { ru: "ино́й раз", translit: "inoy raz", it: "a volte (colloquiale, letterario)" },
        { ru: "соль ю́мора", translit: "sol' yumora", it: "il sale (l'essenza) dell'umorismo" },
        { ru: "то́нкая рабо́та", translit: "tonkaya rabota", it: "lavoro raffinato, sottile" },
      ],
      grammar: {
        pattern: "Да уж (particella di conferma rafforzata, colloquiale)",
        explanation_it: "'Да уж' rafforza un assenso con una sfumatura di rassegnazione o enfasi ironica: 'да уж, иной раз и не поймёшь' (eccome, a volte non capisci proprio). Diverso dal semplice 'да', porta più carattere colloquiale.",
        examples: ["Да уж, это точно.","Да уж, бывает.","Да уж, ты прав."],
        exercise: { template: "___, иной раз и не поймёшь сразу. (eccome)", options: ["Да уж","Да ладно","Ну да"], correct: 0, full_ru: "Да уж, иной раз и не поймёшь сразу.", full_it: "Eccome, a volte non capisci subito." },
      },
      quiz: { question: "Cosa costituisce 'il sale' dell'umorismo di questa persona, secondo il dialogo?", options: ["Le battute volgari","I giochi di parole non immediati","Le imitazioni"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["работа.","Тонкая"], answer: "Тонкая работа.", answer_it: "Un lavoro raffinato." },
      translationDrills: [
        { prompt_it: "Eccome, è vero.", answer_ru: "Да уж, это правда." },
        { prompt_it: "È un maestro dei giochi di parole.", answer_ru: "Он мастер каламбуров." },
        { prompt_it: "Un lavoro sottile.", answer_ru: "Тонкая работа." },
      ],
      production: "Scrivi in russo un breve scambio di battute che gioca sul doppio senso di una parola.",
    },
    {
      id: "c2-4",
      title: "Тонкости бюрократии",
      subtitle: "Le sottigliezze burocratiche",
      story: [
        { ru: "— Опять нужна справка, которой у меня нет.", it: "— Di nuovo serve un certificato che non ho." },
        { ru: "— Добро пожаловать в мир бюрократии.", it: "— Benvenuto nel mondo della burocrazia." },
        { ru: "— И где, скажите на милость, её взять?", it: "— E dove, di grazia, la si può prendere?" },
        { ru: "— В соседнем окошке, но там перерыв до трёх.", it: "— Allo sportello accanto, ma lì c'è la pausa fino alle tre." },
      ],
      vocab: [
        { ru: "спра́вка", translit: "spravka", it: "certificato, attestato" },
        { ru: "скажи́те на ми́лость", translit: "skazhite na milast'", it: "di grazia, per favore (ironico)" },
        { ru: "око́шко", translit: "okoshka", it: "sportello (diminutivo di окно)" },
        { ru: "переры́в", translit: "pereryv", it: "pausa, intervallo" },
      ],
      grammar: {
        pattern: "Скажите на милость (espressione ironica di esasperazione)",
        explanation_it: "'Скажите на милость' è un'espressione arcaica/ironica usata per esprimere esasperazione mentre si fa una domanda retorica: 'где, скажите на милость, её взять?' (e dove, di grazia, la si prende?). Tipica del registro letterario-colloquiale.",
        examples: ["Скажите на милость, кто это придумал?","И зачем, скажите на милость, это нужно?","Скажите на милость, сколько можно ждать?"],
        exercise: { template: "И где, ___ на милость, её взять? (di grazia)", options: ["скажите","сказать","говорите"], correct: 0, full_ru: "И где, скажите на милость, её взять?", full_it: "E dove, di grazia, la si può prendere?" },
      },
      quiz: { question: "Quando riapre lo sportello, secondo il dialogo?", options: ["Alle due","Alle tre","Non riapre oggi"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["бюрократии.","мир","в","пожаловать","Добро"], answer: "Добро пожаловать в мир бюрократии.", answer_it: "Benvenuto nel mondo della burocrazia." },
      translationDrills: [
        { prompt_it: "Serve un certificato.", answer_ru: "Нужна справка." },
        { prompt_it: "Lo sportello è chiuso.", answer_ru: "Окошко закрыто." },
        { prompt_it: "C'è una pausa fino alle tre.", answer_ru: "Перерыв до трёх." },
      ],
      production: "Scrivi in russo un breve sfogo ironico su un'esperienza burocratica.",
    },
    {
      id: "c2-5",
      title: "Аллюзии и отсылки",
      subtitle: "Allusioni e riferimenti",
      story: [
        { ru: "— Ты уловил отсылку к классику в его речи?", it: "— Hai colto il riferimento al classico nel suo discorso?" },
        { ru: "— Не сразу, но потом дошло.", it: "— Non subito, ma poi ho capito." },
        { ru: "— Он любит вплетать такие аллюзии.", it: "— Gli piace intrecciare queste allusioni." },
        { ru: "— Это придаёт его текстам особый шарм.", it: "— Questo dà ai suoi testi un fascino particolare." },
      ],
      vocab: [
        { ru: "отсы́лка", translit: "otsylka", it: "riferimento, rimando (letterario)" },
        { ru: "дойти́ (перен.)", translit: "doyti", it: "arrivare, capire (in senso figurato: 'mi è arrivato/ho capito')" },
        { ru: "вплета́ть", translit: "vpletat'", it: "intrecciare, intessere" },
        { ru: "придава́ть шарм", translit: "pridavat' sharm", it: "dare fascino" },
      ],
      grammar: {
        pattern: "Дойти в senso figurato (capire, 'arrivare' un concetto)",
        explanation_it: "'Дойти' (arrivare) si usa in senso figurato per dire che un'idea è stata compresa, spesso dopo un ritardo: 'не сразу, но потом дошло' (non subito, ma poi ho capito/mi è arrivato). Molto colloquiale ma elegante nel registro giusto.",
        examples: ["Сначала не понял, но потом дошло.","До меня дошло только сейчас.","Шутка дошла не сразу."],
        exercise: { template: "Не сразу, но потом ___. (ho capito)", options: ["дошло","дошёл","доходить"], correct: 0, full_ru: "Не сразу, но потом дошло.", full_it: "Non subito, ma poi ho capito." },
      },
      quiz: { question: "Cosa dà ai testi dell'autore un fascino particolare?", options: ["Il linguaggio semplice","Le allusioni intrecciate","Le descrizioni lunghe"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["классику.","к","отсылку","уловил","Ты"], answer: "Ты уловил отсылку к классику.", answer_it: "Hai colto il riferimento al classico." },
      translationDrills: [
        { prompt_it: "Non ho capito subito.", answer_ru: "Я не сразу понял." },
        { prompt_it: "Gli piace intrecciare riferimenti.", answer_ru: "Он любит вплетать отсылки." },
        { prompt_it: "Dà fascino al testo.", answer_ru: "Это придаёт тексту шарм." },
      ],
      production: "Scrivi in russo un breve testo che allude, senza dirlo esplicitamente, a un'opera o un autore famoso.",
    },
    {
      id: "c2-6",
      title: "Полемика в прессе",
      subtitle: "La polemica sulla stampa",
      story: [
        { ru: "— Статья вызвала бурную полемику.", it: "— L'articolo ha scatenato una polemica accesa." },
        { ru: "— Автора обвинили в передёргивании фактов.", it: "— L'autore è stato accusato di distorcere i fatti." },
        { ru: "— А он что, отмалчивается?", it: "— E lui, se ne sta zitto?" },
        { ru: "— Пока да, но, видимо, готовит ответ.", it: "— Per ora sì, ma a quanto pare sta preparando una risposta." },
      ],
      vocab: [
        { ru: "бу́рная поле́мика", translit: "burnaya polemika", it: "polemica accesa" },
        { ru: "передёргивание фа́ктов", translit: "peredyorgivanie faktov", it: "distorsione dei fatti" },
        { ru: "отма́лчиваться", translit: "atmalchivat'sya", it: "starsene zitto (deliberatamente, di fronte a critiche)" },
        { ru: "ви́димо", translit: "vidima", it: "a quanto pare, apparentemente" },
      ],
      grammar: {
        pattern: "Отмалчиваться — verbo riflessivo per 'tacere deliberatamente'",
        explanation_it: "'Отмалчиваться' non è il semplice 'молчать' (tacere), ma implica un silenzio scelto come strategia, spesso di fronte a domande scomode o accuse: 'он отмалчивается' (lui se ne sta zitto apposta, evita di rispondere).",
        examples: ["Он отмалчивается на все вопросы.","Не стоит отмалчиваться в такой ситуации.","Она отмолчалась и ушла."],
        exercise: { template: "А он что, ___? (se ne sta zitto)", options: ["отмалчивается","молчит","замолчал"], correct: 0, full_ru: "А он что, отмалчивается?", full_it: "E lui, se ne sta zitto?" },
      },
      quiz: { question: "Di cosa è stato accusato l'autore dell'articolo?", options: ["Plagio","Distorsione dei fatti","Diffamazione"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["полемику.","бурную","вызвала","Статья"], answer: "Статья вызвала бурную полемику.", answer_it: "L'articolo ha scatenato una polemica accesa." },
      translationDrills: [
        { prompt_it: "L'articolo ha scatenato polemiche.", answer_ru: "Статья вызвала полемику." },
        { prompt_it: "Se ne sta zitto apposta.", answer_ru: "Он специально отмалчивается." },
        { prompt_it: "Sta preparando una risposta.", answer_ru: "Он готовит ответ." },
      ],
      production: "Scrivi in russo un breve resoconto di una polemica immaginaria sulla stampa.",
    },
    {
      id: "c2-7",
      title: "Ирония судьбы",
      subtitle: "L'ironia della sorte",
      story: [
        { ru: "— Ирония в том, что он сам когда-то критиковал эту идею.", it: "— L'ironia è che lui stesso un tempo criticava questa idea." },
        { ru: "— Вот уж действительно, как говорится, обжёгся на молоке.", it: "— Ecco, davvero, come si dice, chi si scotta col latte..." },
        { ru: "— Теперь дует и на воду.", it: "— Ora soffia anche sull'acqua." },
        { ru: "— Жизнь всё расставляет по местам.", it: "— La vita mette tutto al proprio posto." },
      ],
      vocab: [
        { ru: "ирония судьбы", translit: "ironiya sud'by", it: "ironia della sorte" },
        { ru: "как говори́тся", translit: "kak gavaritsya", it: "come si dice" },
        { ru: "обже́чься на молоке́, ду́ть на во́ду", translit: "obzhech'sya na malake, dut' na vodu", it: "scottarsi col latte e soffiare sull'acqua (chi scotta si scotta, poi ha paura anche di ciò che è freddo)" },
        { ru: "расста́вить по места́м", translit: "rasstavit' pa mestam", it: "mettere ogni cosa al proprio posto" },
      ],
      grammar: {
        pattern: "Proverbio idiomatico: обжёгся на молоке — дует и на воду",
        explanation_it: "Questo proverbio (equivalente a 'chi si scotta con l'acqua calda ha paura anche di quella fredda') descrive chi, dopo una brutta esperienza, diventa eccessivamente cauto anche in situazioni innocue. Si usa spesso in forma abbreviata, citando solo una parte.",
        examples: ["Обжёгся на молоке — дует и на воду.","Он обжёгся один раз и теперь осторожен во всём.","Как говорится, обжёгся на молоке."],
        exercise: { template: "Теперь дует и ___ воду. (su)", options: ["на","в","с"], correct: 0, full_ru: "Теперь дует и на воду.", full_it: "Ora soffia anche sull'acqua." },
      },
      quiz: { question: "Qual è il senso del proverbio citato nel dialogo?", options: ["La fretta è cattiva consigliera","Chi si scotta diventa eccessivamente cauto","Il tempo guarisce tutto"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["местам.","по","расставляет","всё","Жизнь"], answer: "Жизнь всё расставляет по местам.", answer_it: "La vita mette tutto al proprio posto." },
      translationDrills: [
        { prompt_it: "È proprio un'ironia della sorte.", answer_ru: "Это настоящая ирония судьбы." },
        { prompt_it: "Come si dice.", answer_ru: "Как говорится." },
        { prompt_it: "La vita sistema tutto.", answer_ru: "Жизнь всё расставляет." },
      ],
      production: "Scrivi in russo una situazione ironica in cui qualcuno finisce per fare ciò che criticava.",
    },
    {
      id: "c2-8",
      title: "Стилистические регистры",
      subtitle: "I registri stilistici",
      story: [
        { ru: "— Заметь, как меняется его речь в зависимости от собеседника.", it: "— Nota come cambia il suo modo di parlare a seconda dell'interlocutore." },
        { ru: "— Да, с начальством — сама официальность.", it: "— Sì, coi superiori è la formalità in persona." },
        { ru: "— А с друзьями — совсем другое дело.", it: "— E con gli amici è tutta un'altra storia." },
        { ru: "— Гибкость регистра — признак хорошего чувства языка.", it: "— La flessibilità di registro è segno di un buon senso della lingua." },
      ],
      vocab: [
        { ru: "в зави́симости от", translit: "v zavisimasti at", it: "a seconda di" },
        { ru: "нача́льство", translit: "nachal'stva", it: "i superiori, la dirigenza" },
        { ru: "ги́бкость", translit: "gibkost'", it: "flessibilità" },
        { ru: "чу́вство языка́", translit: "chuvstva yazyka", it: "senso della lingua, orecchio linguistico" },
      ],
      grammar: {
        pattern: "Сама + sostantivo astratto (essere 'l'incarnazione di')",
        explanation_it: "'Сама официальность' (letteralmente 'lei stessa la formalità') usa 'сам/сама' + sostantivo astratto per enfatizzare che qualcosa incarna perfettamente quella qualità: un modo elegante e intensivo di dire 'estremamente formale'.",
        examples: ["Она сама доброта.","Он сама вежливость.","Это сама простота."],
        exercise: { template: "С начальством — ___ официальность. (l'incarnazione di)", options: ["сама","самая","сам"], correct: 0, full_ru: "С начальством — сама официальность.", full_it: "Coi superiori è la formalità in persona." },
      },
      quiz: { question: "Cosa è considerato segno di un buon senso della lingua nel dialogo?", options: ["Parlare velocemente","La flessibilità di registro","Usare parole difficili"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["собеседника.","от","зависимости","в","речь","меняется","его"], answer: "Его речь меняется в зависимости от собеседника.", answer_it: "Il suo modo di parlare cambia a seconda dell'interlocutore." },
      translationDrills: [
        { prompt_it: "È la gentilezza in persona.", answer_ru: "Она сама доброта." },
        { prompt_it: "Cambia registro con gli amici.", answer_ru: "Он меняет регистр с друзьями." },
        { prompt_it: "È un segno di flessibilità.", answer_ru: "Это признак гибкости." },
      ],
      production: "Scrivi in russo un esempio di come cambi il tuo modo di parlare a seconda della persona con cui parli.",
    },
    {
      id: "c2-9",
      title: "Скрытый смысл рекламы",
      subtitle: "Il senso nascosto della pubblicità",
      story: [
        { ru: "— Заметил, на что намекает этот слоган?", it: "— Hai notato a cosa allude questo slogan?" },
        { ru: "— Прямым текстом не скажут, но подтекст ясен.", it: "— Non lo dicono esplicitamente, ma il sottotesto è chiaro." },
        { ru: "— Играют на чувстве упущенной выгоды.", it: "— Giocano sul senso di occasione mancata." },
        { ru: "— Классический приём, но всё ещё работает.", it: "— È una tecnica classica, ma funziona ancora." },
      ],
      vocab: [
        { ru: "намека́ть на", translit: "namekat' na", it: "alludere a" },
        { ru: "прямы́м те́кстом", translit: "pryamym tekstam", it: "esplicitamente, a chiare lettere" },
        { ru: "подте́кст", translit: "padtekst", it: "sottotesto" },
        { ru: "упу́щенная вы́года", translit: "upushchennaya vygoda", it: "occasione mancata, opportunità persa" },
      ],
      grammar: {
        pattern: "Прямым текстом (esplicitamente, letteralmente)",
        explanation_it: "'Прямым текстом' (letteralmente 'con testo diretto') significa dire qualcosa senza giri di parole, in modo esplicito: 'прямым текстом не скажут' (non lo dicono esplicitamente). Contrapposto a 'намекать' (alludere).",
        examples: ["Скажи прямым текстом, что думаешь.","Он не сказал прямым текстом, но все поняли.","Прямым текстом это нигде не написано."],
        exercise: { template: "___ текстом не скажут, но подтекст ясен. (esplicitamente)", options: ["Прямым","Прямо","Прямой"], correct: 0, full_ru: "Прямым текстом не скажут, но подтекст ясен.", full_it: "Non lo dicono esplicitamente, ma il sottotesto è chiaro." },
      },
      quiz: { question: "Su quale sentimento gioca lo slogan, secondo il dialogo?", options: ["La paura","Il senso di occasione mancata","L'orgoglio"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["ясен.","подтекст","но"], answer: "Но подтекст ясен.", answer_it: "Ma il sottotesto è chiaro." },
      translationDrills: [
        { prompt_it: "Il sottotesto è chiaro.", answer_ru: "Подтекст ясен." },
        { prompt_it: "Non l'ha detto esplicitamente.", answer_ru: "Он не сказал прямым текстом." },
        { prompt_it: "Allude a qualcosa.", answer_ru: "Он на что-то намекает." },
      ],
      production: "Scrivi in russo un breve slogan pubblicitario con un sottotesto nascosto, e spiega il suo vero significato.",
    },
    {
      id: "c2-10",
      title: "Непереводимые слова",
      subtitle: "Le parole intraducibili",
      story: [
        { ru: "— Как бы ты перевёл слово 'тоска' на итальянский?", it: "— Come tradurresti la parola 'toska' in italiano?" },
        { ru: "— Сложно, у нас нет точного эквивалента.", it: "— Difficile, non abbiamo un equivalente esatto." },
        { ru: "— Вот именно, в этом вся прелесть языка.", it: "— Esatto, è proprio questo il fascino della lingua." },
        { ru: "— Некоторые вещи просто нужно прочувствовать.", it: "— Certe cose bisogna semplicemente sentirle dentro." },
      ],
      vocab: [
        { ru: "непереводи́мый", translit: "neperevadimy", it: "intraducibile" },
        { ru: "эквивале́нт", translit: "ekvivalent", it: "equivalente" },
        { ru: "вот и́менно", translit: "vot imenna", it: "esatto, proprio così" },
        { ru: "прочу́вствовать", translit: "prachustvavat'", it: "sentire profondamente, provare fino in fondo" },
      ],
      grammar: {
        pattern: "Вот именно (esatto, proprio così — conferma enfatica)",
        explanation_it: "'Вот именно' è un'espressione di conferma enfatica, usata quando l'interlocutore ha colto esattamente il punto: 'вот именно, в этом вся прелесть' (esatto, è proprio questo il fascino). Più incisivo del semplice 'да, точно'.",
        examples: ["Вот именно об этом я и говорю.","Вот именно, ты прав.","Вот именно поэтому я и спросил."],
        exercise: { template: "___, в этом вся прелесть языка. (esatto)", options: ["Вот именно","Вот так","Вот бы"], correct: 0, full_ru: "Вот именно, в этом вся прелесть языка.", full_it: "Esatto, è proprio questo il fascino della lingua." },
      },
      quiz: { question: "Cosa suggerisce l'ultima battuta del dialogo su parole come 'тоска'?", options: ["Vanno studiate a memoria","Vanno sentite/provate, non solo tradotte","Non hanno importanza"], correct: 1 },
      sentenceBuilder: { instruction_it: "Metti le parole in ordine.", tokens: ["эквивалента.","точного","нас","нет","у"], answer: "У нас нет точного эквивалента.", answer_it: "Non abbiamo un equivalente esatto." },
      translationDrills: [
        { prompt_it: "Non ha un equivalente esatto.", answer_ru: "У этого нет точного эквивалента." },
        { prompt_it: "Bisogna sentirlo dentro.", answer_ru: "Это нужно прочувствовать." },
        { prompt_it: "Esatto, hai ragione.", answer_ru: "Вот именно, ты прав." },
      ],
      production: "Scrivi in russo un'altra parola russa che consideri difficile da tradurre e prova a spiegarne il senso.",
    },
  ],
};

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=PT+Sans:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap');";

const MATRYOSHKA_SILHOUETTE_SVG = `
<svg width="120" height="160" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 8 C70 8 76 18 74 28 C92 40 102 62 102 88 C102 122 84 152 60 152 C36 152 18 122 18 88 C18 62 28 40 46 28 C44 18 50 8 60 8 Z"
        fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <path d="M40 66 C40 60 48 56 60 56 C72 56 80 60 80 66" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="49" cy="80" r="3.2" fill="white"/>
  <circle cx="71" cy="80" r="3.2" fill="white"/>
  <path d="M48 96 Q60 106 72 96" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M30 112 C42 122 78 122 90 112" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
</svg>`.trim();

const MATRYOSHKA_PATTERN_URI = "data:image/svg+xml," + encodeURIComponent(MATRYOSHKA_SILHOUETTE_SVG);

// ---------- Storage helpers ----------

// Percorsi sempre relativi: in sviluppo il proxy di Vite (vite.config.js) inoltra
// /api al backend su localhost:3001; in produzione frontend e backend sono
// serviti dallo stesso dominio. Nessuna variabile d'ambiente da configurare.
const API_BASE = "";

// L'app riconosce da sola l'ambiente in cui gira: se è aperta come artifact
// dentro Claude.ai (dove esiste window.storage), usa quel meccanismo; se gira
// come app standalone pubblicata (nessun window.storage), usa il backend reale.
const IS_ARTIFACT_ENV = typeof window !== "undefined" && !!window.storage;

async function loadJSON(key, fallback) {
  try {
    if (IS_ARTIFACT_ENV) {
      const res = await window.storage.get(key);
      return res ? JSON.parse(res.value) : fallback;
    }
    const res = await fetch(`${API_BASE}/api/storage/${encodeURIComponent(key)}`);
    if (!res.ok) return fallback;
    const data = await res.json();
    return data ? JSON.parse(data.value) : fallback;
  } catch {
    return fallback;
  }
}
async function saveJSON(key, value) {
  try {
    if (IS_ARTIFACT_ENV) {
      const res = await window.storage.set(key, JSON.stringify(value));
      return !!res;
    }
    const res = await fetch(`${API_BASE}/api/storage/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: JSON.stringify(value) }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ---------- Audio helpers ----------

const TTS_SUPPORTED = typeof window !== "undefined" && !!window.speechSynthesis;
const SPEECH_RECOGNITION_SUPPORTED =
  typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

function pickBestVoice(voices) {
  const ruVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("ru"));
  if (!ruVoices.length) return null;
  const priority = ["google", "natural", "neural", "online", "milena", "yuri", "irina", "pavel", "elena", "microsoft"];
  for (const term of priority) {
    const match = ruVoices.find((v) => v.name.toLowerCase().includes(term));
    if (match) return match;
  }
  return ruVoices[0];
}

function getRuVoices() {
  if (!TTS_SUPPORTED) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith("ru"));
}

function speak(text, opts = {}) {
  if (!TTS_SUPPORTED) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = opts.rate || 0.92;
  utter.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  let voice = null;
  if (opts.voiceURI) voice = voices.find((v) => v.voiceURI === opts.voiceURI);
  if (!voice) voice = pickBestVoice(voices);
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

const ELEVENLABS_DEFAULT_VOICE = "21m00Tcm4TlvDq8ikWAM"; // "Rachel", multilingual, supports Russian

async function speakPremium(text, apiKey, voiceId) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || ELEVENLABS_DEFAULT_VOICE}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.3, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    const msg = res.status === 401 ? "Chiave API non valida." : `Errore audio (${res.status}).`;
    throw new Error(msg);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  await audio.play();
  audio.onended = () => URL.revokeObjectURL(url);
}

async function playAudio(text, { ttsSettings, premium }, onError) {
  if (premium && premium.enabled && premium.apiKey) {
    try {
      await speakPremium(text, premium.apiKey, premium.voiceId);
      return;
    } catch (e) {
      onError && onError(e.message);
      // non ci fermiamo qui: proviamo comunque la voce gratuita di riserva
    }
  }
  speak(text, ttsSettings);
}

const LEVEL_RATE = {
  A1: 0.72,
  A2: 0.78,
  B1: 0.9,
  B2: 0.96,
  C1: 1.05,
  C2: 1.1,
};

function levelFromId(id) {
  if (!id) return null;
  const m = /^([abc][12])/i.exec(id);
  return m ? m[1].toUpperCase() : null;
}

function rateForLevel(id, fallbackRate) {
  const lvl = levelFromId(id);
  return lvl && LEVEL_RATE[lvl] ? LEVEL_RATE[lvl] : fallbackRate;
}

function stripAccentMarks(s) {
  return typeof s === "string" ? s.replace(/\u0301/g, "") : s;
}

function pickRandom(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleOnce(tokens) {
  if (!tokens) return [];
  const arr = tokens.map((t, i) => ({ t, i }));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeText(s) {
  return s
    .toLowerCase()
    .replace(/[.,!?;:"'«»—-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function similarity(a, b) {
  const na = normalizeText(a),
    nb = normalizeText(b);
  const dist = levenshtein(na, nb);
  const len = Math.max(na.length, nb.length, 1);
  return Math.max(0, 1 - dist / len);
}

function startPronunciationCheck(target, onUpdate) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    onUpdate({ status: "unsupported" });
    return;
  }
  onUpdate({ status: "listening" });
  const rec = new SR();
  rec.lang = "ru-RU";
  rec.maxAlternatives = 1;
  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const score = similarity(transcript, target);
    onUpdate({ status: "done", transcript, score });
  };
  rec.onerror = (e) => {
    onUpdate({ status: e.error === "not-allowed" ? "denied" : "error" });
  };
  try {
    rec.start();
  } catch {
    onUpdate({ status: "error" });
  }
}


const LEVEL_DESCRIPTIONS = {
  A1: "principiante assoluto: presente indicativo, frasi brevi, lessico quotidiano di base",
  A2: "elementare: passato/futuro semplice, casi grammaticali di base, situazioni pratiche (negozi, viaggi, lavoro semplice)",
  B1: "intermedio: aspetto verbale, condizionale, frasi relative con который, argomenti di vita quotidiana e opinioni semplici",
  B2: "intermedio alto: discorso indiretto, sfumature di aspetto, frasi relative complesse, argomenti astratti e professionali",
  C1: "avanzato: participi e gerundi, concessive, connettori di discorso, registro formale/informale",
  C2: "madrelingua: particelle pragmatiche (же, -то, ведь), idiomi, proverbi, ironia, registro letterario",
};

const CASE_INFO = {
  Именительный: { name_it: "Nominativo", it: "chi? cosa? (soggetto)", ru: "Кто? Что?" },
  Родительный: { name_it: "Genitivo", it: "di chi? di cosa? (anche dopo 'нет')", ru: "Кого? Чего?" },
  Дательный: { name_it: "Dativo", it: "a chi? a cosa?", ru: "Кому? Чему?" },
  Винительный: { name_it: "Accusativo", it: "chi? cosa? (oggetto diretto)", ru: "Кого? Что?" },
  Творительный: { name_it: "Strumentale", it: "con chi? con cosa?", ru: "Кем? Чем?" },
  Предложный: { name_it: "Prepositivo", it: "di chi/cosa (con о/в/на)", ru: "О ком? О чём?" },
};

function ex(ru_aff, it_aff, ru_neg, it_neg, ru_int, it_int) {
  return {
    aff: { ru: ru_aff, it: it_aff },
    neg: { ru: ru_neg, it: it_neg },
    int: { ru: ru_int, it: it_int },
  };
}

const DECLENSIONS = {
  A1: [
    {
      word: "стол",
      meaning_it: "tavolo",
      note_it: "Sostantivo maschile, tema duro — la declinazione più regolare, base di partenza.",
      cases: [
        { case: "Именительный", form: "стол", examples: ex("Это мой стол.", "Questo è il mio tavolo.", "Это не мой стол.", "Questo non è il mio tavolo.", "Это твой стол?", "Questo è il tuo tavolo?") },
        { case: "Родительный", form: "стола\u0301", examples: ex("Возле стола стоит стул.", "Vicino al tavolo c'è una sedia.", "Возле стола нет стула.", "Vicino al tavolo non c'è una sedia.", "Что находится возле стола?", "Cosa si trova vicino al tavolo?") },
        { case: "Дательный", form: "столу\u0301", examples: ex("Я иду к столу.", "Vado verso il tavolo.", "Я не иду к столу.", "Non vado verso il tavolo.", "Ты идёшь к столу?", "Vai verso il tavolo?") },
        { case: "Винительный", form: "стол", examples: ex("Я вижу стол.", "Vedo il tavolo.", "Я не вижу стол.", "Non vedo il tavolo.", "Ты видишь стол?", "Vedi il tavolo?") },
        { case: "Творительный", form: "столо\u0301м", examples: ex("Под столом лежит кот.", "Sotto il tavolo c'è un gatto.", "Под столом нет кота.", "Sotto il tavolo non c'è un gatto.", "Что лежит под столом?", "Cosa c'è sotto il tavolo?") },
        { case: "Предложный", form: "столе\u0301", examples: ex("Книга лежит на столе.", "Il libro è sul tavolo.", "Книги нет на столе.", "Il libro non è sul tavolo.", "Что лежит на столе?", "Cosa c'è sul tavolo?") },
      ],
    },
    {
      word: "ча́й",
      meaning_it: "tè",
      note_it: "Sostantivo maschile monosillabico, tema duro — accento fisso sulla radice in tutti i casi.",
      cases: [
        { case: "Именительный", form: "ча́й", examples: ex("Это ча́й.", "Questo è un tè.", "Это не ча́й.", "Questo non è un tè.", "Это ча́й?", "È un tè?") },
        { case: "Родительный", form: "ча́я", examples: ex("Я знаю смысл ча́я.", "Conosco il senso del tè.", "Я не знаю смысл ча́я.", "Non conosco il senso del tè.", "Ты знаешь смысл ча́я?", "Conosci il senso del tè?") },
        { case: "Дательный", form: "ча́ю", examples: ex("Я рад ча́ю.", "Sono contento del tè.", "Я не рад ча́ю.", "Non sono contento del tè.", "Ты рад ча́ю?", "Sei contento del tè?") },
        { case: "Винительный", form: "ча́й", examples: ex("Я вижу ча́й.", "Vedo un tè.", "Я не вижу ча́й.", "Non vedo un tè.", "Ты видишь ча́й?", "Vedi un tè?") },
        { case: "Творительный", form: "ча́ем", examples: ex("Он доволен ча́ем.", "Lui è soddisfatto del tè.", "Он не доволен ча́ем.", "Lui non è soddisfatto del tè.", "Он доволен ча́ем?", "Lui è soddisfatto del tè?") },
        { case: "Предложный", form: "ча́е", examples: ex("Мы говорим о ча́е.", "Parliamo del tè.", "Мы не говорим о ча́е.", "Non parliamo del tè.", "Вы говорите о ча́е?", "Parlate del tè?") },
      ],
    },
    {
      word: "молоко́",
      meaning_it: "latte",
      note_it: "Sostantivo neutro, tema duro — accento sempre sull'ultima sillaba.",
      cases: [
        { case: "Именительный", form: "молоко́", examples: ex("Это молоко́.", "Questo è un latte.", "Это не молоко́.", "Questo non è un latte.", "Это молоко́?", "È un latte?") },
        { case: "Родительный", form: "молока́", examples: ex("Я знаю смысл молока́.", "Conosco il senso del latte.", "Я не знаю смысл молока́.", "Non conosco il senso del latte.", "Ты знаешь смысл молока́?", "Conosci il senso del latte?") },
        { case: "Дательный", form: "молоку́", examples: ex("Я рад молоку́.", "Sono contento del latte.", "Я не рад молоку́.", "Non sono contento del latte.", "Ты рад молоку́?", "Sei contento del latte?") },
        { case: "Винительный", form: "молоко́", examples: ex("Я вижу молоко́.", "Vedo un latte.", "Я не вижу молоко́.", "Non vedo un latte.", "Ты видишь молоко́?", "Vedi un latte?") },
        { case: "Творительный", form: "молоко́м", examples: ex("Он доволен молоко́м.", "Lui è soddisfatto del latte.", "Он не доволен молоко́м.", "Lui non è soddisfatto del latte.", "Он доволен молоко́м?", "Lui è soddisfatto del latte?") },
        { case: "Предложный", form: "молоке́", examples: ex("Мы говорим о молоке́.", "Parliamo del latte.", "Мы не говорим о молоке́.", "Non parliamo del latte.", "Вы говорите о молоке́?", "Parlate del latte?") },
      ],
    },
    {
      word: "соба́ка",
      meaning_it: "cane",
      note_it: "Sostantivo femminile in -a, tema duro — stessa declinazione di книга, accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "соба́ка", examples: ex("Это соба́ка.", "Questo è un cane.", "Это не соба́ка.", "Questo non è un cane.", "Это соба́ка?", "È un cane?") },
        { case: "Родительный", form: "соба́ки", examples: ex("Я знаю смысл соба́ки.", "Conosco il senso del cane.", "Я не знаю смысл соба́ки.", "Non conosco il senso del cane.", "Ты знаешь смысл соба́ки?", "Conosci il senso del cane?") },
        { case: "Дательный", form: "соба́ке", examples: ex("Я рад соба́ке.", "Sono contento del cane.", "Я не рад соба́ке.", "Non sono contento del cane.", "Ты рад соба́ке?", "Sei contento del cane?") },
        { case: "Винительный", form: "соба́ку", examples: ex("Я вижу соба́ку.", "Vedo un cane.", "Я не вижу соба́ку.", "Non vedo un cane.", "Ты видишь соба́ку?", "Vedi un cane?") },
        { case: "Творительный", form: "соба́кой", examples: ex("Он доволен соба́кой.", "Lui è soddisfatto del cane.", "Он не доволен соба́кой.", "Lui non è soddisfatto del cane.", "Он доволен соба́кой?", "Lui è soddisfatto del cane?") },
        { case: "Предложный", form: "соба́ке", examples: ex("Мы говорим о соба́ке.", "Parliamo del cane.", "Мы не говорим о соба́ке.", "Non parliamo del cane.", "Вы говорите о соба́ке?", "Parlate del cane?") },
      ],
    },
    {
      word: "хлеб",
      meaning_it: "pane",
      note_it: "Sostantivo maschile, tema duro — accento fisso sulla radice in tutti i casi obliqui.",
      cases: [
        { case: "Именительный", form: "хлеб", examples: ex("Это хлеб.", "Questo è un pane.", "Это не хлеб.", "Questo non è un pane.", "Это хлеб?", "È un pane?") },
        { case: "Родительный", form: "хле́ба", examples: ex("Я знаю смысл хле́ба.", "Conosco il senso del pane.", "Я не знаю смысл хле́ба.", "Non conosco il senso del pane.", "Ты знаешь смысл хле́ба?", "Conosci il senso del pane?") },
        { case: "Дательный", form: "хле́бу", examples: ex("Я рад хле́бу.", "Sono contento del pane.", "Я не рад хле́бу.", "Non sono contento del pane.", "Ты рад хле́бу?", "Sei contento del pane?") },
        { case: "Винительный", form: "хлеб", examples: ex("Я вижу хлеб.", "Vedo un pane.", "Я не вижу хлеб.", "Non vedo un pane.", "Ты видишь хлеб?", "Vedi un pane?") },
        { case: "Творительный", form: "хле́бом", examples: ex("Он доволен хле́бом.", "Lui è soddisfatto del pane.", "Он не доволен хле́бом.", "Lui non è soddisfatto del pane.", "Он доволен хле́бом?", "Lui è soddisfatto del pane?") },
        { case: "Предложный", form: "хле́бе", examples: ex("Мы говорим о хле́бе.", "Parliamo del pane.", "Мы не говорим о хле́бе.", "Non parliamo del pane.", "Вы говорите о хле́бе?", "Parlate del pane?") },
      ],
    },
    {
      word: "ру́чка",
      meaning_it: "penna",
      note_it: "Sostantivo femminile in -a, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "ру́чка", examples: ex("Это ру́чка.", "Questo è una penna.", "Это не ру́чка.", "Questo non è una penna.", "Это ру́чка?", "È una penna?") },
        { case: "Родительный", form: "ру́чки", examples: ex("Я знаю смысл ру́чки.", "Conosco il senso della penna.", "Я не знаю смысл ру́чки.", "Non conosco il senso della penna.", "Ты знаешь смысл ру́чки?", "Conosci il senso della penna?") },
        { case: "Дательный", form: "ру́чке", examples: ex("Я рад ру́чке.", "Sono contento della penna.", "Я не рад ру́чке.", "Non sono contento della penna.", "Ты рад ру́чке?", "Sei contento della penna?") },
        { case: "Винительный", form: "ру́чку", examples: ex("Я вижу ру́чку.", "Vedo una penna.", "Я не вижу ру́чку.", "Non vedo una penna.", "Ты видишь ру́чку?", "Vedi una penna?") },
        { case: "Творительный", form: "ру́чкой", examples: ex("Он доволен ру́чкой.", "Lui è soddisfatto della penna.", "Он не доволен ру́чкой.", "Lui non è soddisfatto della penna.", "Он доволен ру́чкой?", "Lui è soddisfatto della penna?") },
        { case: "Предложный", form: "ру́чке", examples: ex("Мы говорим о ру́чке.", "Parliamo della penna.", "Мы не говорим о ру́чке.", "Non parliamo della penna.", "Вы говорите о ру́чке?", "Parlate della penna?") },
      ],
    },
    {
      word: "я́блоко",
      meaning_it: "mela",
      note_it: "Sostantivo neutro, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "я́блоко", examples: ex("Это я́блоко.", "Questo è una mela.", "Это не я́блоко.", "Questo non è una mela.", "Это я́блоко?", "È una mela?") },
        { case: "Родительный", form: "я́блока", examples: ex("Я знаю смысл я́блока.", "Conosco il senso della mela.", "Я не знаю смысл я́блока.", "Non conosco il senso della mela.", "Ты знаешь смысл я́блока?", "Conosci il senso della mela?") },
        { case: "Дательный", form: "я́блоку", examples: ex("Я рад я́блоку.", "Sono contento della mela.", "Я не рад я́блоку.", "Non sono contento della mela.", "Ты рад я́блоку?", "Sei contento della mela?") },
        { case: "Винительный", form: "я́блоко", examples: ex("Я вижу я́блоко.", "Vedo una mela.", "Я не вижу я́блоко.", "Non vedo una mela.", "Ты видишь я́блоко?", "Vedi una mela?") },
        { case: "Творительный", form: "я́блоком", examples: ex("Он доволен я́блоком.", "Lui è soddisfatto della mela.", "Он не доволен я́блоком.", "Lui non è soddisfatto della mela.", "Он доволен я́блоком?", "Lui è soddisfatto della mela?") },
        { case: "Предложный", form: "я́блоке", examples: ex("Мы говорим о я́блоке.", "Parliamo della mela.", "Мы не говорим о я́блоке.", "Non parliamo della mela.", "Вы говорите о я́блоке?", "Parlate della mela?") },
      ],
    },
  ],
  A2: [
    {
      word: "кни\u0301га",
      meaning_it: "libro",
      note_it: "Sostantivo femminile in -а, tema duro — dativo e prepositivo coincidono (книге).",
      cases: [
        { case: "Именительный", form: "кни\u0301га", examples: ex("Это интересная книга.", "Questo è un libro interessante.", "Это не интересная книга.", "Questo non è un libro interessante.", "Это твоя книга?", "È il tuo libro?") },
        { case: "Родительный", form: "кни\u0301ги", examples: ex("Это страница книги.", "Questa è la pagina del libro.", "Это не страница книги.", "Questa non è la pagina del libro.", "Это страница книги?", "È la pagina del libro?") },
        { case: "Дательный", form: "кни\u0301ге", examples: ex("Я рад этой книге.", "Sono contento di questo libro.", "Я не рад этой книге.", "Non sono contento di questo libro.", "Ты рад этой книге?", "Sei contento di questo libro?") },
        { case: "Винительный", form: "кни\u0301гу", examples: ex("Я читаю книгу.", "Leggo il libro.", "Я не читаю книгу.", "Non leggo il libro.", "Ты читаешь книгу?", "Leggi il libro?") },
        { case: "Творительный", form: "кни\u0301гой", examples: ex("Я интересуюсь этой книгой.", "Sono interessato a questo libro.", "Я не интересуюсь этой книгой.", "Non sono interessato a questo libro.", "Ты интересуешься этой книгой?", "Sei interessato a questo libro?") },
        { case: "Предложный", form: "кни\u0301ге", examples: ex("Мы говорим о книге.", "Parliamo del libro.", "Мы не говорим о книге.", "Non parliamo del libro.", "Вы говорите о книге?", "Parlate del libro?") },
      ],
    },
    {
      word: "маши́на",
      meaning_it: "macchina",
      note_it: "Sostantivo femminile in -a, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "маши́на", examples: ex("Это маши́на.", "Questo è una macchina.", "Это не маши́на.", "Questo non è una macchina.", "Это маши́на?", "È una macchina?") },
        { case: "Родительный", form: "маши́ны", examples: ex("Я знаю смысл маши́ны.", "Conosco il senso della macchina.", "Я не знаю смысл маши́ны.", "Non conosco il senso della macchina.", "Ты знаешь смысл маши́ны?", "Conosci il senso della macchina?") },
        { case: "Дательный", form: "маши́не", examples: ex("Я рад маши́не.", "Sono contento della macchina.", "Я не рад маши́не.", "Non sono contento della macchina.", "Ты рад маши́не?", "Sei contento della macchina?") },
        { case: "Винительный", form: "маши́ну", examples: ex("Я вижу маши́ну.", "Vedo una macchina.", "Я не вижу маши́ну.", "Non vedo una macchina.", "Ты видишь маши́ну?", "Vedi una macchina?") },
        { case: "Творительный", form: "маши́ной", examples: ex("Он доволен маши́ной.", "Lui è soddisfatto della macchina.", "Он не доволен маши́ной.", "Lui non è soddisfatto della macchina.", "Он доволен маши́ной?", "Lui è soddisfatto della macchina?") },
        { case: "Предложный", form: "маши́не", examples: ex("Мы говорим о маши́не.", "Parliamo della macchina.", "Мы не говорим о маши́не.", "Non parliamo della macchina.", "Вы говорите о маши́не?", "Parlate della macchina?") },
      ],
    },
    {
      word: "телефо́н",
      meaning_it: "telefono",
      note_it: "Sostantivo maschile, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "телефо́н", examples: ex("Это телефо́н.", "Questo è un telefono.", "Это не телефо́н.", "Questo non è un telefono.", "Это телефо́н?", "È un telefono?") },
        { case: "Родительный", form: "телефо́на", examples: ex("Я знаю смысл телефо́на.", "Conosco il senso del telefono.", "Я не знаю смысл телефо́на.", "Non conosco il senso del telefono.", "Ты знаешь смысл телефо́на?", "Conosci il senso del telefono?") },
        { case: "Дательный", form: "телефо́ну", examples: ex("Я рад телефо́ну.", "Sono contento del telefono.", "Я не рад телефо́ну.", "Non sono contento del telefono.", "Ты рад телефо́ну?", "Sei contento del telefono?") },
        { case: "Винительный", form: "телефо́н", examples: ex("Я вижу телефо́н.", "Vedo un telefono.", "Я не вижу телефо́н.", "Non vedo un telefono.", "Ты видишь телефо́н?", "Vedi un telefono?") },
        { case: "Творительный", form: "телефо́ном", examples: ex("Он доволен телефо́ном.", "Lui è soddisfatto del telefono.", "Он не доволен телефо́ном.", "Lui non è soddisfatto del telefono.", "Он доволен телефо́ном?", "Lui è soddisfatto del telefono?") },
        { case: "Предложный", form: "телефо́не", examples: ex("Мы говорим о телефо́не.", "Parliamo del telefono.", "Мы не говорим о телефо́не.", "Non parliamo del telefono.", "Вы говорите о телефо́не?", "Parlate del telefono?") },
      ],
    },
    {
      word: "письмо́",
      meaning_it: "lettera",
      note_it: "Sostantivo neutro, tema duro — accento sempre sull'ultima sillaba.",
      cases: [
        { case: "Именительный", form: "письмо́", examples: ex("Это письмо́.", "Questo è una lettera.", "Это не письмо́.", "Questo non è una lettera.", "Это письмо́?", "È una lettera?") },
        { case: "Родительный", form: "письма́", examples: ex("Я знаю смысл письма́.", "Conosco il senso della lettera.", "Я не знаю смысл письма́.", "Non conosco il senso della lettera.", "Ты знаешь смысл письма́?", "Conosci il senso della lettera?") },
        { case: "Дательный", form: "письму́", examples: ex("Я рад письму́.", "Sono contento della lettera.", "Я не рад письму́.", "Non sono contento della lettera.", "Ты рад письму́?", "Sei contento della lettera?") },
        { case: "Винительный", form: "письмо́", examples: ex("Я вижу письмо́.", "Vedo una lettera.", "Я не вижу письмо́.", "Non vedo una lettera.", "Ты видишь письмо́?", "Vedi una lettera?") },
        { case: "Творительный", form: "письмо́м", examples: ex("Он доволен письмо́м.", "Lui è soddisfatto della lettera.", "Он не доволен письмо́м.", "Lui non è soddisfatto della lettera.", "Он доволен письмо́м?", "Lui è soddisfatto della lettera?") },
        { case: "Предложный", form: "письме́", examples: ex("Мы говорим о письме́.", "Parliamo della lettera.", "Мы не говорим о письме́.", "Non parliamo della lettera.", "Вы говорите о письме́?", "Parlate della lettera?") },
      ],
    },
    {
      word: "друг",
      meaning_it: "amico",
      note_it: "Sostantivo maschile ANIMATO — l'accusativo coincide col genitivo (дру́га), non col nominativo.",
      cases: [
        { case: "Именительный", form: "друг", examples: ex("Это друг.", "Questo è un amico.", "Это не друг.", "Questo non è un amico.", "Это друг?", "È un amico?") },
        { case: "Родительный", form: "дру́га", examples: ex("Я знаю смысл дру́га.", "Conosco il senso dell'amico.", "Я не знаю смысл дру́га.", "Non conosco il senso dell'amico.", "Ты знаешь смысл дру́га?", "Conosci il senso dell'amico?") },
        { case: "Дательный", form: "дру́гу", examples: ex("Я рад дру́гу.", "Sono contento dell'amico.", "Я не рад дру́гу.", "Non sono contento dell'amico.", "Ты рад дру́гу?", "Sei contento dell'amico?") },
        { case: "Винительный", form: "дру́га", examples: ex("Я вижу дру́га.", "Vedo un amico.", "Я не вижу дру́га.", "Non vedo un amico.", "Ты видишь дру́га?", "Vedi un amico?") },
        { case: "Творительный", form: "дру́гом", examples: ex("Он доволен дру́гом.", "Lui è soddisfatto dell'amico.", "Он не доволен дру́гом.", "Lui non è soddisfatto dell'amico.", "Он доволен дру́гом?", "Lui è soddisfatto dell'amico?") },
        { case: "Предложный", form: "дру́ге", examples: ex("Мы говорим о дру́ге.", "Parliamo dell'amico.", "Мы не говорим о дру́ге.", "Non parliamo dell'amico.", "Вы говорите о дру́ге?", "Parlate dell'amico?") },
      ],
    },
    {
      word: "мо́ре",
      meaning_it: "mare",
      note_it: "Sostantivo neutro, tema molle — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "мо́ре", examples: ex("Это мо́ре.", "Questo è un mare.", "Это не мо́ре.", "Questo non è un mare.", "Это мо́ре?", "È un mare?") },
        { case: "Родительный", form: "мо́ря", examples: ex("Я знаю смысл мо́ря.", "Conosco il senso del mare.", "Я не знаю смысл мо́ря.", "Non conosco il senso del mare.", "Ты знаешь смысл мо́ря?", "Conosci il senso del mare?") },
        { case: "Дательный", form: "мо́рю", examples: ex("Я рад мо́рю.", "Sono contento del mare.", "Я не рад мо́рю.", "Non sono contento del mare.", "Ты рад мо́рю?", "Sei contento del mare?") },
        { case: "Винительный", form: "мо́ре", examples: ex("Я вижу мо́ре.", "Vedo un mare.", "Я не вижу мо́ре.", "Non vedo un mare.", "Ты видишь мо́ре?", "Vedi un mare?") },
        { case: "Творительный", form: "мо́рем", examples: ex("Он доволен мо́рем.", "Lui è soddisfatto del mare.", "Он не доволен мо́рем.", "Lui non è soddisfatto del mare.", "Он доволен мо́рем?", "Lui è soddisfatto del mare?") },
        { case: "Предложный", form: "мо́ре", examples: ex("Мы говорим о мо́ре.", "Parliamo del mare.", "Мы не говорим о мо́ре.", "Non parliamo del mare.", "Вы говорите о мо́ре?", "Parlate del mare?") },
      ],
    },
    {
      word: "руба́шка",
      meaning_it: "camicia",
      note_it: "Sostantivo femminile in -a, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "руба́шка", examples: ex("Это руба́шка.", "Questo è una camicia.", "Это не руба́шка.", "Questo non è una camicia.", "Это руба́шка?", "È una camicia?") },
        { case: "Родительный", form: "руба́шки", examples: ex("Я знаю смысл руба́шки.", "Conosco il senso della camicia.", "Я не знаю смысл руба́шки.", "Non conosco il senso della camicia.", "Ты знаешь смысл руба́шки?", "Conosci il senso della camicia?") },
        { case: "Дательный", form: "руба́шке", examples: ex("Я рад руба́шке.", "Sono contento della camicia.", "Я не рад руба́шке.", "Non sono contento della camicia.", "Ты рад руба́шке?", "Sei contento della camicia?") },
        { case: "Винительный", form: "руба́шку", examples: ex("Я вижу руба́шку.", "Vedo una camicia.", "Я не вижу руба́шку.", "Non vedo una camicia.", "Ты видишь руба́шку?", "Vedi una camicia?") },
        { case: "Творительный", form: "руба́шкой", examples: ex("Он доволен руба́шкой.", "Lui è soddisfatto della camicia.", "Он не доволен руба́шкой.", "Lui non è soddisfatto della camicia.", "Он доволен руба́шкой?", "Lui è soddisfatto della camicia?") },
        { case: "Предложный", form: "руба́шке", examples: ex("Мы говорим о руба́шке.", "Parliamo della camicia.", "Мы не говорим о руба́шке.", "Non parliamo della camicia.", "Вы говорите о руба́шке?", "Parlate della camicia?") },
      ],
    },
  ],
  B1: [
    {
      word: "окно\u0301",
      meaning_it: "finestra",
      note_it: "Sostantivo neutro in -о — nominativo e accusativo coincidono (come per gli inanimati maschili).",
      cases: [
        { case: "Именительный", form: "окно\u0301", examples: ex("Окно открыто.", "La finestra è aperta.", "Окно не открыто.", "La finestra non è aperta.", "Окно открыто?", "La finestra è aperta?") },
        { case: "Родительный", form: "окна\u0301", examples: ex("Возле окна стоит стол.", "Vicino alla finestra c'è un tavolo.", "Возле окна нет стола.", "Vicino alla finestra non c'è un tavolo.", "Что стоит возле окна?", "Cosa c'è vicino alla finestra?") },
        { case: "Дательный", form: "окну\u0301", examples: ex("Кошка подошла к окну.", "Il gatto si è avvicinato alla finestra.", "Кошка не подошла к окну.", "Il gatto non si è avvicinato alla finestra.", "Кошка подошла к окну?", "Il gatto si è avvicinato alla finestra?") },
        { case: "Винительный", form: "окно\u0301", examples: ex("Я закрываю окно.", "Chiudo la finestra.", "Я не закрываю окно.", "Non chiudo la finestra.", "Ты закрываешь окно?", "Chiudi la finestra?") },
        { case: "Творительный", form: "окно\u0301м", examples: ex("За окном идёт дождь.", "Fuori dalla finestra piove.", "За окном не идёт дождь.", "Fuori dalla finestra non piove.", "За окном идёт дождь?", "Fuori dalla finestra piove?") },
        { case: "Предложный", form: "окне\u0301", examples: ex("На окне стоит цветок.", "Sul davanzale c'è un fiore.", "На окне нет цветка.", "Sul davanzale non c'è un fiore.", "Что стоит на окне?", "Cosa c'è sul davanzale?") },
      ],
    },
    {
      word: "рабо́та",
      meaning_it: "lavoro",
      note_it: "Sostantivo femminile in -a, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "рабо́та", examples: ex("Это рабо́та.", "Questo è un lavoro.", "Это не рабо́та.", "Questo non è un lavoro.", "Это рабо́та?", "È un lavoro?") },
        { case: "Родительный", form: "рабо́ты", examples: ex("Я знаю смысл рабо́ты.", "Conosco il senso del lavoro.", "Я не знаю смысл рабо́ты.", "Non conosco il senso del lavoro.", "Ты знаешь смысл рабо́ты?", "Conosci il senso del lavoro?") },
        { case: "Дательный", form: "рабо́те", examples: ex("Я рад рабо́те.", "Sono contento del lavoro.", "Я не рад рабо́те.", "Non sono contento del lavoro.", "Ты рад рабо́те?", "Sei contento del lavoro?") },
        { case: "Винительный", form: "рабо́ту", examples: ex("Я вижу рабо́ту.", "Vedo un lavoro.", "Я не вижу рабо́ту.", "Non vedo un lavoro.", "Ты видишь рабо́ту?", "Vedi un lavoro?") },
        { case: "Творительный", form: "рабо́той", examples: ex("Он доволен рабо́той.", "Lui è soddisfatto del lavoro.", "Он не доволен рабо́той.", "Lui non è soddisfatto del lavoro.", "Он доволен рабо́той?", "Lui è soddisfatto del lavoro?") },
        { case: "Предложный", form: "рабо́те", examples: ex("Мы говорим о рабо́те.", "Parliamo del lavoro.", "Мы не говорим о рабо́те.", "Non parliamo del lavoro.", "Вы говорите о рабо́те?", "Parlate del lavoro?") },
      ],
    },
    {
      word: "вопро́с",
      meaning_it: "domanda",
      note_it: "Sostantivo maschile, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "вопро́с", examples: ex("Это вопро́с.", "Questo è una domanda.", "Это не вопро́с.", "Questo non è una domanda.", "Это вопро́с?", "È una domanda?") },
        { case: "Родительный", form: "вопро́са", examples: ex("Я знаю смысл вопро́са.", "Conosco il senso della domanda.", "Я не знаю смысл вопро́са.", "Non conosco il senso della domanda.", "Ты знаешь смысл вопро́са?", "Conosci il senso della domanda?") },
        { case: "Дательный", form: "вопро́су", examples: ex("Я рад вопро́су.", "Sono contento della domanda.", "Я не рад вопро́су.", "Non sono contento della domanda.", "Ты рад вопро́су?", "Sei contento della domanda?") },
        { case: "Винительный", form: "вопро́с", examples: ex("Я вижу вопро́с.", "Vedo una domanda.", "Я не вижу вопро́с.", "Non vedo una domanda.", "Ты видишь вопро́с?", "Vedi una domanda?") },
        { case: "Творительный", form: "вопро́сом", examples: ex("Он доволен вопро́сом.", "Lui è soddisfatto della domanda.", "Он не доволен вопро́сом.", "Lui non è soddisfatto della domanda.", "Он доволен вопро́сом?", "Lui è soddisfatto della domanda?") },
        { case: "Предложный", form: "вопро́се", examples: ex("Мы говорим о вопро́се.", "Parliamo della domanda.", "Мы не говорим о вопро́се.", "Non parliamo della domanda.", "Вы говорите о вопро́се?", "Parlate della domanda?") },
      ],
    },
    {
      word: "де́ло",
      meaning_it: "faccenda",
      note_it: "Sostantivo neutro, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "де́ло", examples: ex("Это де́ло.", "Questo è una faccenda.", "Это не де́ло.", "Questo non è una faccenda.", "Это де́ло?", "È una faccenda?") },
        { case: "Родительный", form: "де́ла", examples: ex("Я знаю смысл де́ла.", "Conosco il senso della faccenda.", "Я не знаю смысл де́ла.", "Non conosco il senso della faccenda.", "Ты знаешь смысл де́ла?", "Conosci il senso della faccenda?") },
        { case: "Дательный", form: "де́лу", examples: ex("Я рад де́лу.", "Sono contento della faccenda.", "Я не рад де́лу.", "Non sono contento della faccenda.", "Ты рад де́лу?", "Sei contento della faccenda?") },
        { case: "Винительный", form: "де́ло", examples: ex("Я вижу де́ло.", "Vedo una faccenda.", "Я не вижу де́ло.", "Non vedo una faccenda.", "Ты видишь де́ло?", "Vedi una faccenda?") },
        { case: "Творительный", form: "де́лом", examples: ex("Он доволен де́лом.", "Lui è soddisfatto della faccenda.", "Он не доволен де́лом.", "Lui non è soddisfatto della faccenda.", "Он доволен де́лом?", "Lui è soddisfatto della faccenda?") },
        { case: "Предложный", form: "де́ле", examples: ex("Мы говорим о де́ле.", "Parliamo della faccenda.", "Мы не говорим о де́ле.", "Non parliamo della faccenda.", "Вы говорите о де́ле?", "Parlate della faccenda?") },
      ],
    },
    {
      word: "учи́тель",
      meaning_it: "insegnante",
      note_it: "Sostantivo maschile ANIMATO, tema molle — accusativo coincide col genitivo.",
      cases: [
        { case: "Именительный", form: "учи́тель", examples: ex("Это учи́тель.", "Questo è un insegnante.", "Это не учи́тель.", "Questo non è un insegnante.", "Это учи́тель?", "È un insegnante?") },
        { case: "Родительный", form: "учи́теля", examples: ex("Я знаю смысл учи́теля.", "Conosco il senso dell'insegnante.", "Я не знаю смысл учи́теля.", "Non conosco il senso dell'insegnante.", "Ты знаешь смысл учи́теля?", "Conosci il senso dell'insegnante?") },
        { case: "Дательный", form: "учи́телю", examples: ex("Я рад учи́телю.", "Sono contento dell'insegnante.", "Я не рад учи́телю.", "Non sono contento dell'insegnante.", "Ты рад учи́телю?", "Sei contento dell'insegnante?") },
        { case: "Винительный", form: "учи́теля", examples: ex("Я вижу учи́теля.", "Vedo un insegnante.", "Я не вижу учи́теля.", "Non vedo un insegnante.", "Ты видишь учи́теля?", "Vedi un insegnante?") },
        { case: "Творительный", form: "учи́телем", examples: ex("Он доволен учи́телем.", "Lui è soddisfatto dell'insegnante.", "Он не доволен учи́телем.", "Lui non è soddisfatto dell'insegnante.", "Он доволен учи́телем?", "Lui è soddisfatto dell'insegnante?") },
        { case: "Предложный", form: "учи́теле", examples: ex("Мы говорим о учи́теле.", "Parliamo dell'insegnante.", "Мы не говорим о учи́теле.", "Non parliamo dell'insegnante.", "Вы говорите о учи́теле?", "Parlate dell'insegnante?") },
      ],
    },
    {
      word: "пробле́ма",
      meaning_it: "problema",
      note_it: "Sostantivo femminile in russo (attenzione: in italiano 'problema' è invece maschile).",
      cases: [
        { case: "Именительный", form: "пробле́ма", examples: ex("Это пробле́ма.", "Questo è un problema.", "Это не пробле́ма.", "Questo non è un problema.", "Это пробле́ма?", "È un problema?") },
        { case: "Родительный", form: "пробле́мы", examples: ex("Я знаю смысл пробле́мы.", "Conosco il senso del problema.", "Я не знаю смысл пробле́мы.", "Non conosco il senso del problema.", "Ты знаешь смысл пробле́мы?", "Conosci il senso del problema?") },
        { case: "Дательный", form: "пробле́ме", examples: ex("Я рад пробле́ме.", "Sono contento del problema.", "Я не рад пробле́ме.", "Non sono contento del problema.", "Ты рад пробле́ме?", "Sei contento del problema?") },
        { case: "Винительный", form: "пробле́му", examples: ex("Я вижу пробле́му.", "Vedo un problema.", "Я не вижу пробле́му.", "Non vedo un problema.", "Ты видишь пробле́му?", "Vedi un problema?") },
        { case: "Творительный", form: "пробле́мой", examples: ex("Он доволен пробле́мой.", "Lui è soddisfatto del problema.", "Он не доволен пробле́мой.", "Lui non è soddisfatto del problema.", "Он доволен пробле́мой?", "Lui è soddisfatto del problema?") },
        { case: "Предложный", form: "пробле́ме", examples: ex("Мы говорим о пробле́ме.", "Parliamo del problema.", "Мы не говорим о пробле́ме.", "Non parliamo del problema.", "Вы говорите о пробле́ме?", "Parlate del problema?") },
      ],
    },
    {
      word: "со́лнце",
      meaning_it: "sole",
      note_it: "Sostantivo neutro, tema molle — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "со́лнце", examples: ex("Это со́лнце.", "Questo è un sole.", "Это не со́лнце.", "Questo non è un sole.", "Это со́лнце?", "È un sole?") },
        { case: "Родительный", form: "со́лнца", examples: ex("Я знаю смысл со́лнца.", "Conosco il senso del sole.", "Я не знаю смысл со́лнца.", "Non conosco il senso del sole.", "Ты знаешь смысл со́лнца?", "Conosci il senso del sole?") },
        { case: "Дательный", form: "со́лнцу", examples: ex("Я рад со́лнцу.", "Sono contento del sole.", "Я не рад со́лнцу.", "Non sono contento del sole.", "Ты рад со́лнцу?", "Sei contento del sole?") },
        { case: "Винительный", form: "со́лнце", examples: ex("Я вижу со́лнце.", "Vedo un sole.", "Я не вижу со́лнце.", "Non vedo un sole.", "Ты видишь со́лнце?", "Vedi un sole?") },
        { case: "Творительный", form: "со́лнцем", examples: ex("Он доволен со́лнцем.", "Lui è soddisfatto del sole.", "Он не доволен со́лнцем.", "Lui non è soddisfatto del sole.", "Он доволен со́лнцем?", "Lui è soddisfatto del sole?") },
        { case: "Предложный", form: "со́лнце", examples: ex("Мы говорим о со́лнце.", "Parliamo del sole.", "Мы не говорим о со́лнце.", "Non parliamo del sole.", "Вы говорите о со́лнце?", "Parlate del sole?") },
      ],
    },
  ],
  B2: [
    {
      word: "неде\u0301ля",
      meaning_it: "settimana",
      note_it: "Sostantivo femminile in -я, tema molle — stessa logica di книга ma con desinenze morbide.",
      cases: [
        { case: "Именительный", form: "неде\u0301ля", examples: ex("Эта неделя была тяжёлой.", "Questa settimana è stata pesante.", "Эта неделя не была тяжёлой.", "Questa settimana non è stata pesante.", "Эта неделя была тяжёлой?", "Questa settimana è stata pesante?") },
        { case: "Родительный", form: "неде\u0301ли", examples: ex("Это было в начале недели.", "È successo all'inizio della settimana.", "Это было не в начале недели.", "Non è successo all'inizio della settimana.", "Это было в начале недели?", "È successo all'inizio della settimana?") },
        { case: "Дательный", form: "неде\u0301ле", examples: ex("Я готовлюсь к следующей неделе.", "Mi preparo per la prossima settimana.", "Я не готовлюсь к следующей неделе.", "Non mi preparo per la prossima settimana.", "Ты готовишься к следующей неделе?", "Ti prepari per la prossima settimana?") },
        { case: "Винительный", form: "неде\u0301лю", examples: ex("Я жду эту неделю с нетерпением.", "Aspetto questa settimana con impazienza.", "Я не жду эту неделю с нетерпением.", "Non aspetto questa settimana con impazienza.", "Ты ждёшь эту неделю с нетерпением?", "Aspetti questa settimana con impazienza?") },
        { case: "Творительный", form: "неде\u0301лей", examples: ex("Перед этой неделей было спокойно.", "Prima di questa settimana era tranquillo.", "Перед этой неделей не было спокойно.", "Prima di questa settimana non era tranquillo.", "Перед этой неделей было спокойно?", "Prima di questa settimana era tranquillo?") },
        { case: "Предложный", form: "неде\u0301ле", examples: ex("Мы поговорим об этой неделе позже.", "Ne parleremo di questa settimana più tardi.", "Мы не поговорим об этой неделе позже.", "Non ne parleremo di questa settimana più tardi.", "Мы поговорим об этой неделе позже?", "Ne parleremo di questa settimana più tardi?") },
      ],
    },
    {
      word: "иде́я",
      meaning_it: "idea",
      note_it: "Sostantivo femminile in -я, tema molle — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "иде́я", examples: ex("Это иде́я.", "Questo è un'idea.", "Это не иде́я.", "Questo non è un'idea.", "Это иде́я?", "È un'idea?") },
        { case: "Родительный", form: "иде́и", examples: ex("Я знаю смысл иде́и.", "Conosco il senso dell'idea.", "Я не знаю смысл иде́и.", "Non conosco il senso dell'idea.", "Ты знаешь смысл иде́и?", "Conosci il senso dell'idea?") },
        { case: "Дательный", form: "иде́е", examples: ex("Я рад иде́е.", "Sono contento dell'idea.", "Я не рад иде́е.", "Non sono contento dell'idea.", "Ты рад иде́е?", "Sei contento dell'idea?") },
        { case: "Винительный", form: "иде́ю", examples: ex("Я вижу иде́ю.", "Vedo un'idea.", "Я не вижу иде́ю.", "Non vedo un'idea.", "Ты видишь иде́ю?", "Vedi un'idea?") },
        { case: "Творительный", form: "иде́ей", examples: ex("Он доволен иде́ей.", "Lui è soddisfatto dell'idea.", "Он не доволен иде́ей.", "Lui non è soddisfatto dell'idea.", "Он доволен иде́ей?", "Lui è soddisfatto dell'idea?") },
        { case: "Предложный", form: "иде́е", examples: ex("Мы говорим о иде́е.", "Parliamo dell'idea.", "Мы не говорим о иде́е.", "Non parliamo dell'idea.", "Вы говорите о иде́е?", "Parlate dell'idea?") },
      ],
    },
    {
      word: "собы́тие",
      meaning_it: "evento",
      note_it: "Sostantivo neutro in -ие — il prepositivo termina in -ии, non -ие (eccezione comune a tutti i neutri in -ие).",
      cases: [
        { case: "Именительный", form: "собы́тие", examples: ex("Это собы́тие.", "Questo è un evento.", "Это не собы́тие.", "Questo non è un evento.", "Это собы́тие?", "È un evento?") },
        { case: "Родительный", form: "собы́тия", examples: ex("Я знаю смысл собы́тия.", "Conosco il senso dell'evento.", "Я не знаю смысл собы́тия.", "Non conosco il senso dell'evento.", "Ты знаешь смысл собы́тия?", "Conosci il senso dell'evento?") },
        { case: "Дательный", form: "собы́тию", examples: ex("Я рад собы́тию.", "Sono contento dell'evento.", "Я не рад собы́тию.", "Non sono contento dell'evento.", "Ты рад собы́тию?", "Sei contento dell'evento?") },
        { case: "Винительный", form: "собы́тие", examples: ex("Я вижу собы́тие.", "Vedo un evento.", "Я не вижу собы́тие.", "Non vedo un evento.", "Ты видишь собы́тие?", "Vedi un evento?") },
        { case: "Творительный", form: "собы́тием", examples: ex("Он доволен собы́тием.", "Lui è soddisfatto dell'evento.", "Он не доволен собы́тием.", "Lui non è soddisfatto dell'evento.", "Он доволен собы́тием?", "Lui è soddisfatto dell'evento?") },
        { case: "Предложный", form: "собы́тии", examples: ex("Мы говорим о собы́тии.", "Parliamo dell'evento.", "Мы не говорим о собы́тии.", "Non parliamo dell'evento.", "Вы говорите о собы́тии?", "Parlate dell'evento?") },
      ],
    },
    {
      word: "студе́нт",
      meaning_it: "studente",
      note_it: "Sostantivo maschile ANIMATO — accusativo coincide col genitivo.",
      cases: [
        { case: "Именительный", form: "студе́нт", examples: ex("Это студе́нт.", "Questo è uno studente.", "Это не студе́нт.", "Questo non è uno studente.", "Это студе́нт?", "È uno studente?") },
        { case: "Родительный", form: "студе́нта", examples: ex("Я знаю смысл студе́нта.", "Conosco il senso dello studente.", "Я не знаю смысл студе́нта.", "Non conosco il senso dello studente.", "Ты знаешь смысл студе́нта?", "Conosci il senso dello studente?") },
        { case: "Дательный", form: "студе́нту", examples: ex("Я рад студе́нту.", "Sono contento dello studente.", "Я не рад студе́нту.", "Non sono contento dello studente.", "Ты рад студе́нту?", "Sei contento dello studente?") },
        { case: "Винительный", form: "студе́нта", examples: ex("Я вижу студе́нта.", "Vedo uno studente.", "Я не вижу студе́нта.", "Non vedo uno studente.", "Ты видишь студе́нта?", "Vedi uno studente?") },
        { case: "Творительный", form: "студе́нтом", examples: ex("Он доволен студе́нтом.", "Lui è soddisfatto dello studente.", "Он не доволен студе́нтом.", "Lui non è soddisfatto dello studente.", "Он доволен студе́нтом?", "Lui è soddisfatto dello studente?") },
        { case: "Предложный", form: "студе́нте", examples: ex("Мы говорим о студе́нте.", "Parliamo dello studente.", "Мы не говорим о студе́нте.", "Non parliamo dello studente.", "Вы говорите о студе́нте?", "Parlate dello studente?") },
      ],
    },
    {
      word: "страна́",
      meaning_it: "paese",
      note_it: "Sostantivo femminile in -a con accento mobile fisso sulla desinenza (non si sposta come рука/вода).",
      cases: [
        { case: "Именительный", form: "страна́", examples: ex("Это страна́.", "Questo è un paese.", "Это не страна́.", "Questo non è un paese.", "Это страна́?", "È un paese?") },
        { case: "Родительный", form: "страны́", examples: ex("Я знаю смысл страны́.", "Conosco il senso del paese.", "Я не знаю смысл страны́.", "Non conosco il senso del paese.", "Ты знаешь смысл страны́?", "Conosci il senso del paese?") },
        { case: "Дательный", form: "стране́", examples: ex("Я рад стране́.", "Sono contento del paese.", "Я не рад стране́.", "Non sono contento del paese.", "Ты рад стране́?", "Sei contento del paese?") },
        { case: "Винительный", form: "страну́", examples: ex("Я вижу страну́.", "Vedo un paese.", "Я не вижу страну́.", "Non vedo un paese.", "Ты видишь страну́?", "Vedi un paese?") },
        { case: "Творительный", form: "страно́й", examples: ex("Он доволен страно́й.", "Lui è soddisfatto del paese.", "Он не доволен страно́й.", "Lui non è soddisfatto del paese.", "Он доволен страно́й?", "Lui è soddisfatto del paese?") },
        { case: "Предложный", form: "стране́", examples: ex("Мы говорим о стране́.", "Parliamo del paese.", "Мы не говорим о стране́.", "Non parliamo del paese.", "Вы говорите о стране́?", "Parlate del paese?") },
      ],
    },
    {
      word: "зда́ние",
      meaning_it: "edificio",
      note_it: "Sostantivo neutro in -ие — prepositivo in -ии, come событие.",
      cases: [
        { case: "Именительный", form: "зда́ние", examples: ex("Это зда́ние.", "Questo è un edificio.", "Это не зда́ние.", "Questo non è un edificio.", "Это зда́ние?", "È un edificio?") },
        { case: "Родительный", form: "зда́ния", examples: ex("Я знаю смысл зда́ния.", "Conosco il senso dell'edificio.", "Я не знаю смысл зда́ния.", "Non conosco il senso dell'edificio.", "Ты знаешь смысл зда́ния?", "Conosci il senso dell'edificio?") },
        { case: "Дательный", form: "зда́нию", examples: ex("Я рад зда́нию.", "Sono contento dell'edificio.", "Я не рад зда́нию.", "Non sono contento dell'edificio.", "Ты рад зда́нию?", "Sei contento dell'edificio?") },
        { case: "Винительный", form: "зда́ние", examples: ex("Я вижу зда́ние.", "Vedo un edificio.", "Я не вижу зда́ние.", "Non vedo un edificio.", "Ты видишь зда́ние?", "Vedi un edificio?") },
        { case: "Творительный", form: "зда́нием", examples: ex("Он доволен зда́нием.", "Lui è soddisfatto dell'edificio.", "Он не доволен зда́нием.", "Lui non è soddisfatto dell'edificio.", "Он доволен зда́нием?", "Lui è soddisfatto dell'edificio?") },
        { case: "Предложный", form: "зда́нии", examples: ex("Мы говорим о зда́нии.", "Parliamo dell'edificio.", "Мы не говорим о зда́нии.", "Non parliamo dell'edificio.", "Вы говорите о зда́нии?", "Parlate dell'edificio?") },
      ],
    },
    {
      word: "врач",
      meaning_it: "medico",
      note_it: "Sostantivo maschile ANIMATO, monosillabico — accento sempre sulla desinenza, accusativo = genitivo.",
      cases: [
        { case: "Именительный", form: "врач", examples: ex("Это врач.", "Questo è un medico.", "Это не врач.", "Questo non è un medico.", "Это врач?", "È un medico?") },
        { case: "Родительный", form: "врача́", examples: ex("Я знаю смысл врача́.", "Conosco il senso del medico.", "Я не знаю смысл врача́.", "Non conosco il senso del medico.", "Ты знаешь смысл врача́?", "Conosci il senso del medico?") },
        { case: "Дательный", form: "врачу́", examples: ex("Я рад врачу́.", "Sono contento del medico.", "Я не рад врачу́.", "Non sono contento del medico.", "Ты рад врачу́?", "Sei contento del medico?") },
        { case: "Винительный", form: "врача́", examples: ex("Я вижу врача́.", "Vedo un medico.", "Я не вижу врача́.", "Non vedo un medico.", "Ты видишь врача́?", "Vedi un medico?") },
        { case: "Творительный", form: "врачо́м", examples: ex("Он доволен врачо́м.", "Lui è soddisfatto del medico.", "Он не доволен врачо́м.", "Lui non è soddisfatto del medico.", "Он доволен врачо́м?", "Lui è soddisfatto del medico?") },
        { case: "Предложный", form: "враче́", examples: ex("Мы говорим о враче́.", "Parliamo del medico.", "Мы не говорим о враче́.", "Non parliamo del medico.", "Вы говорите о враче́?", "Parlate del medico?") },
      ],
    },
  ],
  C1: [
    {
      word: "дверь",
      meaning_it: "porta",
      note_it: "Sostantivo femminile in -ь, terza declinazione — genitivo, dativo e prepositivo coincidono (двери).",
      cases: [
        { case: "Именительный", form: "дверь", examples: ex("Дверь закрыта.", "La porta è chiusa.", "Дверь не закрыта.", "La porta non è chiusa.", "Дверь закрыта?", "La porta è chiusa?") },
        { case: "Родительный", form: "две\u0301ри", examples: ex("Возле двери стоит охранник.", "Vicino alla porta c'è una guardia.", "Возле двери нет охранника.", "Vicino alla porta non c'è una guardia.", "Кто стоит возле двери?", "Chi c'è vicino alla porta?") },
        { case: "Дательный", form: "две\u0301ри", examples: ex("Он подошёл к двери.", "Si è avvicinato alla porta.", "Он не подошёл к двери.", "Non si è avvicinato alla porta.", "Он подошёл к двери?", "Si è avvicinato alla porta?") },
        { case: "Винительный", form: "дверь", examples: ex("Закрой дверь, пожалуйста.", "Chiudi la porta, per favore.", "Не закрывай дверь.", "Non chiudere la porta.", "Мне закрыть дверь?", "Devo chiudere la porta?") },
        { case: "Творительный", form: "две\u0301рью", examples: ex("За дверью кто-то стоит.", "Dietro la porta c'è qualcuno.", "За дверью никого нет.", "Dietro la porta non c'è nessuno.", "Кто стоит за дверью?", "Chi c'è dietro la porta?") },
        { case: "Предложный", form: "две\u0301ри", examples: ex("На двери висит табличка.", "Sulla porta c'è appeso un cartello.", "На двери нет таблички.", "Sulla porta non c'è un cartello.", "Что висит на двери?", "Cosa c'è appeso sulla porta?") },
      ],
    },
    {
      word: "мысль",
      meaning_it: "pensiero",
      note_it: "Sostantivo femminile in -ь (terza declinazione) — accusativo uguale al nominativo (i femminili non seguono la regola dell'animato).",
      cases: [
        { case: "Именительный", form: "мысль", examples: ex("Это мысль.", "Questo è un pensiero.", "Это не мысль.", "Questo non è un pensiero.", "Это мысль?", "È un pensiero?") },
        { case: "Родительный", form: "мы́сли", examples: ex("Я знаю смысл мы́сли.", "Conosco il senso del pensiero.", "Я не знаю смысл мы́сли.", "Non conosco il senso del pensiero.", "Ты знаешь смысл мы́сли?", "Conosci il senso del pensiero?") },
        { case: "Дательный", form: "мы́сли", examples: ex("Я рад мы́сли.", "Sono contento del pensiero.", "Я не рад мы́сли.", "Non sono contento del pensiero.", "Ты рад мы́сли?", "Sei contento del pensiero?") },
        { case: "Винительный", form: "мысль", examples: ex("Я вижу мысль.", "Vedo un pensiero.", "Я не вижу мысль.", "Non vedo un pensiero.", "Ты видишь мысль?", "Vedi un pensiero?") },
        { case: "Творительный", form: "мы́слью", examples: ex("Он доволен мы́слью.", "Lui è soddisfatto del pensiero.", "Он не доволен мы́слью.", "Lui non è soddisfatto del pensiero.", "Он доволен мы́слью?", "Lui è soddisfatto del pensiero?") },
        { case: "Предложный", form: "мы́сли", examples: ex("Мы говорим о мы́сли.", "Parliamo del pensiero.", "Мы не говорим о мы́сли.", "Non parliamo del pensiero.", "Вы говорите о мы́сли?", "Parlate del pensiero?") },
      ],
    },
    {
      word: "жизнь",
      meaning_it: "vita",
      note_it: "Sostantivo femminile in -ь, terza declinazione — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "жизнь", examples: ex("Это жизнь.", "Questo è una vita.", "Это не жизнь.", "Questo non è una vita.", "Это жизнь?", "È una vita?") },
        { case: "Родительный", form: "жи́зни", examples: ex("Я знаю смысл жи́зни.", "Conosco il senso della vita.", "Я не знаю смысл жи́зни.", "Non conosco il senso della vita.", "Ты знаешь смысл жи́зни?", "Conosci il senso della vita?") },
        { case: "Дательный", form: "жи́зни", examples: ex("Я рад жи́зни.", "Sono contento della vita.", "Я не рад жи́зни.", "Non sono contento della vita.", "Ты рад жи́зни?", "Sei contento della vita?") },
        { case: "Винительный", form: "жизнь", examples: ex("Я вижу жизнь.", "Vedo una vita.", "Я не вижу жизнь.", "Non vedo una vita.", "Ты видишь жизнь?", "Vedi una vita?") },
        { case: "Творительный", form: "жи́знью", examples: ex("Он доволен жи́знью.", "Lui è soddisfatto della vita.", "Он не доволен жи́знью.", "Lui non è soddisfatto della vita.", "Он доволен жи́знью?", "Lui è soddisfatto della vita?") },
        { case: "Предложный", form: "жи́зни", examples: ex("Мы говорим о жи́зни.", "Parliamo della vita.", "Мы не говорим о жи́зни.", "Non parliamo della vita.", "Вы говорите о жи́зни?", "Parlate della vita?") },
      ],
    },
    {
      word: "писа́тель",
      meaning_it: "scrittore",
      note_it: "Sostantivo maschile ANIMATO, tema molle — accusativo coincide col genitivo.",
      cases: [
        { case: "Именительный", form: "писа́тель", examples: ex("Это писа́тель.", "Questo è uno scrittore.", "Это не писа́тель.", "Questo non è uno scrittore.", "Это писа́тель?", "È uno scrittore?") },
        { case: "Родительный", form: "писа́теля", examples: ex("Я знаю смысл писа́теля.", "Conosco il senso dello scrittore.", "Я не знаю смысл писа́теля.", "Non conosco il senso dello scrittore.", "Ты знаешь смысл писа́теля?", "Conosci il senso dello scrittore?") },
        { case: "Дательный", form: "писа́телю", examples: ex("Я рад писа́телю.", "Sono contento dello scrittore.", "Я не рад писа́телю.", "Non sono contento dello scrittore.", "Ты рад писа́телю?", "Sei contento dello scrittore?") },
        { case: "Винительный", form: "писа́теля", examples: ex("Я вижу писа́теля.", "Vedo uno scrittore.", "Я не вижу писа́теля.", "Non vedo uno scrittore.", "Ты видишь писа́теля?", "Vedi uno scrittore?") },
        { case: "Творительный", form: "писа́телем", examples: ex("Он доволен писа́телем.", "Lui è soddisfatto dello scrittore.", "Он не доволен писа́телем.", "Lui non è soddisfatto dello scrittore.", "Он доволен писа́телем?", "Lui è soddisfatto dello scrittore?") },
        { case: "Предложный", form: "писа́теле", examples: ex("Мы говорим о писа́теле.", "Parliamo dello scrittore.", "Мы не говорим о писа́теле.", "Non parliamo dello scrittore.", "Вы говорите о писа́теле?", "Parlate dello scrittore?") },
      ],
    },
    {
      word: "о́бщество",
      meaning_it: "società",
      note_it: "Sostantivo neutro, tema duro — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "о́бщество", examples: ex("Это о́бщество.", "Questo è una società.", "Это не о́бщество.", "Questo non è una società.", "Это о́бщество?", "È una società?") },
        { case: "Родительный", form: "о́бщества", examples: ex("Я знаю смысл о́бщества.", "Conosco il senso della società.", "Я не знаю смысл о́бщества.", "Non conosco il senso della società.", "Ты знаешь смысл о́бщества?", "Conosci il senso della società?") },
        { case: "Дательный", form: "о́бществу", examples: ex("Я рад о́бществу.", "Sono contento della società.", "Я не рад о́бществу.", "Non sono contento della società.", "Ты рад о́бществу?", "Sei contento della società?") },
        { case: "Винительный", form: "о́бщество", examples: ex("Я вижу о́бщество.", "Vedo una società.", "Я не вижу о́бщество.", "Non vedo una società.", "Ты видишь о́бщество?", "Vedi una società?") },
        { case: "Творительный", form: "о́бществом", examples: ex("Он доволен о́бществом.", "Lui è soddisfatto della società.", "Он не доволен о́бществом.", "Lui non è soddisfatto della società.", "Он доволен о́бществом?", "Lui è soddisfatto della società?") },
        { case: "Предложный", form: "о́бществе", examples: ex("Мы говорим о о́бществе.", "Parliamo della società.", "Мы не говорим о о́бществе.", "Non parliamo della società.", "Вы говорите о о́бществе?", "Parlate della società?") },
      ],
    },
    {
      word: "связь",
      meaning_it: "connessione",
      note_it: "Sostantivo femminile in -ь, terza declinazione — accento fisso sulla radice.",
      cases: [
        { case: "Именительный", form: "связь", examples: ex("Это связь.", "Questo è una connessione.", "Это не связь.", "Questo non è una connessione.", "Это связь?", "È una connessione?") },
        { case: "Родительный", form: "свя́зи", examples: ex("Я знаю смысл свя́зи.", "Conosco il senso della connessione.", "Я не знаю смысл свя́зи.", "Non conosco il senso della connessione.", "Ты знаешь смысл свя́зи?", "Conosci il senso della connessione?") },
        { case: "Дательный", form: "свя́зи", examples: ex("Я рад свя́зи.", "Sono contento della connessione.", "Я не рад свя́зи.", "Non sono contento della connessione.", "Ты рад свя́зи?", "Sei contento della connessione?") },
        { case: "Винительный", form: "связь", examples: ex("Я вижу связь.", "Vedo una connessione.", "Я не вижу связь.", "Non vedo una connessione.", "Ты видишь связь?", "Vedi una connessione?") },
        { case: "Творительный", form: "свя́зью", examples: ex("Он доволен свя́зью.", "Lui è soddisfatto della connessione.", "Он не доволен свя́зью.", "Lui non è soddisfatto della connessione.", "Он доволен свя́зью?", "Lui è soddisfatto della connessione?") },
        { case: "Предложный", form: "свя́зи", examples: ex("Мы говорим о свя́зи.", "Parliamo della connessione.", "Мы не говорим о свя́зи.", "Non parliamo della connessione.", "Вы говорите о свя́зи?", "Parlate della connessione?") },
      ],
    },
    {
      word: "явле́ние",
      meaning_it: "fenomeno",
      note_it: "Sostantivo neutro in -ие — prepositivo in -ии, come событие e здание.",
      cases: [
        { case: "Именительный", form: "явле́ние", examples: ex("Это явле́ние.", "Questo è un fenomeno.", "Это не явле́ние.", "Questo non è un fenomeno.", "Это явле́ние?", "È un fenomeno?") },
        { case: "Родительный", form: "явле́ния", examples: ex("Я знаю смысл явле́ния.", "Conosco il senso del fenomeno.", "Я не знаю смысл явле́ния.", "Non conosco il senso del fenomeno.", "Ты знаешь смысл явле́ния?", "Conosci il senso del fenomeno?") },
        { case: "Дательный", form: "явле́нию", examples: ex("Я рад явле́нию.", "Sono contento del fenomeno.", "Я не рад явле́нию.", "Non sono contento del fenomeno.", "Ты рад явле́нию?", "Sei contento del fenomeno?") },
        { case: "Винительный", form: "явле́ние", examples: ex("Я вижу явле́ние.", "Vedo un fenomeno.", "Я не вижу явле́ние.", "Non vedo un fenomeno.", "Ты видишь явле́ние?", "Vedi un fenomeno?") },
        { case: "Творительный", form: "явле́нием", examples: ex("Он доволен явле́нием.", "Lui è soddisfatto del fenomeno.", "Он не доволен явле́нием.", "Lui non è soddisfatto del fenomeno.", "Он доволен явле́нием?", "Lui è soddisfatto del fenomeno?") },
        { case: "Предложный", form: "явле́нии", examples: ex("Мы говорим о явле́нии.", "Parliamo del fenomeno.", "Мы не говорим о явле́нии.", "Non parliamo del fenomeno.", "Вы говорите о явле́нии?", "Parlate del fenomeno?") },
      ],
    },
  ],
  C2: [
    {
      word: "мать",
      meaning_it: "madre",
      note_it: "Sostantivo irregolare: aggiunge l'infisso -ер- in tutti i casi tranne nominativo e accusativo.",
      cases: [
        { case: "Именительный", form: "мать", examples: ex("Моя мать врач.", "Mia madre è medico.", "Моя мать не врач.", "Mia madre non è medico.", "Твоя мать врач?", "Tua madre è medico?") },
        { case: "Родительный", form: "ма\u0301тери", examples: ex("Это подарок для матери.", "Questo è un regalo per la madre.", "Это не подарок для матери.", "Questo non è un regalo per la madre.", "Это подарок для матери?", "È un regalo per la madre?") },
        { case: "Дательный", form: "ма\u0301тери", examples: ex("Я звоню матери каждый день.", "Chiamo mia madre ogni giorno.", "Я не звоню матери каждый день.", "Non chiamo mia madre ogni giorno.", "Ты звонишь матери каждый день?", "Chiami tua madre ogni giorno?") },
        { case: "Винительный", form: "мать", examples: ex("Я вижу мать раз в неделю.", "Vedo mia madre una volta a settimana.", "Я не вижу мать каждый день.", "Non vedo mia madre ogni giorno.", "Ты видишь мать часто?", "Vedi tua madre spesso?") },
        { case: "Творительный", form: "ма\u0301терью", examples: ex("Я горжусь своей матерью.", "Sono orgoglioso di mia madre.", "Я не горжусь своей матерью.", "Non sono orgoglioso di mia madre.", "Ты гордишься своей матерью?", "Sei orgoglioso di tua madre?") },
        { case: "Предложный", form: "ма\u0301тери", examples: ex("Я часто думаю о матери.", "Penso spesso a mia madre.", "Я не думаю о матери каждый день.", "Non penso a mia madre ogni giorno.", "Ты думаешь о матери?", "Pensi a tua madre?") },
      ],
    },
    {
      word: "дочь",
      meaning_it: "figlia",
      note_it: "Sostantivo irregolare con infisso -ер- in tutti i casi tranne nominativo/accusativo, come мать.",
      cases: [
        { case: "Именительный", form: "дочь", examples: ex("Это дочь.", "Questo è una figlia.", "Это не дочь.", "Questo non è una figlia.", "Это дочь?", "È una figlia?") },
        { case: "Родительный", form: "до́чери", examples: ex("Я знаю смысл до́чери.", "Conosco il senso della figlia.", "Я не знаю смысл до́чери.", "Non conosco il senso della figlia.", "Ты знаешь смысл до́чери?", "Conosci il senso della figlia?") },
        { case: "Дательный", form: "до́чери", examples: ex("Я рад до́чери.", "Sono contento della figlia.", "Я не рад до́чери.", "Non sono contento della figlia.", "Ты рад до́чери?", "Sei contento della figlia?") },
        { case: "Винительный", form: "дочь", examples: ex("Я вижу дочь.", "Vedo una figlia.", "Я не вижу дочь.", "Non vedo una figlia.", "Ты видишь дочь?", "Vedi una figlia?") },
        { case: "Творительный", form: "до́черью", examples: ex("Он доволен до́черью.", "Lui è soddisfatto della figlia.", "Он не доволен до́черью.", "Lui non è soddisfatto della figlia.", "Он доволен до́черью?", "Lui è soddisfatto della figlia?") },
        { case: "Предложный", form: "до́чери", examples: ex("Мы говорим о до́чери.", "Parliamo della figlia.", "Мы не говорим о до́чери.", "Non parliamo della figlia.", "Вы говорите о до́чери?", "Parlate della figlia?") },
      ],
    },
    {
      word: "вре́мя",
      meaning_it: "tempo",
      note_it: "Sostantivo neutro irregolare in -мя (uno dei 10 sostantivi di questo tipo), con infisso -ен- in tutti i casi obliqui.",
      cases: [
        { case: "Именительный", form: "вре́мя", examples: ex("Это вре́мя.", "Questo è un tempo.", "Это не вре́мя.", "Questo non è un tempo.", "Это вре́мя?", "È un tempo?") },
        { case: "Родительный", form: "вре́мени", examples: ex("Я знаю смысл вре́мени.", "Conosco il senso del tempo.", "Я не знаю смысл вре́мени.", "Non conosco il senso del tempo.", "Ты знаешь смысл вре́мени?", "Conosci il senso del tempo?") },
        { case: "Дательный", form: "вре́мени", examples: ex("Я рад вре́мени.", "Sono contento del tempo.", "Я не рад вре́мени.", "Non sono contento del tempo.", "Ты рад вре́мени?", "Sei contento del tempo?") },
        { case: "Винительный", form: "вре́мя", examples: ex("Я вижу вре́мя.", "Vedo un tempo.", "Я не вижу вре́мя.", "Non vedo un tempo.", "Ты видишь вре́мя?", "Vedi un tempo?") },
        { case: "Творительный", form: "вре́менем", examples: ex("Он доволен вре́менем.", "Lui è soddisfatto del tempo.", "Он не доволен вре́менем.", "Lui non è soddisfatto del tempo.", "Он доволен вре́менем?", "Lui è soddisfatto del tempo?") },
        { case: "Предложный", form: "вре́мени", examples: ex("Мы говорим о вре́мени.", "Parliamo del tempo.", "Мы не говорим о вре́мени.", "Non parliamo del tempo.", "Вы говорите о вре́мени?", "Parlate del tempo?") },
      ],
    },
    {
      word: "и́мя",
      meaning_it: "nome",
      note_it: "Sostantivo neutro irregolare in -мя, stessa declinazione di время.",
      cases: [
        { case: "Именительный", form: "и́мя", examples: ex("Это и́мя.", "Questo è un nome.", "Это не и́мя.", "Questo non è un nome.", "Это и́мя?", "È un nome?") },
        { case: "Родительный", form: "и́мени", examples: ex("Я знаю смысл и́мени.", "Conosco il senso del nome.", "Я не знаю смысл и́мени.", "Non conosco il senso del nome.", "Ты знаешь смысл и́мени?", "Conosci il senso del nome?") },
        { case: "Дательный", form: "и́мени", examples: ex("Я рад и́мени.", "Sono contento del nome.", "Я не рад и́мени.", "Non sono contento del nome.", "Ты рад и́мени?", "Sei contento del nome?") },
        { case: "Винительный", form: "и́мя", examples: ex("Я вижу и́мя.", "Vedo un nome.", "Я не вижу и́мя.", "Non vedo un nome.", "Ты видишь и́мя?", "Vedi un nome?") },
        { case: "Творительный", form: "и́менем", examples: ex("Он доволен и́менем.", "Lui è soddisfatto del nome.", "Он не доволен и́менем.", "Lui non è soddisfatto del nome.", "Он доволен и́менем?", "Lui è soddisfatto del nome?") },
        { case: "Предложный", form: "и́мени", examples: ex("Мы говорим о и́мени.", "Parliamo del nome.", "Мы не говорим о и́мени.", "Non parliamo del nome.", "Вы говорите о и́мени?", "Parlate del nome?") },
      ],
    },
    {
      word: "путь",
      meaning_it: "cammino",
      note_it: "Unico sostantivo maschile che si declina come un femminile in -ь, tranne allo strumentale (путём).",
      cases: [
        { case: "Именительный", form: "путь", examples: ex("Это путь.", "Questo è un cammino.", "Это не путь.", "Questo non è un cammino.", "Это путь?", "È un cammino?") },
        { case: "Родительный", form: "пути́", examples: ex("Я знаю смысл пути́.", "Conosco il senso del cammino.", "Я не знаю смысл пути́.", "Non conosco il senso del cammino.", "Ты знаешь смысл пути́?", "Conosci il senso del cammino?") },
        { case: "Дательный", form: "пути́", examples: ex("Я рад пути́.", "Sono contento del cammino.", "Я не рад пути́.", "Non sono contento del cammino.", "Ты рад пути́?", "Sei contento del cammino?") },
        { case: "Винительный", form: "путь", examples: ex("Я вижу путь.", "Vedo un cammino.", "Я не вижу путь.", "Non vedo un cammino.", "Ты видишь путь?", "Vedi un cammino?") },
        { case: "Творительный", form: "путём", examples: ex("Он доволен путём.", "Lui è soddisfatto del cammino.", "Он не доволен путём.", "Lui non è soddisfatto del cammino.", "Он доволен путём?", "Lui è soddisfatto del cammino?") },
        { case: "Предложный", form: "пути́", examples: ex("Мы говорим о пути́.", "Parliamo del cammino.", "Мы не говорим о пути́.", "Non parliamo del cammino.", "Вы говорите о пути́?", "Parlate del cammino?") },
      ],
    },
    {
      word: "судьба́",
      meaning_it: "destino",
      note_it: "Sostantivo femminile in -a con accento fisso sulla desinenza in tutti i casi.",
      cases: [
        { case: "Именительный", form: "судьба́", examples: ex("Это судьба́.", "Questo è un destino.", "Это не судьба́.", "Questo non è un destino.", "Это судьба́?", "È un destino?") },
        { case: "Родительный", form: "судьбы́", examples: ex("Я знаю смысл судьбы́.", "Conosco il senso del destino.", "Я не знаю смысл судьбы́.", "Non conosco il senso del destino.", "Ты знаешь смысл судьбы́?", "Conosci il senso del destino?") },
        { case: "Дательный", form: "судьбе́", examples: ex("Я рад судьбе́.", "Sono contento del destino.", "Я не рад судьбе́.", "Non sono contento del destino.", "Ты рад судьбе́?", "Sei contento del destino?") },
        { case: "Винительный", form: "судьбу́", examples: ex("Я вижу судьбу́.", "Vedo un destino.", "Я не вижу судьбу́.", "Non vedo un destino.", "Ты видишь судьбу́?", "Vedi un destino?") },
        { case: "Творительный", form: "судьбо́й", examples: ex("Он доволен судьбо́й.", "Lui è soddisfatto del destino.", "Он не доволен судьбо́й.", "Lui non è soddisfatto del destino.", "Он доволен судьбо́й?", "Lui è soddisfatto del destino?") },
        { case: "Предложный", form: "судьбе́", examples: ex("Мы говорим о судьбе́.", "Parliamo del destino.", "Мы не говорим о судьбе́.", "Non parliamo del destino.", "Вы говорите о судьбе́?", "Parlate del destino?") },
      ],
    },
    {
      word: "мужчи́на",
      meaning_it: "uomo",
      note_it: "Sostantivo di genere MASCHILE che si declina come un femminile in -a (маши́на/книга) — l'accordo grammaticale resta maschile.",
      cases: [
        { case: "Именительный", form: "мужчи́на", examples: ex("Это мужчи́на.", "Questo è un uomo.", "Это не мужчи́на.", "Questo non è un uomo.", "Это мужчи́на?", "È un uomo?") },
        { case: "Родительный", form: "мужчи́ны", examples: ex("Я знаю смысл мужчи́ны.", "Conosco il senso dell'uomo.", "Я не знаю смысл мужчи́ны.", "Non conosco il senso dell'uomo.", "Ты знаешь смысл мужчи́ны?", "Conosci il senso dell'uomo?") },
        { case: "Дательный", form: "мужчи́не", examples: ex("Я рад мужчи́не.", "Sono contento dell'uomo.", "Я не рад мужчи́не.", "Non sono contento dell'uomo.", "Ты рад мужчи́не?", "Sei contento dell'uomo?") },
        { case: "Винительный", form: "мужчи́ну", examples: ex("Я вижу мужчи́ну.", "Vedo un uomo.", "Я не вижу мужчи́ну.", "Non vedo un uomo.", "Ты видишь мужчи́ну?", "Vedi un uomo?") },
        { case: "Творительный", form: "мужчи́ной", examples: ex("Он доволен мужчи́ной.", "Lui è soddisfatto dell'uomo.", "Он не доволен мужчи́ной.", "Lui non è soddisfatto dell'uomo.", "Он доволен мужчи́ной?", "Lui è soddisfatto dell'uomo?") },
        { case: "Предложный", form: "мужчи́не", examples: ex("Мы говорим о мужчи́не.", "Parliamo dell'uomo.", "Мы не говорим о мужчи́не.", "Non parliamo dell'uomo.", "Вы говорите о мужчи́не?", "Parlate dell'uomo?") },
      ],
    },
  ],
};

function vf(label, form, example_ru, example_it) {
  return { label, form, example_ru, example_it };
}

function vb(word, meaning_it, aspect, note_it, forms) {
  return { word, meaning_it, aspect, note_it, forms: forms.map((f) => vf(...f)) };
}

const VERBS = {
  A1: [
    vb("жить", "vivere", "imperfettivo", "Verbo di uso quotidiano, coniugazione leggermente irregolare (живу, живёшь…).", [
      ["Presente – io", "живу\u0301", "Я живу в Италии.", "Vivo in Italia."],
      ["Presente – tu", "живёшь", "Где ты живёшь?", "Dove vivi?"],
      ["Passato", "жил", "Раньше я жил в Москве.", "Prima vivevo a Mosca."],
      ["Imperativo", "живи\u0301", "Живи спокойно.", "Vivi tranquillo."],
    ]),
    vb("говори\u0301ть", "parlare, dire", "imperfettivo", "Verbo di base, molto frequente nel parlato quotidiano.", [
      ["Presente – io", "говорю\u0301", "Я говорю по-русски.", "Parlo russo."],
      ["Presente – tu", "говори\u0301шь", "Ты говоришь громко.", "Parli ad alta voce."],
      ["Passato", "говори\u0301л", "Он говорил тихо.", "Lui parlava piano."],
      ["Imperativo", "говори\u0301", "Говори медленно.", "Parla lentamente."],
    ]),
    vb("чита\u0301ть", "leggere", "imperfettivo", "Verbo regolare in -ать, semplice da coniugare.", [
      ["Presente – io", "чита\u0301ю", "Я читаю газету.", "Leggo il giornale."],
      ["Presente – lei", "чита\u0301ет", "Она читает книгу.", "Lei legge un libro."],
      ["Passato", "чита\u0301л", "Я читал весь день.", "Ho letto tutto il giorno."],
      ["Futuro", "бу\u0301ду чита\u0301ть", "Завтра я буду читать.", "Domani leggerò."],
    ]),
    vb("писа\u0301ть", "scrivere", "imperfettivo", "Coniugazione con alternanza с→ш alla radice (пишу, пишешь…).", [
      ["Presente – io", "пишу\u0301", "Я пишу письмо.", "Scrivo una lettera."],
      ["Presente – tu", "пи\u0301шешь", "Ты пишешь быстро.", "Scrivi velocemente."],
      ["Passato", "писа\u0301л", "Он писал долго.", "Ha scritto a lungo."],
      ["Imperativo", "пиши\u0301", "Пиши мне!", "Scrivimi!"],
    ]),
    vb("люби\u0301ть", "amare, piacere", "imperfettivo", "Prima persona irregolare (люблю), poi regolare (любишь, любит…).", [
      ["Presente – io", "люблю\u0301", "Я люблю музыку.", "Amo la musica."],
      ["Presente – lei", "лю\u0301бит", "Она любит читать.", "Le piace leggere."],
      ["Passato", "люби\u0301л", "Он любил её.", "Lui la amava."],
      ["Negazione", "не люблю\u0301", "Я не люблю рыбу.", "Non amo il pesce."],
    ]),
    vb("знать", "sapere, conoscere", "imperfettivo", "Verbo molto comune, coniugazione regolare.", [
      ["Presente – io", "зна\u0301ю", "Я знаю ответ.", "So la risposta."],
      ["Presente – tu", "зна\u0301ешь", "Ты знаешь его?", "Lo conosci?"],
      ["Passato", "знал", "Я не знал этого.", "Non lo sapevo."],
      ["Negazione", "не зна\u0301ю", "Я не знаю.", "Non lo so."],
    ]),
    vb("идти\u0301", "andare (a piedi, unidirezionale)", "imperfettivo", "Verbo di moto irregolare, usato per un movimento in corso in una direzione.", [
      ["Presente – io", "иду\u0301", "Я иду в школу.", "Vado a scuola."],
      ["Presente – tu", "идёшь", "Куда ты идёшь?", "Dove vai?"],
      ["Passato", "шёл", "Я шёл домой.", "Andavo a casa."],
      ["Imperativo", "иди\u0301", "Иди сюда!", "Vieni qui!"],
    ]),
  ],
  A2: [
    vb("рабо\u0301тать", "lavorare", "imperfettivo", "Verbo regolare in -ать, coniugazione di primo tipo — modello per molti altri verbi.", [
      ["Presente – io", "рабо\u0301таю", "Я работаю в офисе.", "Lavoro in ufficio."],
      ["Presente – lei/lui", "рабо\u0301тает", "Она работает дома.", "Lei lavora da casa."],
      ["Passato", "рабо\u0301тал", "Вчера я работал допоздна.", "Ieri ho lavorato fino a tardi."],
      ["Futuro", "бу\u0301ду рабо\u0301тать", "Завтра я буду работать.", "Domani lavorerò."],
    ]),
    vb("смотре\u0301ть", "guardare", "imperfettivo", "Prima persona con alternanza (смотрю), poi regolare.", [
      ["Presente – io", "смотрю\u0301", "Я смотрю фильм.", "Guardo un film."],
      ["Presente – tu", "смо\u0301тришь", "Что ты смотришь?", "Cosa guardi?"],
      ["Passato", "смотре\u0301л", "Вчера я смотрел новости.", "Ieri ho guardato il telegiornale."],
      ["Imperativo", "смотри\u0301", "Смотри внимательно!", "Guarda attentamente!"],
    ]),
    vb("слы\u0301шать", "sentire, udire", "imperfettivo", "Verbo di percezione, coniugazione con -у alla prima persona.", [
      ["Presente – io", "слы\u0301шу", "Я слышу музыку.", "Sento la musica."],
      ["Presente – lui", "слы\u0301шит", "Он ничего не слышит.", "Lui non sente niente."],
      ["Passato", "слы\u0301шал", "Я слышал новость.", "Ho sentito la notizia."],
      ["Negazione", "не слы\u0301шу", "Я не слышу тебя.", "Non ti sento."],
    ]),
    vb("купи\u0301ть", "comprare", "perfettivo", "Perfettivo di 'покупать' — indica l'acquisto come azione completa.", [
      ["Futuro – io", "куплю\u0301", "Я куплю хлеб.", "Comprerò il pane."],
      ["Futuro – tu", "ку\u0301пишь", "Что ты купишь?", "Cosa comprerai?"],
      ["Passato", "купи\u0301л", "Я купил билет.", "Ho comprato il biglietto."],
      ["Imperativo", "купи\u0301", "Купи молоко!", "Compra il latte!"],
    ]),
    vb("по\u0301мнить", "ricordare", "imperfettivo", "Verbo regolare di seconda coniugazione.", [
      ["Presente – io", "по\u0301мню", "Я помню это.", "Me lo ricordo."],
      ["Presente – tu", "по\u0301мнишь", "Ты помнишь меня?", "Ti ricordi di me?"],
      ["Passato", "по\u0301мнил", "Я не помнил его имя.", "Non ricordavo il suo nome."],
      ["Negazione", "не по\u0301мню", "Я не помню.", "Non ricordo."],
    ]),
    vb("дава\u0301ть", "dare", "imperfettivo", "Coniugazione irregolare (даю, даёшь…), molto usato anche nell'imperativo 'давай' (dai, andiamo).", [
      ["Presente – io", "даю\u0301", "Я даю тебе совет.", "Ti do un consiglio."],
      ["Presente – lei", "даёт", "Она даёт уроки.", "Lei dà lezioni."],
      ["Passato", "дава\u0301л", "Он давал деньги.", "Lui dava soldi."],
      ["Imperativo", "дава\u0301й", "Давай начнём!", "Iniziamo!"],
    ]),
    vb("брать", "prendere", "imperfettivo", "Coniugazione irregolare (беру, берёшь…).", [
      ["Presente – io", "беру\u0301", "Я беру такси.", "Prendo un taxi."],
      ["Presente – tu", "берёшь", "Что ты берёшь?", "Cosa prendi?"],
      ["Passato", "брал", "Я брал книгу в библиотеке.", "Prendevo il libro in biblioteca."],
      ["Imperativo", "бери\u0301", "Бери зонт!", "Prendi l'ombrello!"],
    ]),
  ],
  B1: [
    vb("писа\u0301ть / написа\u0301ть", "scrivere (imperfettivo / perfettivo)", "coppia aspettuale", "L'imperfettivo descrive l'azione in corso o ripetuta, il perfettivo il risultato completato.", [
      ["Presente (impf.) – io", "пишу\u0301", "Я пишу письмо.", "Sto scrivendo una lettera."],
      ["Passato (impf., processo)", "писа\u0301л", "Вчера я долго писал.", "Ieri ho scritto a lungo, senza finire."],
      ["Passato (perf., risultato)", "написа\u0301л", "Я написал письмо.", "Ho scritto la lettera (finita)."],
      ["Futuro (perf.)", "напишу\u0301", "Я напишу тебе завтра.", "Ti scriverò domani."],
    ]),
    vb("реши\u0301ть", "decidere", "perfettivo", "Perfettivo: indica una decisione presa, con risultato.", [
      ["Futuro – io", "решу\u0301", "Я решу эту проблему.", "Risolverò questo problema."],
      ["Passato – lui", "реши\u0301л", "Он решил остаться.", "Ha deciso di restare."],
      ["Passato – lei", "реши\u0301ла", "Она решила уехать.", "Lei ha deciso di partire."],
      ["Condizionale", "реши\u0301л бы", "Я решил бы иначе.", "Deciderei diversamente."],
    ]),
    vb("сове\u0301товать", "consigliare", "imperfettivo", "Regge il dativo della persona consigliata.", [
      ["Presente – io", "сове\u0301тую", "Я советую тебе отдохнуть.", "Ti consiglio di riposarti."],
      ["Presente – lui", "сове\u0301тует", "Врач советует спорт.", "Il medico consiglia lo sport."],
      ["Passato", "сове\u0301товал", "Он советовал мне это.", "Me lo consigliava."],
      ["Imperativo", "посове\u0301туй", "Посоветуй мне книгу.", "Consigliami un libro."],
    ]),
    vb("беспоко\u0301иться", "preoccuparsi", "imperfettivo, riflessivo", "Verbo riflessivo, regge 'о' + prepositivo (preoccuparsi DI qualcosa/qualcuno).", [
      ["Presente – io", "беспоко\u0301юсь", "Я беспокоюсь о тебе.", "Mi preoccupo per te."],
      ["Presente – lei", "беспоко\u0301ится", "Она беспокоится напрасно.", "Si preoccupa inutilmente."],
      ["Passato", "беспоко\u0301ился", "Я беспокоился весь день.", "Mi sono preoccupato tutto il giorno."],
      ["Imperativo (neg.)", "не беспоко\u0301йся", "Не беспокойся!", "Non ti preoccupare!"],
    ]),
    vb("учи\u0301ться", "studiare", "imperfettivo, riflessivo", "Verbo riflessivo: 'studiare' nel senso di frequentare un percorso di studi.", [
      ["Presente – io", "учу\u0301сь", "Я учусь в университете.", "Studio all'università."],
      ["Presente – lui", "у\u0301чится", "Он учится хорошо.", "Lui studia bene."],
      ["Passato", "учи\u0301лся", "Я учился в школе.", "Studiavo a scuola."],
      ["Futuro", "бу\u0301ду учи\u0301ться", "Я буду учиться дальше.", "Continuerò a studiare."],
    ]),
    vb("забы\u0301ть", "dimenticare", "perfettivo", "Perfettivo: l'atto di dimenticare qualcosa in un momento preciso.", [
      ["Futuro – io", "забу\u0301ду", "Я не забуду это.", "Non lo dimenticherò."],
      ["Passato", "забы\u0301л", "Я забыл ключи.", "Ho dimenticato le chiavi."],
      ["Passato – lei", "забы\u0301ла", "Она забыла позвонить.", "Ha dimenticato di chiamare."],
      ["Imperativo (neg.)", "не забу\u0301дь", "Не забудь зонт!", "Non dimenticare l'ombrello!"],
    ]),
    vb("пока\u0301зывать / показа\u0301ть", "mostrare (imperfettivo / perfettivo)", "coppia aspettuale", "Coppia aspettuale comune, regge l'accusativo della cosa mostrata e il dativo della persona.", [
      ["Presente (impf.) – io", "пока\u0301зываю", "Я показываю фотографии.", "Mostro le foto."],
      ["Futuro (perf.) – io", "покажу\u0301", "Я покажу тебе дорогу.", "Ti mostrerò la strada."],
      ["Passato (perf.)", "показа\u0301л", "Он показал документы.", "Ha mostrato i documenti."],
      ["Imperativo", "покажи\u0301", "Покажи мне это!", "Mostramelo!"],
    ]),
  ],
  B2: [
    vb("идти\u0301 / ходи\u0301ть", "andare a piedi (unidirezionale / multidirezionale)", "verbo di moto", "идти: movimento in corso in una direzione precisa; ходить: movimento abituale o in più direzioni.", [
      ["Presente (unidir.) – io", "иду\u0301", "Я иду домой.", "Sto andando a casa (ora, in una direzione)."],
      ["Presente (multidir.) – io", "хожу\u0301", "Я хожу в спортзал по средам.", "Vado in palestra il mercoledì (abitualmente)."],
      ["Passato (unidir.)", "шёл", "Я шёл по улице, когда увидел её.", "Stavo camminando per strada quando l'ho vista."],
      ["Passato (multidir.)", "ходи\u0301л", "В детстве я ходил в эту школу.", "Da bambino andavo in questa scuola."],
    ]),
    vb("получа\u0301ть / получи\u0301ть", "ricevere (imperfettivo / perfettivo)", "coppia aspettuale", "Coppia aspettuale molto comune per azioni di ricezione.", [
      ["Presente (impf.) – io", "получа\u0301ю", "Я получаю письма.", "Ricevo lettere."],
      ["Futuro (perf.) – io", "получу\u0301", "Я получу ответ завтра.", "Riceverò la risposta domani."],
      ["Passato (perf.)", "получи\u0301л", "Он получил диплом.", "Ha ricevuto la laurea."],
      ["Passato (impf., processo)", "получа\u0301л", "Раньше я получал письма от неё.", "Prima ricevevo lettere da lei."],
    ]),
    vb("объясня\u0301ть / объясни\u0301ть", "spiegare (imperfettivo / perfettivo)", "coppia aspettuale", "Coppia aspettuale per l'atto di spiegare qualcosa.", [
      ["Presente (impf.) – io", "объясня\u0301ю", "Я объясняю правило.", "Spiego la regola."],
      ["Futuro (perf.) – io", "объясню\u0301", "Я объясню позже.", "Spiegherò più tardi."],
      ["Passato (perf.)", "объясни\u0301л", "Учитель объяснил тему.", "Il professore ha spiegato l'argomento."],
      ["Imperativo", "объясни\u0301", "Объясни мне это!", "Spiegamelo!"],
    ]),
    vb("сомнева\u0301ться", "dubitare", "imperfettivo, riflessivo", "Regge 'в' + prepositivo (dubitare DI qualcosa).", [
      ["Presente – io", "сомнева\u0301юсь", "Я сомневаюсь в этом.", "Ne dubito."],
      ["Presente – lui", "сомнева\u0301ется", "Он сомневается в себе.", "Lui dubita di sé stesso."],
      ["Passato", "сомнева\u0301лся", "Я сомневался долго.", "Ho dubitato a lungo."],
      ["Negazione", "не сомнева\u0301юсь", "Я не сомневаюсь в тебе.", "Non dubito di te."],
    ]),
    vb("позволя\u0301ть / позво\u0301лить", "permettere (imperfettivo / perfettivo)", "coppia aspettuale", "Regge il dativo della persona e l'infinito dell'azione permessa.", [
      ["Presente (impf.) – io", "позволя\u0301ю", "Я позволяю это.", "Lo permetto."],
      ["Futuro (perf.) – io", "позво\u0301лю", "Я не позволю этого.", "Non lo permetterò."],
      ["Passato (perf.)", "позво\u0301лил", "Он позволил мне остаться.", "Mi ha permesso di restare."],
      ["Condizionale", "позво\u0301лил бы", "Я позволил бы это.", "Lo permetterei."],
    ]),
    vb("замеча\u0301ть / заме\u0301тить", "notare (imperfettivo / perfettivo)", "coppia aspettuale", "Coppia aspettuale per l'atto di accorgersi di qualcosa.", [
      ["Presente (impf.) – io", "замеча\u0301ю", "Я замечаю детали.", "Noto i dettagli."],
      ["Passato (perf.)", "заме\u0301тил", "Я заметил ошибку.", "Ho notato un errore."],
      ["Passato (impf., processo)", "замеча\u0301л", "Раньше я не замечал этого.", "Prima non lo notavo."],
      ["Futuro (perf.)", "заме\u0301чу", "Я замечу разницу.", "Noterò la differenza."],
    ]),
    vb("справля\u0301ться / спра\u0301виться", "farcela, gestire (imperfettivo / perfettivo)", "coppia aspettuale, riflessivo", "Regge 'с' + strumentale (farcela CON qualcosa).", [
      ["Presente (impf.) – io", "справля\u0301юсь", "Я справляюсь с работой.", "Me la cavo con il lavoro."],
      ["Futuro (perf.) – io", "спра\u0301влюсь", "Я справлюсь один.", "Ce la farò da solo."],
      ["Passato (perf.)", "спра\u0301вился", "Он справился с задачей.", "Ha gestito il compito."],
      ["Passato (impf., processo)", "справля\u0301лся", "Раньше я справлялся хуже.", "Prima me la cavavo peggio."],
    ]),
  ],
  C1: [
    vb("занима\u0301ться", "occuparsi di, dedicarsi a", "imperfettivo, riflessivo", "Verbo riflessivo che regge il caso strumentale: ci si dedica A qualcosa espresso allo strumentale.", [
      ["Presente – io", "занима\u0301юсь", "Я занимаюсь спортом каждый день.", "Faccio sport ogni giorno."],
      ["Presente – lui", "занима\u0301ется", "Он занимается музыкой.", "Lui si dedica alla musica."],
      ["Passato", "занима\u0301лся", "В университете она занималась историей.", "All'università si dedicava alla storia."],
      ["Imperativo", "занима\u0301йся", "Занимайся регулярно!", "Allenati regolarmente!"],
    ]),
    vb("представля\u0301ть / предста\u0301вить", "immaginare, presentare (imperfettivo / perfettivo)", "coppia aspettuale", "Verbo con più significati: immaginare, presentare, rappresentare.", [
      ["Presente (impf.) – io", "представля\u0301ю", "Я представляю ситуацию.", "Immagino la situazione."],
      ["Futuro (perf.) – io", "предста\u0301влю", "Я представлю проект.", "Presenterò il progetto."],
      ["Passato (perf.)", "предста\u0301вил", "Он представил доклад.", "Ha presentato la relazione."],
      ["Imperativo", "предста\u0301вь", "Представь себе!", "Immagina!"],
    ]),
    vb("подчёркивать / подчеркну\u0301ть", "sottolineare (imperfettivo / perfettivo)", "coppia aspettuale", "Usato sia letteralmente che in senso figurato (sottolineare un'idea).", [
      ["Presente (impf.) – io", "подчёркиваю", "Я подчёркиваю важность.", "Sottolineo l'importanza."],
      ["Passato (perf.)", "подчеркну\u0301л", "Он подчеркнул это.", "L'ha sottolineato."],
      ["Passato (impf., processo)", "подчёркивал", "Она всегда подчёркивала это.", "Lo sottolineava sempre."],
      ["Futuro (perf.)", "подчеркну\u0301", "Я подчеркну главное.", "Sottolineerò l'essenziale."],
    ]),
    vb("предполага\u0301ть / предположи\u0301ть", "supporre (imperfettivo / perfettivo)", "coppia aspettuale", "Verbo di registro formale/scritto, usato per ipotesi e supposizioni.", [
      ["Presente (impf.) – io", "предполага\u0301ю", "Я предполагаю худшее.", "Suppongo il peggio."],
      ["Passato (perf.)", "предположи\u0301л", "Он предположил ошибку.", "Ha supposto un errore."],
      ["Passato (impf.)", "предполага\u0301л", "Я предполагал это.", "Lo supponevo."],
      ["Condizionale", "предположи\u0301л бы", "Я предположил бы то же самое.", "Supporrei la stessa cosa."],
    ]),
    vb("ста\u0301лкиваться / столкну\u0301ться", "imbattersi in, scontrarsi (imperfettivo / perfettivo)", "coppia aspettuale, riflessivo", "Regge 'с' + strumentale (imbattersi CON qualcosa/qualcuno).", [
      ["Presente (impf.) – io", "ста\u0301лкиваюсь", "Я сталкиваюсь с трудностями.", "Incontro delle difficoltà."],
      ["Passato (perf.)", "столкну\u0301лся", "Я столкнулся с проблемой.", "Mi sono imbattuto in un problema."],
      ["Passato (impf.)", "ста\u0301лкивался", "Раньше я не сталкивался с этим.", "Prima non mi ero mai imbattuto in questo."],
      ["Futuro (perf.)", "столкну\u0301сь", "Я столкнусь с этим снова.", "Mi imbatterò di nuovo in questo."],
    ]),
    vb("приобрета\u0301ть / приобрести\u0301", "acquisire (imperfettivo / perfettivo)", "coppia aspettuale", "Registro elevato: acquisire esperienza, competenze, notorietà.", [
      ["Presente (impf.) – io", "приобрета\u0301ю", "Я приобретаю опыт.", "Acquisisco esperienza."],
      ["Passato (perf.)", "приобрёл", "Он приобрёл известность.", "Ha acquisito notorietà."],
      ["Futuro (perf.)", "приобрету\u0301", "Я приобрету новые навыки.", "Acquisirò nuove competenze."],
      ["Passato (impf.)", "приобрета\u0301л", "Раньше он приобретал книги.", "Prima acquisiva libri."],
    ]),
    vb("возде\u0301рживаться / воздержа\u0301ться", "astenersi (imperfettivo / perfettivo)", "coppia aspettuale, riflessivo", "Registro formale: astenersi dal voto, dai commenti, ecc.", [
      ["Presente (impf.) – io", "возде\u0301рживаюсь", "Я воздерживаюсь от комментариев.", "Mi astengo dai commenti."],
      ["Passato (perf.)", "воздержа\u0301лся", "Он воздержался от голосования.", "Si è astenuto dal voto."],
      ["Imperativo", "воздержи\u0301сь", "Воздержись от критики.", "Astieniti dalla critica."],
      ["Passato (impf.)", "возде\u0301рживался", "Я всегда воздерживался от этого.", "Mi sono sempre astenuto da questo."],
    ]),
  ],
  C2: [
    vb("хоте\u0301ться", "avere voglia (costruzione impersonale)", "imperfettivo, impersonale", "Si usa solo alla 3a persona con il soggetto logico al dativo: 'мне хочется' = letteralmente 'a me si vuole'.", [
      ["Presente", "хо\u0301чется", "Мне хочется спать.", "Mi viene sonno."],
      ["Passato", "хоте\u0301лось", "Ей хотелось плакать.", "Le veniva da piangere."],
      ["Condizionale", "хоте\u0301лось бы", "Мне хотелось бы поехать в Россию.", "Mi piacerebbe andare in Russia."],
      ["Negazione", "не хо\u0301чется", "Мне не хочется работать сегодня.", "Non mi va di lavorare oggi."],
    ]),
    vb("удава\u0301ться / уда\u0301ться", "riuscire (impersonale, imperfettivo / perfettivo)", "impersonale", "Costruzione impersonale con dativo: 'мне удаётся' = 'io riesco a' (lett. 'a me riesce').", [
      ["Presente (impf.)", "удаётся", "Мне удаётся всё успевать.", "Riesco a fare tutto in tempo."],
      ["Passato (perf.)", "удало\u0301сь", "Ему удалось убедить её.", "È riuscito a convincerla."],
      ["Passato (impf.)", "удава\u0301лось", "Раньше это не удавалось.", "Prima non ci si riusciva."],
      ["Futuro (perf.)", "уда\u0301стся", "Посмотрим, удастся ли это.", "Vedremo se ci riuscirà."],
    ]),
    vb("каза\u0301ться", "sembrare", "imperfettivo", "Spesso impersonale con dativo: 'мне кажется' = 'mi sembra'.", [
      ["Presente", "ка\u0301жется", "Мне кажется, что он прав.", "Mi sembra che lui abbia ragione."],
      ["Passato", "каза\u0301лось", "Мне казалось это странным.", "Mi sembrava strano."],
      ["Condizionale", "каза\u0301лось бы", "Казалось бы, всё просто.", "Sembrerebbe che sia tutto semplice."],
      ["Futuro", "бу\u0301дет каза\u0301ться", "Это будет казаться сложным.", "Sembrerà difficile."],
    ]),
    vb("приходи\u0301ться / прийти\u0301сь", "essere costretti a, toccare (impersonale)", "impersonale", "Costruzione impersonale con dativo: 'мне приходится' = 'devo/mi tocca'.", [
      ["Presente (impf.)", "прихо\u0301дится", "Мне приходится рано вставать.", "Devo alzarmi presto."],
      ["Passato (perf.)", "пришло\u0301сь", "Ему пришлось уйти.", "Ha dovuto andarsene."],
      ["Passato (impf.)", "приходи\u0301лось", "Раньше приходилось экономить.", "Prima bisognava risparmiare."],
      ["Futuro (perf.)", "придётся", "Придётся подождать.", "Bisognerà aspettare."],
    ]),
    vb("везти\u0301 / повезти\u0301", "essere fortunati (impersonale)", "impersonale", "Costruzione impersonale con dativo: 'мне везёт' = 'sono fortunato'.", [
      ["Presente (impf.)", "везёт", "Мне везёт в жизни.", "Sono fortunato nella vita."],
      ["Passato (perf.)", "повезло\u0301", "Ему повезло.", "È stato fortunato."],
      ["Negazione", "не везёт", "Мне не везёт сегодня.", "Oggi non sono fortunato."],
      ["Passato (impf.)", "везло\u0301", "Раньше мне везло больше.", "Prima ero più fortunato."],
    ]),
    vb("сто\u0301ить", "valere (la pena)", "imperfettivo", "Costruzione impersonale con infinito: 'стоит попробовать' = 'vale la pena provare'.", [
      ["Presente", "сто\u0301ит", "Стоит попробовать.", "Vale la pena provare."],
      ["Negazione", "не сто\u0301ит", "Не стоит беспокоиться.", "Non vale la pena preoccuparsi."],
      ["Passato", "сто\u0301ило", "Стоило бы подумать раньше.", "Sarebbe valso la pena pensarci prima."],
      ["Condizionale", "сто\u0301ило бы", "Стоило бы попробовать.", "Varrebbe la pena provare."],
    ]),
    vb("хвата\u0301ть / хвати\u0301ть", "bastare, essere sufficiente (impersonale)", "impersonale", "Costruzione impersonale con genitivo: 'не хватает времени' = 'manca il tempo'.", [
      ["Presente (impf.)", "хвата\u0301ет", "Мне не хватает времени.", "Non ho abbastanza tempo."],
      ["Passato (perf.)", "хвати\u0301ло", "Денег хватило.", "I soldi sono bastati."],
      ["Negazione", "не хвата\u0301ет", "Не хватает слов.", "Mancano le parole."],
      ["Imperativo (idiom.)", "хва\u0301тит!", "Хватит!", "Basta!"],
    ]),
  ],
};

function pg(pattern, pattern_it, phrases) {
  return { pattern, pattern_it, phrases: phrases.map(([ru, it]) => ({ ru, it })) };
}

const PHRASE_GROUPS = {
  A1: [
    pg("У меня есть ___", "Ho un/una... (letteralmente: presso di me c'è...)", [
      ["У меня есть брат.", "Ho un fratello."],
      ["У меня есть сестра.", "Ho una sorella."],
      ["У меня есть книга.", "Ho un libro."],
      ["У меня есть время.", "Ho tempo."],
      ["У меня есть машина.", "Ho una macchina."],
    ]),
    pg("Это ___", "Questo/a è... (identificare qualcosa)", [
      ["Это стол.", "Questo è un tavolo."],
      ["Это книга.", "Questo è un libro."],
      ["Это окно.", "Questa è una finestra."],
      ["Это моя мама.", "Questa è mia madre."],
      ["Это чай.", "Questo è tè."],
    ]),
    pg("Мне нравится ___", "Mi piace...", [
      ["Мне нравится чай.", "Mi piace il tè."],
      ["Мне нравится музыка.", "Mi piace la musica."],
      ["Мне нравится этот город.", "Mi piace questa città."],
      ["Мне нравится гулять.", "Mi piace passeggiare."],
      ["Мне нравится русский язык.", "Mi piace la lingua russa."],
    ]),
    pg("Где ___?", "Dov'è...?", [
      ["Где банк?", "Dov'è la banca?"],
      ["Где туалет?", "Dov'è il bagno?"],
      ["Где вокзал?", "Dov'è la stazione?"],
      ["Где ты?", "Dove sei?"],
      ["Где моя книга?", "Dov'è il mio libro?"],
    ]),
    pg("Сколько стоит ___?", "Quanto costa...?", [
      ["Сколько стоит хлеб?", "Quanto costa il pane?"],
      ["Сколько стоит билет?", "Quanto costa il biglietto?"],
      ["Сколько стоит такси?", "Quanto costa il taxi?"],
      ["Сколько стоит номер?", "Quanto costa la camera?"],
      ["Сколько стоит кофе?", "Quanto costa il caffè?"],
    ]),
    pg("Я не понимаю ___", "Non capisco...", [
      ["Я не понимаю это слово.", "Non capisco questa parola."],
      ["Я не понимаю тебя.", "Non ti capisco."],
      ["Я не понимаю вопрос.", "Non capisco la domanda."],
      ["Я не понимаю по-русски.", "Non capisco il russo."],
      ["Я не понимаю это правило.", "Non capisco questa regola."],
    ]),
    pg("Можно ___?", "Posso...? (chiedere permesso)", [
      ["Можно войти?", "Posso entrare?"],
      ["Можно спросить?", "Posso chiedere?"],
      ["Можно сесть?", "Posso sedermi?"],
      ["Можно посмотреть?", "Posso guardare?"],
      ["Можно попробовать?", "Posso provare?"],
    ]),
  ],
  A2: [
    pg("Я хочу ___", "Voglio...", [
      ["Я хочу есть.", "Voglio mangiare."],
      ["Я хочу пить.", "Voglio bere."],
      ["Я хочу спать.", "Voglio dormire."],
      ["Я хочу домой.", "Voglio andare a casa."],
      ["Я хочу отдохнуть.", "Voglio riposarmi."],
    ]),
    pg("Вчера я ___", "Ieri io... (passato)", [
      ["Вчера я работал.", "Ieri ho lavorato."],
      ["Вчера я гулял.", "Ieri ho passeggiato."],
      ["Вчера я читал книгу.", "Ieri ho letto un libro."],
      ["Вчера я звонил маме.", "Ieri ho chiamato mia madre."],
      ["Вчера я готовил ужин.", "Ieri ho preparato la cena."],
    ]),
    pg("Завтра я буду ___", "Domani io... (futuro)", [
      ["Завтра я буду отдыхать.", "Domani mi riposerò."],
      ["Завтра я буду работать.", "Domani lavorerò."],
      ["Завтра я буду учиться.", "Domani studierò."],
      ["Завтра я буду готовить.", "Domani cucinerò."],
      ["Завтра я буду путешествовать.", "Domani viaggerò."],
    ]),
    pg("Мне нужно ___", "Ho bisogno di / devo...", [
      ["Мне нужно позвонить.", "Devo telefonare."],
      ["Мне нужно купить хлеб.", "Devo comprare il pane."],
      ["Мне нужно отдохнуть.", "Ho bisogno di riposarmi."],
      ["Мне нужно учиться.", "Devo studiare."],
      ["Мне нужно найти работу.", "Devo trovare lavoro."],
    ]),
    pg("Извините, где ___?", "Mi scusi, dov'è...? (forma cortese)", [
      ["Извините, где аптека?", "Mi scusi, dov'è la farmacia?"],
      ["Извините, где остановка?", "Mi scusi, dov'è la fermata?"],
      ["Извините, где выход?", "Mi scusi, dov'è l'uscita?"],
      ["Извините, где касса?", "Mi scusi, dov'è la cassa?"],
      ["Извините, где парковка?", "Mi scusi, dov'è il parcheggio?"],
    ]),
    pg("Я думаю, что ___", "Penso che...", [
      ["Я думаю, что это хорошо.", "Penso che sia una buona cosa."],
      ["Я думаю, что он прав.", "Penso che lui abbia ragione."],
      ["Я думаю, что будет дождь.", "Penso che pioverà."],
      ["Я думаю, что это интересно.", "Penso che sia interessante."],
      ["Я думаю, что мы опоздаем.", "Penso che faremo tardi."],
    ]),
    pg("У меня болит ___", "Mi fa male...", [
      ["У меня болит голова.", "Mi fa male la testa."],
      ["У меня болит горло.", "Mi fa male la gola."],
      ["У меня болит живот.", "Mi fa male la pancia."],
      ["У меня болит спина.", "Mi fa male la schiena."],
      ["У меня болит зуб.", "Mi fa male un dente."],
    ]),
  ],
  B1: [
    pg("Если бы я мог, я бы ___", "Se potessi, ... (condizionale irreale)", [
      ["Если бы я мог, я бы путешествовал.", "Se potessi, viaggerei."],
      ["Если бы я мог, я бы отдохнул.", "Se potessi, mi riposerei."],
      ["Если бы я мог, я бы помог.", "Se potessi, aiuterei."],
      ["Если бы я мог, я бы остался.", "Se potessi, resterei."],
      ["Если бы я мог, я бы переехал.", "Se potessi, mi trasferirei."],
    ]),
    pg("Когда я был маленьким, я ___", "Quando ero piccolo, io... (passato abituale)", [
      ["Когда я был маленьким, я жил в деревне.", "Quando ero piccolo, vivevo in campagna."],
      ["Когда я был маленьким, я боялся собак.", "Quando ero piccolo, avevo paura dei cani."],
      ["Когда я был маленьким, я мечтал стать врачом.", "Quando ero piccolo, sognavo di diventare medico."],
      ["Когда я был маленьким, я много читал.", "Quando ero piccolo, leggevo molto."],
      ["Когда я был маленьким, я не любил овощи.", "Quando ero piccolo, non amavo le verdure."],
    ]),
    pg("Мне кажется, что ___", "Mi sembra che...", [
      ["Мне кажется, что она права.", "Mi sembra che lei abbia ragione."],
      ["Мне кажется, что это ошибка.", "Mi sembra che sia un errore."],
      ["Мне кажется, что он устал.", "Mi sembra che lui sia stanco."],
      ["Мне кажется, что мы опаздываем.", "Mi sembra che stiamo facendo tardi."],
      ["Мне кажется, что это сложно.", "Mi sembra che sia difficile."],
    ]),
    pg("Хотя ___", "Sebbene / anche se...", [
      ["Хотя было холодно, мы гуляли.", "Anche se faceva freddo, abbiamo passeggiato."],
      ["Хотя я устал, я закончил работу.", "Anche se ero stanco, ho finito il lavoro."],
      ["Хотя это трудно, я попробую.", "Anche se è difficile, ci proverò."],
      ["Хотя он молодой, он умный.", "Sebbene sia giovane, è intelligente."],
      ["Хотя шёл дождь, матч продолжался.", "Anche se pioveva, la partita continuava."],
    ]),
    pg("Я привык ___", "Sono abituato a...", [
      ["Я привык рано вставать.", "Sono abituato ad alzarmi presto."],
      ["Я привык работать много.", "Sono abituato a lavorare molto."],
      ["Я привык жить один.", "Sono abituato a vivere da solo."],
      ["Я привык пить кофе утром.", "Sono abituato a bere caffè al mattino."],
      ["Я привык к этому городу.", "Mi sono abituato a questa città."],
    ]),
    pg("Что если ___?", "E se...?", [
      ["Что если пойдёт дождь?", "E se piovesse?"],
      ["Что если я опоздаю?", "E se facessi tardi?"],
      ["Что если он не придёт?", "E se lui non venisse?"],
      ["Что если это неправда?", "E se non fosse vero?"],
      ["Что если мы заблудимся?", "E se ci perdessimo?"],
    ]),
    pg("Раньше я ___", "Prima io... (abitudine passata, ora cambiata)", [
      ["Раньше я курил.", "Prima fumavo."],
      ["Раньше я жил в Москве.", "Prima vivevo a Mosca."],
      ["Раньше я не любил спорт.", "Prima non amavo lo sport."],
      ["Раньше я работал учителем.", "Prima lavoravo come insegnante."],
      ["Раньше я боялся летать.", "Prima avevo paura di volare."],
    ]),
  ],
  B2: [
    pg("Несмотря на ___, ...", "Nonostante..., ...", [
      ["Несмотря на дождь, я пошёл гулять.", "Nonostante la pioggia, sono andato a fare una passeggiata."],
      ["Несмотря на усталость, она работала.", "Nonostante la stanchezza, lei lavorava."],
      ["Несмотря на трудности, мы справились.", "Nonostante le difficoltà, ce l'abbiamo fatta."],
      ["Несмотря на возраст, он бегает каждый день.", "Nonostante l'età, corre ogni giorno."],
      ["Несмотря на проблемы, она улыбалась.", "Nonostante i problemi, sorrideva."],
    ]),
    pg("Судя по всему, ___", "A quanto pare...", [
      ["Судя по всему, он опоздает.", "A quanto pare, farà tardi."],
      ["Судя по всему, будет дождь.", "A quanto pare, pioverà."],
      ["Судя по всему, это правда.", "A quanto pare, è vero."],
      ["Судя по всему, мы не успеем.", "A quanto pare, non faremo in tempo."],
      ["Судя по всему, она права.", "A quanto pare, lei ha ragione."],
    ]),
    pg("Чем больше ___, тем ___", "Più..., più... (comparativo proporzionale)", [
      ["Чем больше я учусь, тем больше я знаю.", "Più studio, più imparo."],
      ["Чем раньше, тем лучше.", "Prima è, meglio è."],
      ["Чем дольше ждёшь, тем труднее.", "Più aspetti, più è difficile."],
      ["Чем сложнее задача, тем интереснее.", "Più il compito è difficile, più è interessante."],
      ["Чем меньше слов, тем яснее мысль.", "Meno parole, più chiaro il pensiero."],
    ]),
    pg("Как бы то ни было, ___", "Comunque sia, ...", [
      ["Как бы то ни было, надо действовать.", "Comunque sia, bisogna agire."],
      ["Как бы то ни было, я попробую.", "Comunque sia, ci proverò."],
      ["Как бы то ни было, решение принято.", "Comunque sia, la decisione è presa."],
      ["Как бы то ни было, время идёт.", "Comunque sia, il tempo passa."],
      ["Как бы то ни было, мы справимся.", "Comunque sia, ce la faremo."],
    ]),
    pg("Вряд ли ___", "È improbabile che...", [
      ["Вряд ли он придёт.", "È improbabile che venga."],
      ["Вряд ли это возможно.", "È improbabile che sia possibile."],
      ["Вряд ли мы успеем.", "È improbabile che facciamo in tempo."],
      ["Вряд ли она согласится.", "È improbabile che accetti."],
      ["Вряд ли это поможет.", "È improbabile che aiuti."],
    ]),
    pg("Стоит ли ___?", "Vale la pena...?", [
      ["Стоит ли рисковать?", "Vale la pena rischiare?"],
      ["Стоит ли ждать?", "Vale la pena aspettare?"],
      ["Стоит ли переживать?", "Vale la pena preoccuparsi?"],
      ["Стоит ли это делать?", "Vale la pena farlo?"],
      ["Стоит ли верить ему?", "Vale la pena credergli?"],
    ]),
    pg("В отличие от ___, ...", "A differenza di..., ...", [
      ["В отличие от брата, я люблю спорт.", "A differenza di mio fratello, amo lo sport."],
      ["В отличие от вчерашнего дня, сегодня тепло.", "A differenza di ieri, oggi fa caldo."],
      ["В отличие от других, он честный.", "A differenza degli altri, lui è onesto."],
      ["В отличие от плана, всё изменилось.", "A differenza del piano, tutto è cambiato."],
      ["В отличие от меня, она смелая.", "A differenza mia, lei è coraggiosa."],
    ]),
  ],
  C1: [
    pg("..., участвующий в конструкции с причастием", "Frasi con participio invece di 'который' (che)", [
      ["Человек, читающий книгу, — мой друг.", "L'uomo che sta leggendo un libro è mio amico."],
      ["Девушка, работающая здесь, очень умная.", "La ragazza che lavora qui è molto intelligente."],
      ["Студент, сдавший экзамен, был счастлив.", "Lo studente che ha superato l'esame era felice."],
      ["Дом, построенный в прошлом году, красивый.", "La casa costruita l'anno scorso è bella."],
      ["Книга, написанная известным автором, стала бестселлером.", "Il libro scritto da un autore famoso è diventato un bestseller."],
    ]),
    pg("Как известно, ___", "Come è noto, ...", [
      ["Как известно, зима холодная.", "Come è noto, l'inverno è freddo."],
      ["Как известно, он гений.", "Come è noto, lui è un genio."],
      ["Как известно, деньги не растут на деревьях.", "Come è noto, i soldi non crescono sugli alberi."],
      ["Как известно, время лечит.", "Come è noto, il tempo guarisce."],
      ["Как известно, это невозможно.", "Come è noto, è impossibile."],
    ]),
    pg("Если бы не ___, то ___", "Se non fosse stato per..., allora...", [
      ["Если бы не дождь, мы бы пошли гулять.", "Se non fosse stato per la pioggia, saremmo andati a passeggiare."],
      ["Если бы не ты, я бы не справился.", "Se non fosse stato per te, non ce l'avrei fatta."],
      ["Если бы не работа, я бы уехал.", "Se non fosse stato per il lavoro, sarei partito."],
      ["Если бы не он, мы бы опоздали.", "Se non fosse stato per lui, avremmo fatto tardi."],
      ["Если бы не деньги, я бы путешествовал.", "Se non fosse stato per i soldi, avrei viaggiato."],
    ]),
    pg("Не только ___, но и ___", "Non solo..., ma anche...", [
      ["Она не только умная, но и добрая.", "Lei non è solo intelligente, ma anche gentile."],
      ["Он не только опоздал, но и забыл документы.", "Lui non solo ha fatto tardi, ma ha anche dimenticato i documenti."],
      ["Это не только сложно, но и дорого.", "Non è solo difficile, ma anche costoso."],
      ["Мы не только устали, но и проголодались.", "Non solo eravamo stanchi, ma anche affamati."],
      ["Я не только читаю, но и пишу.", "Non solo leggo, ma scrivo anche."],
    ]),
    pg("Вместо того чтобы ___, он ___", "Invece di..., lui...", [
      ["Вместо того чтобы отдыхать, он работал.", "Invece di riposarsi, lavorava."],
      ["Вместо того чтобы звонить, она написала письмо.", "Invece di telefonare, ha scritto una lettera."],
      ["Вместо того чтобы плакать, она улыбнулась.", "Invece di piangere, ha sorriso."],
      ["Вместо того чтобы ждать, он ушёл.", "Invece di aspettare, se n'è andato."],
      ["Вместо того чтобы согласиться, он отказался.", "Invece di accettare, ha rifiutato."],
    ]),
    pg("Едва ___, как ___", "Appena..., che...", [
      ["Едва он вошёл, как зазвонил телефон.", "Appena è entrato, ha squillato il telefono."],
      ["Едва она села, как поезд тронулся.", "Appena si è seduta, il treno è partito."],
      ["Едва я заснул, как меня разбудили.", "Appena mi sono addormentato, mi hanno svegliato."],
      ["Едва начался дождь, как мы спрятались.", "Appena ha iniziato a piovere, ci siamo riparati."],
      ["Едва закончился фильм, как все захлопали.", "Appena finito il film, tutti hanno applaudito."],
    ]),
    pg("Чтобы ___, нужно ___", "Per..., bisogna... (proposizione finale)", [
      ["Чтобы сдать экзамен, нужно готовиться.", "Per superare l'esame, bisogna prepararsi."],
      ["Чтобы похудеть, нужно меньше есть.", "Per dimagrire, bisogna mangiare meno."],
      ["Чтобы выучить язык, нужно практиковаться.", "Per imparare una lingua, bisogna esercitarsi."],
      ["Чтобы получить визу, нужно собрать документы.", "Per ottenere il visto, bisogna raccogliere i documenti."],
      ["Чтобы добиться успеха, нужно много трудиться.", "Per avere successo, bisogna lavorare molto."],
    ]),
  ],
  C2: [
    pg("..., particella 'же' per rafforzare", "Enfasi con же — 'lo sai bene', 'no?!'", [
      ["Ты же знаешь, что это правда.", "Lo sai bene che è vero."],
      ["Мы же договорились!", "Ci eravamo messi d'accordo, no?!"],
      ["Он же обещал прийти.", "Aveva promesso di venire, no?"],
      ["Это же очевидно!", "È ovvio, no?!"],
      ["Ты же не серьёзно!", "Non sarai mica serio!"],
    ]),
    pg("Он-то ___", "Particella -то: proprio lui/lei, in contrasto con altri", [
      ["Он-то знал правду.", "Lui, in particolare, sapeva la verità."],
      ["Она-то согласна.", "Lei, almeno, è d'accordo."],
      ["Мы-то готовы.", "Noi, quantomeno, siamo pronti."],
      ["Ты-то что думаешь?", "Tu, invece, cosa ne pensi?"],
      ["Они-то не виноваты.", "Loro, almeno, non hanno colpa."],
    ]),
    pg("Ведь ___", "Dopotutto, .../ Ma...", [
      ["Ведь я говорил тебе!", "Te l'avevo detto, dopotutto!"],
      ["Ведь это очевидно.", "Dopotutto, è ovvio."],
      ["Ведь мы договорились.", "Dopotutto, ci eravamo messi d'accordo."],
      ["Ведь время дорого.", "Dopotutto, il tempo è prezioso."],
      ["Ведь он твой друг.", "Dopotutto, è tuo amico."],
    ]),
    pg("Как ни ___, а ___", "Per quanto..., comunque...", [
      ["Как ни старайся, а не получится.", "Per quanto tu ci provi, non ci riuscirai."],
      ["Как ни странно, всё сработало.", "Per quanto strano possa sembrare, ha funzionato tutto."],
      ["Как ни трудно, мы справимся.", "Per quanto sia difficile, ce la faremo."],
      ["Как ни устал, я закончил.", "Per quanto stanco fossi, ho finito."],
      ["Как ни жаль, надо идти.", "Per quanto dispiaccia, bisogna andare."],
    ]),
    pg("Что ни говори, а ___", "Si dica quel che si vuole, ma...", [
      ["Что ни говори, а он прав.", "Si dica quel che si vuole, ma lui ha ragione."],
      ["Что ни говори, а это красиво.", "Si dica quel che si vuole, ma è bello."],
      ["Что ни говори, а работа сделана.", "Si dica quel che si vuole, ma il lavoro è fatto."],
      ["Что ни говори, а жизнь хороша.", "Si dica quel che si vuole, ma la vita è bella."],
      ["Что ни говори, а мы старались.", "Si dica quel che si vuole, ma ci abbiamo provato."],
    ]),
    pg("Мало ли ___", "Chissà.../ Non si sa mai...", [
      ["Мало ли что случится.", "Chissà cosa potrebbe succedere."],
      ["Мало ли кто придёт.", "Chissà chi potrebbe venire."],
      ["Мало ли зачем он звонил.", "Chissà perché ha chiamato."],
      ["Мало ли где он был.", "Chissà dov'era."],
      ["Мало ли что он скажет.", "Chissà cosa dirà."],
    ]),
    pg("Пускай ___", "Che sia pure.../ Lascia che...", [
      ["Пускай будет так.", "Che sia così."],
      ["Пускай он придёт.", "Che venga pure."],
      ["Пускай думают что хотят.", "Che pensino quel che vogliono."],
      ["Пускай это будет уроком.", "Che questo sia una lezione."],
      ["Пускай всё получится.", "Speriamo che vada tutto bene."],
    ]),
  ],
};

function cf(it, ru, tokens) {
  return { it, ru, tokens };
}

const COMPOSE_GROUPS = {
  A1: [
    {
      theme: "Presentarsi",
      items: [
        cf("Mi chiamo Marco.", "Меня зовут Марко.", ["Марко.", "зовут", "Меня"]),
        cf("Sono di Roma.", "Я из Рима.", ["Рима.", "из", "Я"]),
        cf("Ho vent'anni.", "Мне двадцать лет.", ["лет.", "двадцать", "Мне"]),
        cf("Piacere di conoscerti.", "Приятно познакомиться.", ["познакомиться.", "Приятно"]),
        cf("Sono studente.", "Я студент.", ["студент.", "Я"]),
      ],
    },
    {
      theme: "La famiglia",
      items: [
        cf("Questo è mio padre.", "Это мой отец.", ["отец.", "мой", "Это"]),
        cf("Ho due fratelli.", "У меня два брата.", ["брата.", "два", "меня", "У"]),
        cf("Lei è mia madre.", "Она моя мать.", ["мать.", "моя", "Она"]),
        cf("Amo la mia famiglia.", "Я люблю свою семью.", ["семью.", "свою", "люблю", "Я"]),
        cf("Ho un cane.", "У меня есть собака.", ["собака.", "есть", "меня", "У"]),
      ],
    },
    {
      theme: "I numeri e l'ora",
      items: [
        cf("Sono le tre.", "Сейчас три часа.", ["часа.", "три", "Сейчас"]),
        cf("Ho due gatti.", "У меня два кота.", ["кота.", "два", "меня", "У"]),
        cf("È il primo gennaio.", "Сегодня первое января.", ["января.", "первое", "Сегодня"]),
        cf("Costa cento rubli.", "Это стоит сто рублей.", ["рублей.", "сто", "стоит", "Это"]),
        cf("Ho trent'anni.", "Мне тридцать лет.", ["лет.", "тридцать", "Мне"]),
      ],
    },
    {
      theme: "La casa",
      items: [
        cf("Ecco la mia casa.", "Вот мой дом.", ["Вот","мой","дом."]),
        cf("Questo è il salotto.", "Это гостиная.", ["Это","гостиная."]),
        cf("La cucina è piccola.", "Кухня маленькая.", ["Кухня","маленькая."]),
        cf("Il letto è comodo.", "Кровать удобная.", ["Кровать","удобная."]),
        cf("La porta è aperta.", "Дверь открыта.", ["Дверь","открыта."]),
      ],
    },
    {
      theme: "Il cibo",
      items: [
        cf("Mi piace la pizza.", "Мне нравится пицца.", ["Мне","нравится","пицца."]),
        cf("Io bevo acqua.", "Я пью воду.", ["Я","пью","воду."]),
        cf("Io mangio la mela.", "Я ем яблоко.", ["Я","ем","яблоко."]),
        cf("Il pane è caldo.", "Хлеб тёплый.", ["Хлеб","тёплый."]),
        cf("Io voglio il tè.", "Я хочу чай.", ["Я","хочу","чай."]),
      ],
    },
    {
      theme: "I colori",
      items: [
        cf("Il cielo è blu.", "Небо голубое.", ["Небо","голубое."]),
        cf("L'erba è verde.", "Трава зелёная.", ["Трава","зелёная."]),
        cf("La mela è rossa.", "Яблоко красное.", ["Яблоко","красное."]),
        cf("Il sole è giallo.", "Солнце жёлтое.", ["Солнце","жёлтое."]),
        cf("La notte è nera.", "Ночь чёрная.", ["Ночь","чёрная."]),
      ],
    },
    {
      theme: "I giorni della settimana",
      items: [
        cf("Oggi è lunedì.", "Сегодня понедельник.", ["Сегодня","понедельник."]),
        cf("Domani è martedì.", "Завтра вторник.", ["Завтра","вторник."]),
        cf("Sabato io riposo.", "В субботу я отдыхаю.", ["В","субботу","я","отдыхаю."]),
        cf("Domenica io lavoro?", "В воскресенье я работаю?", ["В","воскресенье","я","работаю?"]),
        cf("Venerdì è bello.", "Пятница хорошая.", ["Пятница","хорошая."]),
      ],
    },
  ],
  A2: [
    {
      theme: "Al ristorante",
      items: [
        cf("Vorrei un caffè.", "Я хочу кофе.", ["кофе.", "хочу", "Я"]),
        cf("Il conto, per favore.", "Счёт, пожалуйста.", ["пожалуйста.", "Счёт,"]),
        cf("È molto buono.", "Это очень вкусно.", ["вкусно.", "очень", "Это"]),
        cf("Posso avere l'acqua?", "Можно воды?", ["воды?", "Можно"]),
        cf("Il pane è fresco.", "Хлеб свежий.", ["свежий.", "Хлеб"]),
      ],
    },
    {
      theme: "In viaggio",
      items: [
        cf("Dov'è la stazione?", "Где вокзал?", ["вокзал?", "Где"]),
        cf("Ho perso il treno.", "Я опоздал на поезд.", ["поезд.", "на", "опоздал", "Я"]),
        cf("Quanto costa il biglietto?", "Сколько стоит билет?", ["билет?", "стоит", "Сколько"]),
        cf("Il volo è in ritardo.", "Рейс задерживается.", ["задерживается.", "Рейс"]),
        cf("Ho una valigia pesante.", "У меня тяжёлый чемодан.", ["чемодан.", "тяжёлый", "меня", "У"]),
      ],
    },
    {
      theme: "Fare acquisti",
      items: [
        cf("Quanto costa questo?", "Сколько это стоит?", ["стоит?", "это", "Сколько"]),
        cf("Posso provarlo?", "Можно это примерить?", ["примерить?", "это", "Можно"]),
        cf("È troppo caro.", "Это слишком дорого.", ["дорого.", "слишком", "Это"]),
        cf("Avete una taglia più piccola?", "У вас есть размер меньше?", ["меньше?", "размер", "есть", "вас", "У"]),
        cf("Accettate carte di credito?", "Вы принимаете карты?", ["карты?", "принимаете", "Вы"]),
      ],
    },
    {
      theme: "Al telefono",
      items: [
        cf("Pronto, chi parla?", "Алло, кто это?", ["Алло,","кто","это?"]),
        cf("Ti richiamo più tardi.", "Я перезвоню позже.", ["Я","перезвоню","позже."]),
        cf("Io non ho campo.", "У меня нет сети.", ["У","меня","нет","сети."]),
        cf("Puoi ripetere?", "Можешь повторить?", ["Можешь","повторить?"]),
        cf("La linea è occupata.", "Линия занята.", ["Линия","занята."]),
      ],
    },
    {
      theme: "Le previsioni del tempo",
      items: [
        cf("Domani pioverà.", "Завтра будет дождь.", ["Завтра","будет","дождь."]),
        cf("Fa molto freddo.", "Очень холодно.", ["Очень","холодно."]),
        cf("Il sole splende.", "Солнце светит.", ["Солнце","светит."]),
        cf("C'è vento forte.", "Дует сильный ветер.", ["Дует","сильный","ветер."]),
        cf("Nevica in montagna.", "В горах идёт снег.", ["В","горах","идёт","снег."]),
      ],
    },
    {
      theme: "Le faccende domestiche",
      items: [
        cf("Devo lavare i piatti.", "Мне нужно помыть посуду.", ["Мне","нужно","помыть","посуду."]),
        cf("Io pulisco la casa.", "Я убираю дом.", ["Я","убираю","дом."]),
        cf("Io faccio il bucato.", "Я стираю бельё.", ["Я","стираю","бельё."]),
        cf("Io butto la spazzatura.", "Я выношу мусор.", ["Я","выношу","мусор."]),
        cf("Io stiro le camicie.", "Я глажу рубашки.", ["Я","глажу","рубашки."]),
      ],
    },
    {
      theme: "Le indicazioni stradali",
      items: [
        cf("Gira a destra.", "Поверни направо.", ["Поверни","направо."]),
        cf("Vai dritto.", "Иди прямо.", ["Иди","прямо."]),
        cf("È vicino qui.", "Это близко отсюда.", ["Это","близко","отсюда."]),
        cf("È lontano da qui.", "Это далеко отсюда.", ["Это","далеко","отсюда."]),
        cf("Attraversa la strada.", "Перейди улицу.", ["Перейди","улицу."]),
      ],
    },
  ],
  B1: [
    {
      theme: "Progetti futuri",
      items: [
        cf("Domani andrò al lavoro.", "Завтра я пойду на работу.", ["работу.", "на", "пойду", "я", "Завтра"]),
        cf("Spero che tutto vada bene.", "Надеюсь, что всё будет хорошо.", ["хорошо.", "будет", "всё", "что", "Надеюсь,"]),
        cf("Se avrò tempo, ti chiamerò.", "Если у меня будет время, я тебе позвоню.", ["позвоню.", "тебе", "я", "время,", "будет", "меня", "у", "Если"]),
        cf("Vorrei cambiare lavoro.", "Я хотел бы сменить работу.", ["работу.", "сменить", "бы", "хотел", "Я"]),
        cf("Studierò il russo ogni giorno.", "Я буду учить русский каждый день.", ["день.", "каждый", "русский", "учить", "буду", "Я"]),
      ],
    },
    {
      theme: "Al lavoro",
      items: [
        cf("Ho una riunione alle dieci.", "У меня встреча в десять.", ["десять.", "в", "встреча", "меня", "У"]),
        cf("Devo finire questo progetto.", "Мне нужно закончить этот проект.", ["проект.", "этот", "закончить", "нужно", "Мне"]),
        cf("Il mio capo è severo.", "Мой начальник строгий.", ["строгий.", "начальник", "Мой"]),
        cf("Lavoriamo in squadra.", "Мы работаем в команде.", ["команде.", "в", "работаем", "Мы"]),
        cf("Devo scrivere una mail.", "Мне нужно написать письмо.", ["письмо.", "написать", "нужно", "Мне"]),
      ],
    },
    {
      theme: "La salute",
      items: [
        cf("Non mi sento bene.", "Я плохо себя чувствую.", ["чувствую.", "себя", "плохо", "Я"]),
        cf("Ho mal di testa.", "У меня болит голова.", ["голова.", "болит", "меня", "У"]),
        cf("Devo andare dal medico.", "Мне нужно пойти к врачу.", ["врачу.", "к", "пойти", "нужно", "Мне"]),
        cf("Mi sono ripreso velocemente.", "Я быстро выздоровел.", ["выздоровел.", "быстро", "Я"]),
        cf("Ho preso un raffreddore.", "Я простудился.", ["простудился.", "Я"]),
      ],
    },
    {
      theme: "Le vacanze",
      items: [
        cf("Andremo al mare quest'estate.", "Мы поедем на море этим летом.", ["Мы","поедем","на","море","этим","летом."]),
        cf("Io prenoto un hotel.", "Я бронирую отель.", ["Я","бронирую","отель."]),
        cf("Il volo parte presto.", "Рейс вылетает рано.", ["Рейс","вылетает","рано."]),
        cf("Io faccio le valige.", "Я собираю чемоданы.", ["Я","собираю","чемоданы."]),
        cf("Torniamo tra due settimane.", "Мы вернёмся через две недели.", ["Мы","вернёмся","через","две","недели."]),
      ],
    },
    {
      theme: "Gli hobby",
      items: [
        cf("Mi piace dipingere.", "Мне нравится рисовать.", ["Мне","нравится","рисовать."]),
        cf("Io suono la chitarra.", "Я играю на гитаре.", ["Я","играю","на","гитаре."]),
        cf("Io faccio yoga ogni mattina.", "Я делаю йогу каждое утро.", ["Я","делаю","йогу","каждое","утро."]),
        cf("Io colleziono francobolli.", "Я коллекционирую марки.", ["Я","коллекционирую","марки."]),
        cf("Io gioco a scacchi.", "Я играю в шахматы.", ["Я","играю","в","шахматы."]),
      ],
    },
    {
      theme: "L'ambiente domestico",
      items: [
        cf("Il rubinetto perde.", "Кран течёт.", ["Кран","течёт."]),
        cf("La luce non funziona.", "Свет не работает.", ["Свет","не","работает."]),
        cf("Devo chiamare un idraulico.", "Мне нужно вызвать сантехника.", ["Мне","нужно","вызвать","сантехника."]),
        cf("Il riscaldamento è rotto.", "Отопление сломано.", ["Отопление","сломано."]),
        cf("La finestra non si chiude.", "Окно не закрывается.", ["Окно","не","закрывается."]),
      ],
    },
    {
      theme: "Le notizie",
      items: [
        cf("Ho letto le notizie oggi.", "Я прочитал новости сегодня.", ["Я","прочитал","новости","сегодня."]),
        cf("Il giornale parla di politica.", "Газета пишет о политике.", ["Газета","пишет","о","политике."]),
        cf("C'è stato un incidente.", "Произошла авария.", ["Произошла","авария."]),
        cf("L'economia sta crescendo.", "Экономика растёт.", ["Экономика","растёт."]),
        cf("Hanno annunciato le elezioni.", "Объявили выборы.", ["Объявили","выборы."]),
      ],
    },
  ],
  B2: [
    {
      theme: "Opinioni",
      items: [
        cf("Penso che lui abbia ragione.", "Я думаю, что он прав.", ["прав.", "он", "что", "думаю,", "Я"]),
        cf("Non sono del tutto d'accordo.", "Я не совсем согласен.", ["согласен.", "совсем", "не", "Я"]),
        cf("Dipende dalla situazione.", "Это зависит от ситуации.", ["ситуации.", "от", "зависит", "Это"]),
        cf("Cambierei alcune cose.", "Я бы изменил некоторые вещи.", ["вещи.", "некоторые", "изменил", "бы", "Я"]),
        cf("Sono sicuro che ha ragione.", "Я уверен, что он прав.", ["прав.", "он", "что", "уверен,", "Я"]),
      ],
    },
    {
      theme: "Ambiente e società",
      items: [
        cf("Dobbiamo proteggere l'ambiente.", "Мы должны защищать окружающую среду.", ["среду.", "окружающую", "защищать", "должны", "Мы"]),
        cf("Il problema è complesso.", "Проблема сложная.", ["сложная.", "Проблема"]),
        cf("La società sta cambiando.", "Общество меняется.", ["меняется.", "Общество"]),
        cf("Bisogna trovare una soluzione.", "Нужно найти решение.", ["решение.", "найти", "Нужно"]),
        cf("Il riscaldamento globale preoccupa tutti.", "Глобальное потепление беспокоит всех.", ["всех.", "беспокоит", "потепление", "Глобальное"]),
      ],
    },
    {
      theme: "Cultura e arte",
      items: [
        cf("Mi piace questo quadro.", "Мне нравится эта картина.", ["картина.", "эта", "нравится", "Мне"]),
        cf("Il film era interessante.", "Фильм был интересный.", ["интересный.", "был", "Фильм"]),
        cf("Questo scrittore è famoso.", "Этот писатель знаменит.", ["знаменит.", "писатель", "Этот"]),
        cf("La mostra è aperta fino a domenica.", "Выставка открыта до воскресенья.", ["воскресенья.", "до", "открыта", "Выставка"]),
        cf("Questo museo è famoso.", "Этот музей знаменит.", ["знаменит.", "музей", "Этот"]),
      ],
    },
    {
      theme: "La tecnologia",
      items: [
        cf("L'intelligenza artificiale cambia tutto.", "Искусственный интеллект меняет всё.", ["Искусственный","интеллект","меняет","всё."]),
        cf("Io uso troppo lo smartphone.", "Я слишком много пользуюсь смартфоном.", ["Я","слишком","много","пользуюсь","смартфоном."]),
        cf("I social network influenzano l'opinione.", "Соцсети влияют на мнение.", ["Соцсети","влияют","на","мнение."]),
        cf("La privacy online è importante.", "Онлайн-приватность важна.", ["Онлайн-приватность","важна."]),
        cf("Internet ha cambiato la comunicazione.", "Интернет изменил общение.", ["Интернет","изменил","общение."]),
      ],
    },
    {
      theme: "Il mondo del lavoro",
      items: [
        cf("Lo stress sul lavoro aumenta.", "Стресс на работе растёт.", ["Стресс","на","работе","растёт."]),
        cf("Il lavoro da remoto ha vantaggi.", "У удалённой работы есть преимущества.", ["У","удалённой","работы","есть","преимущества."]),
        cf("I colleghi sono importanti.", "Коллеги важны.", ["Коллеги","важны."]),
        cf("Io cerco un equilibrio tra vita e lavoro.", "Я ищу баланс между работой и жизнью.", ["Я","ищу","баланс","между","работой","и","жизнью."]),
        cf("Io ho chiesto un aumento.", "Я попросил повышение.", ["Я","попросил","повышение."]),
      ],
    },
    {
      theme: "La salute mentale",
      items: [
        cf("È importante prendersi cura di sé.", "Важно заботиться о себе.", ["Важно","заботиться","о","себе."]),
        cf("Lo stress influisce sulla salute.", "Стресс влияет на здоровье.", ["Стресс","влияет","на","здоровье."]),
        cf("La terapia aiuta molte persone.", "Терапия помогает многим людям.", ["Терапия","помогает","многим","людям."]),
        cf("Bisogna dormire abbastanza.", "Нужно достаточно спать.", ["Нужно","достаточно","спать."]),
        cf("La meditazione riduce l'ansia.", "Медитация снижает тревогу.", ["Медитация","снижает","тревогу."]),
      ],
    },
    {
      theme: "I viaggi",
      items: [
        cf("Ho visitato molti paesi.", "Я посетил много стран.", ["Я","посетил","много","стран."]),
        cf("Io preferisco viaggiare da solo.", "Я предпочитаю путешествовать один.", ["Я","предпочитаю","путешествовать","один."]),
        cf("La cultura locale mi affascina.", "Местная культура меня очаровывает.", ["Местная","культура","меня","очаровывает."]),
        cf("Io una volta ho perso il volo.", "Я однажды опоздал на рейс.", ["Я","однажды","опоздал","на","рейс."]),
        cf("Io consiglio sempre di provare il cibo locale.", "Я всегда советую попробовать местную еду.", ["Я","всегда","советую","попробовать","местную","еду."]),
      ],
    },
  ],
  C1: [
    {
      theme: "Discorso indiretto e concessioni",
      items: [
        cf("Ha detto che sarebbe venuto.", "Он сказал, что придёт.", ["придёт.", "что", "сказал,", "Он"]),
        cf("Nonostante tutto, ha continuato a lavorare.", "Несмотря ни на что, он продолжал работать.", ["работать.", "продолжал", "он", "что,", "ни на", "Несмотря"]),
        cf("Qualunque cosa accada, resterò calmo.", "Что бы ни случилось, я останусь спокоен.", ["спокоен.", "останусь", "я", "случилось,", "ни", "бы", "Что"]),
        cf("L'uomo che ha scritto questo libro è famoso.", "Человек, написавший эту книгу, знаменит.", ["знаменит.", "книгу,", "эту", "написавший", "Человек,"]),
        cf("Mi ha detto di aspettare.", "Он попросил меня подождать.", ["подождать.", "меня", "попросил", "Он"]),
      ],
    },
    {
      theme: "Relazioni personali",
      items: [
        cf("Nonostante i loro litigi, si amano.", "Несмотря на свои ссоры, они любят друг друга.", ["друга.", "друг", "любят", "они", "ссоры,", "свои", "на", "Несмотря"]),
        cf("Chiunque tu sia, sarai il benvenuto.", "Кем бы ты ни был, тебе будут рады.", ["рады.", "будут", "тебе", "был,", "ни", "ты", "бы", "Кем"]),
        cf("Avrebbe potuto dirlo prima.", "Он мог бы сказать это раньше.", ["раньше.", "это", "сказать", "бы", "мог", "Он"]),
        cf("Mi chiedo se lei sappia la verità.", "Интересно, знает ли она правду.", ["правду.", "она", "ли", "знает", "Интересно,"]),
        cf("Sebbene fossero stanchi, hanno continuato a parlare.", "Хотя они устали, они продолжали разговаривать.", ["разговаривать.", "продолжали", "они", "устали,", "они", "Хотя"]),
      ],
    },
    {
      theme: "Lavoro e carriera",
      items: [
        cf("L'azienda che ha assunto Anna è grande.", "Компания, нанявшая Анну, большая.", ["большая.", "Анну,", "нанявшая", "Компания,"]),
        cf("Sebbene fosse stanco, ha finito il lavoro.", "Хотя он устал, он закончил работу.", ["работу.", "закончил", "он", "устал,", "он", "Хотя"]),
        cf("Avrei accettato quell'offerta.", "Я бы принял то предложение.", ["предложение.", "то", "принял", "бы", "Я"]),
        cf("Chiunque lavori qui è qualificato.", "Кто бы здесь ни работал, он квалифицирован.", ["квалифицирован.", "он", "ни", "работал,", "здесь", "бы", "Кто"]),
        cf("Il progetto che ha presentato era impressionante.", "Проект, который он представил, был впечатляющим.", ["впечатляющим.", "был", "представил,", "он", "который", "Проект,"]),
      ],
    },
    {
      theme: "La politica",
      items: [
        cf("Il governo ha annunciato nuove riforme.", "Правительство объявило новые реформы.", ["Правительство","объявило","новые","реформы."]),
        cf("L'opposizione critica la decisione.", "Оппозиция критикует решение.", ["Оппозиция","критикует","решение."]),
        cf("I cittadini protestano pacificamente.", "Граждане мирно протестуют.", ["Граждане","мирно","протестуют."]),
        cf("Le elezioni si terranno in autunno.", "Выборы пройдут осенью.", ["Выборы","пройдут","осенью."]),
        cf("La corruzione mina la fiducia pubblica.", "Коррупция подрывает общественное доверие.", ["Коррупция","подрывает","общественное","доверие."]),
      ],
    },
    {
      theme: "Il sistema educativo",
      items: [
        cf("Il sistema scolastico necessita riforme.", "Школьная система нуждается в реформах.", ["Школьная","система","нуждается","в","реформах."]),
        cf("Gli insegnanti sono sottopagati.", "Учителям мало платят.", ["Учителям","мало","платят."]),
        cf("Gli studenti affrontano molta pressione.", "Студенты сталкиваются с большим давлением.", ["Студенты","сталкиваются","с","большим","давлением."]),
        cf("L'istruzione online si è diffusa.", "Онлайн-образование распространилось.", ["Онлайн-образование","распространилось."]),
        cf("La creatività dovrebbe essere incoraggiata.", "Творчество должно поощряться.", ["Творчество","должно","поощряться."]),
      ],
    },
    {
      theme: "L'etica e la morale",
      items: [
        cf("Ogni scelta ha conseguenze.", "У каждого выбора есть последствия.", ["У","каждого","выбора","есть","последствия."]),
        cf("Esiste la menzogna a fin di bene?", "Существует ли ложь во благо?", ["Существует","ли","ложь","во","благо?"]),
        cf("La giustizia dovrebbe essere imparziale.", "Правосудие должно быть беспристрастным.", ["Правосудие","должно","быть","беспристрастным."]),
        cf("Il dilemma morale non ha risposta facile.", "У морального дилеммы нет лёгкого ответа.", ["У","морального","дилеммы","нет","лёгкого","ответа."]),
        cf("La responsabilità individuale conta.", "Личная ответственность имеет значение.", ["Личная","ответственность","имеет","значение."]),
      ],
    },
    {
      theme: "La scienza e la ricerca",
      items: [
        cf("Gli scienziati hanno fatto una scoperta importante.", "Учёные сделали важное открытие.", ["Учёные","сделали","важное","открытие."]),
        cf("La ricerca richiede finanziamenti.", "Исследование требует финансирования.", ["Исследование","требует","финансирования."]),
        cf("L'esperimento ha confermato l'ipotesi.", "Эксперимент подтвердил гипотезу.", ["Эксперимент","подтвердил","гипотезу."]),
        cf("La comunità scientifica è divisa.", "Научное сообщество разделилось.", ["Научное","сообщество","разделилось."]),
        cf("I dati supportano la teoria.", "Данные подтверждают теорию.", ["Данные","подтверждают","теорию."]),
      ],
    },
  ],
  C2: [
    {
      theme: "Sfumature ed enfasi",
      items: [
        cf("Lo sai benissimo.", "Ты прекрасно это знаешь.", ["знаешь.", "это", "прекрасно", "Ты"]),
        cf("Non è mica facile.", "Это вовсе не просто.", ["просто.", "не", "вовсе", "Это"]),
        cf("Come volevasi dimostrare.", "Что и требовалось доказать.", ["доказать.", "требовалось", "и", "Что"]),
        cf("A dire il vero, non mi va.", "Честно говоря, мне не хочется.", ["хочется.", "не", "мне", "говоря,", "Честно"]),
        cf("Diciamo pure che ha sbagliato.", "Скажем прямо, он ошибся.", ["ошибся.", "он", "прямо,", "Скажем"]),
      ],
    },
    {
      theme: "Ironia e sottintesi",
      items: [
        cf("Certo, come no.", "Ну конечно, как же.", ["же.", "как", "конечно,", "Ну"]),
        cf("Sarebbe anche ora.", "Давно бы пора.", ["пора.", "бы", "Давно"]),
        cf("Guarda un po' chi si vede.", "Смотри-ка, кто пришёл.", ["пришёл.", "кто", "Смотри-ка,"]),
        cf("Ma dai, sul serio?", "Да ладно, серьёзно?", ["серьёзно?", "ладно,", "Да"]),
        cf("Chissà cosa penserà.", "Кто знает, что он подумает.", ["подумает.", "он", "что", "знает,", "Кто"]),
      ],
    },
    {
      theme: "Espressioni idiomatiche",
      items: [
        cf("In bocca al lupo.", "Ни пуха ни пера.", ["пера.", "ни", "пуха", "Ни"]),
        cf("Non è affar mio.", "Это не моё дело.", ["дело.", "моё", "не", "Это"]),
        cf("Meglio tardi che mai.", "Лучше поздно, чем никогда.", ["никогда.", "чем", "поздно,", "Лучше"]),
        cf("Chi cerca trova.", "Кто ищет, тот найдёт.", ["найдёт.", "тот", "ищет,", "Кто"]),
        cf("Non tutto il male viene per nuocere.", "Нет худа без добра.", ["добра.", "без", "худа", "Нет"]),
      ],
    },
    {
      theme: "Il registro letterario",
      items: [
        cf("Lo stile dell'autore è raffinato.", "Стиль автора изыскан.", ["Стиль","автора","изыскан."]),
        cf("La metafora arricchisce il testo.", "Метафора обогащает текст.", ["Метафора","обогащает","текст."]),
        cf("Il narratore è inaffidabile.", "Рассказчик ненадёжен.", ["Рассказчик","ненадёжен."]),
        cf("La trama si sviluppa lentamente.", "Сюжет развивается медленно.", ["Сюжет","развивается","медленно."]),
        cf("Il romanzo esplora temi profondi.", "Роман исследует глубокие темы.", ["Роман","исследует","глубокие","темы."]),
      ],
    },
    {
      theme: "Le sfumature diplomatiche",
      items: [
        cf("Le parole sono state scelte con cura.", "Слова были подобраны тщательно.", ["Слова","были","подобраны","тщательно."]),
        cf("La dichiarazione rimane ambigua di proposito.", "Заявление намеренно осталось двусмысленным.", ["Заявление","намеренно","осталось","двусмысленным."]),
        cf("Ogni sfumatura conta nei negoziati.", "Каждый нюанс важен в переговорах.", ["Каждый","нюанс","важен","в","переговорах."]),
        cf("Il tono era conciliante.", "Тон был примирительным.", ["Тон","был","примирительным."]),
        cf("La diplomazia richiede pazienza.", "Дипломатия требует терпения.", ["Дипломатия","требует","терпения."]),
      ],
    },
    {
      theme: "Il discorso accademico",
      items: [
        cf("La tesi richiede ulteriori prove.", "Тезис требует дополнительных доказательств.", ["Тезис","требует","дополнительных","доказательств."]),
        cf("L'argomentazione è ben strutturata.", "Аргументация хорошо структурирована.", ["Аргументация","хорошо","структурирована."]),
        cf("Bisogna citare le fonti correttamente.", "Источники нужно цитировать правильно.", ["Источники","нужно","цитировать","правильно."]),
        cf("Il dibattito accademico è acceso.", "Академическая дискуссия оживлённая.", ["Академическая","дискуссия","оживлённая."]),
        cf("La revisione tra pari garantisce la qualità.", "Рецензирование обеспечивает качество.", ["Рецензирование","обеспечивает","качество."]),
      ],
    },
    {
      theme: "L'umorismo sottile",
      items: [
        cf("Il suo umorismo è secco.", "Его юмор сухой.", ["Его","юмор","сухой."]),
        cf("La battuta ha colto tutti di sorpresa.", "Шутка застала всех врасплох.", ["Шутка","застала","всех","врасплох."]),
        cf("L'ironia non fu colta da tutti.", "Иронию поняли не все.", ["Иронию","поняли","не","все."]),
        cf("Il comico gioca con le parole.", "Комик играет словами.", ["Комик","играет","словами."]),
        cf("Il sarcasmo può ferire se frainteso.", "Сарказм может ранить, если его неправильно поймут.", ["Сарказм","может","ранить,","если","его","неправильно","поймут."]),
      ],
    },
  ],
};

async function callClaudeJSONOnce(prompt, maxTokens = 3000) {
  let res, data;
  if (IS_ARTIFACT_ENV) {
    // Dentro un artifact Claude.ai: meccanismo speciale, niente chiave API,
    // max_tokens fisso a 1000 (requisito dell'ambiente).
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    data = await res.json();
  } else {
    // App standalone: passa dal nostro backend, con la tua chiave API reale.
    res = await fetch(`${API_BASE}/api/claude`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, max_tokens: maxTokens }),
    });
    data = await res.json();
  }
  if (!res.ok) {
    const apiMsg = data?.error?.message || `Errore HTTP ${res.status}`;
    throw new Error(apiMsg);
  }
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  if (!text.trim()) {
    throw new Error("Risposta vuota dall'IA.");
  }

  let jsonSlice;
  const markerStart = text.indexOf("===JSON===");
  const markerEnd = text.indexOf("===END===");
  if (markerStart !== -1 && markerEnd !== -1 && markerEnd > markerStart) {
    jsonSlice = text.slice(markerStart + "===JSON===".length, markerEnd);
  } else {
    jsonSlice = text.replace(/```json|```/g, "");
  }
  jsonSlice = jsonSlice.trim();
  const firstBrace = jsonSlice.indexOf("{");
  const lastBrace = jsonSlice.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Formato non riconosciuto — inizio risposta: " + text.slice(0, 150));
  }
  jsonSlice = jsonSlice.slice(firstBrace, lastBrace + 1);
  jsonSlice = jsonSlice.replace(/,(\s*[}\]])/g, "$1");

  try {
    return JSON.parse(jsonSlice);
  } catch (parseErr) {
    throw new Error("JSON non valido (" + parseErr.message + ") — inizio: " + jsonSlice.slice(0, 150));
  }
}

async function callClaudeJSON(prompt, maxTokens = 3000) {
  if (IS_ARTIFACT_ENV) {
    // Mitiga un bug documentato di Safari/iOS per cui le richieste fetch
    // avviate subito dopo un tocco/interazione falliscono più spesso.
    await new Promise((r) => setTimeout(r, 400));
  }
  const delays = IS_ARTIFACT_ENV ? [900, 1800, 3000] : [800, 1800];
  let lastErr;
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      return await callClaudeJSONOnce(prompt, maxTokens);
    } catch (e) {
      lastErr = e;
      const transient = /failed to fetch|load failed|network|networkerror|pattern|internal server error|overloaded|too many requests|rate.?limit|50[0234]|bad gateway|gateway timeout|service unavailable/i.test(e.message || "");
      if (!transient || attempt === delays.length) throw e;
      await new Promise((r) => setTimeout(r, delays[attempt]));
    }
  }
  throw lastErr;
}

const CONTEXT_SUGGESTIONS = [
  "Al lavoro",
  "In viaggio",
  "A casa",
  "Al ristorante",
  "Con la famiglia",
  "Dal medico",
  "Al telefono",
  "Per strada",
];

const JSON_FORMAT_INSTRUCTIONS = `Rispondi usando ESATTAMENTE questo formato, senza nient'altro prima o dopo: apri con la riga ===JSON=== poi l'oggetto JSON valido, poi chiudi con la riga ===END===. Dentro ai valori di testo NON usare mai il carattere virgolette doppie (") per citare parole: usa virgolette semplici 'così' o «così». Non lasciare virgole finali prima di } o ]. Sii conciso: rispondi solo con i campi richiesti, senza aggiungere altro testo.`;

// ---------- Main component ----------

export default function App() {
  const [view, setView] = useState("home");
  const [openLevel, setOpenLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showGloss, setShowGloss] = useState({});
  const [quizPicked, setQuizPicked] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const [progress, setProgress] = useState({ completed: [], streak: 0, lastActive: null });
  const [vocabBox, setVocabBox] = useState({});
  const [ready, setReady] = useState(false);

  const [cardIndex, setCardIndex] = useState(0);
  const [cardFilter, setCardFilter] = useState("learning");
  useEffect(() => {
    setCardIndex(0);
  }, [cardFilter]);
  const [flipped, setFlipped] = useState(false);

  const [ttsSettings, setTtsSettings] = useState({ voiceURI: null, rate: 0.92 });
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [premium, setPremium] = useState({ enabled: false, apiKey: "", voiceId: ELEVENLABS_DEFAULT_VOICE });
  const [premiumError, setPremiumError] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  const [generatedLessons, setGeneratedLessons] = useState({});
  const [genLoading, setGenLoading] = useState({});
  const [genError, setGenError] = useState({});
  const [genSuccess, setGenSuccess] = useState({});
  const [genLoaded, setGenLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const g = await loadJSON("generated-lessons", {});
      setGeneratedLessons(g);
      setGenLoaded(true);
    })();
  }, []);

  function allLessonsFor(levelId) {
    return [...(LESSONS[levelId] || []), ...(generatedLessons[levelId] || [])];
  }

  async function generateLesson(levelId, extraExisting = []) {
    setGenLoading((s) => ({ ...s, [levelId]: true }));
    setGenError((s) => ({ ...s, [levelId]: null }));
    try {
      const existing = [...allLessonsFor(levelId).map((l) => l.title), ...extraExisting];

      if (!IS_ARTIFACT_ENV) {
        // App standalone: nessun limite di 1000 token, quindi una sola chiamata —
        // dimezza il tempo di attesa ed evita di superare eventuali timeout del
        // server (es. il gateway di Render) che due chiamate in sequenza rischiano di superare.
        const prompt = `Sei un'insegnante di russo madrelingua che crea materiale didattico per studenti italiani. Crea UNA nuova lezione di russo completa per il livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}), diversa per argomento da queste già esistenti: ${existing.join(", ") || "nessuna"}.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"title":"titolo breve in russo","subtitle":"traduzione italiana del titolo","story":[{"ru":"...","it":"..."}],"vocab":[{"ru":"...","translit":"...","it":"..."}],"grammar":{"pattern":"...","explanation_it":"...","examples":["...","..."],"exercise":{"template":"frase con ___ da completare","options":["...","...","..."],"correct":0,"full_ru":"la frase completa con la risposta corretta inserita","full_it":"traduzione italiana della frase completa"}},"quiz":{"question":"...","options":["...","...","..."],"correct":0},"sentenceBuilder":{"instruction_it":"Metti le parole in ordine.","tokens":["...scrambled..."],"answer":"frase corretta completa.","answer_it":"traduzione italiana della frase"},"translationDrills":[{"prompt_it":"...","answer_ru":"..."}],"production":"consegna in italiano per una risposta libera in russo"}

Regole: story 4-6 righe di dialogo naturale, vocab 4 voci, examples 2-3 voci, translationDrills 3 voci. Russo grammaticalmente corretto e coerente con il livello.`;

        const parsed = await callClaudeJSON(prompt, 3500);
        if (!parsed.title || !parsed.story || !parsed.vocab || !parsed.grammar || !parsed.grammar.exercise || !parsed.quiz || !parsed.production) {
          throw new Error("Struttura incompleta.");
        }
        parsed.id = `${levelId.toLowerCase()}-gen-${Date.now()}`;

        setGeneratedLessons((prev) => {
          const next = { ...prev, [levelId]: [...(prev[levelId] || []), parsed] };
          saveJSON("generated-lessons", next);
          return next;
        });
        setGenSuccess((s) => ({ ...s, [levelId]: parsed.title }));
        setTimeout(() => setGenSuccess((s) => ({ ...s, [levelId]: null })), 3000);
        return parsed.title;
      }

      const prompt1 = `Sei un'insegnante di russo madrelingua che crea materiale didattico per studenti italiani. Crea l'inizio di UNA nuova lezione di russo per il livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}), diversa per argomento da queste già esistenti: ${existing.join(", ") || "nessuna"}.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta (solo questi campi):
{"title":"titolo breve in russo","subtitle":"traduzione italiana del titolo","story":[{"ru":"...","it":"..."}],"vocab":[{"ru":"...","translit":"...","it":"..."}],"grammar":{"pattern":"...","explanation_it":"...","examples":["...","..."],"exercise":{"template":"frase con ___ da completare","options":["...","...","..."],"correct":0,"full_ru":"la frase completa con la risposta corretta inserita","full_it":"traduzione italiana della frase completa"}}}

Regole: story 4 righe di dialogo naturale, vocab 4 voci, examples 2 voci. Russo grammaticalmente corretto e coerente con il livello.`;

      const part1 = await callClaudeJSON(prompt1);
      if (!part1.title || !part1.story || !part1.vocab || !part1.grammar || !part1.grammar.exercise) {
        throw new Error("Struttura incompleta (parte 1).");
      }

      const storyText = part1.story.map((s) => s.ru).join(" ");
      const prompt2 = `Hai appena creato questo dialogo russo per una lezione di livello ${levelId}: "${storyText}". Vocabolario chiave: ${part1.vocab.map((v) => v.ru).join(", ")}.

Ora crea SOLO gli esercizi di completamento coerenti con questo dialogo.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta (solo questi campi):
{"quiz":{"question":"...","options":["...","...","..."],"correct":0},"sentenceBuilder":{"instruction_it":"Metti le parole in ordine.","tokens":["...scrambled..."],"answer":"frase corretta completa.","answer_it":"traduzione italiana della frase"},"translationDrills":[{"prompt_it":"...","answer_ru":"..."}],"production":"consegna in italiano per una risposta libera in russo"}

Regole: translationDrills 2 voci, tutte coerenti col vocabolario del dialogo sopra.`;

      const part2 = await callClaudeJSON(prompt2);
      if (!part2.quiz || !part2.production) {
        throw new Error("Struttura incompleta (parte 2).");
      }

      const parsed = { ...part1, ...part2, id: `${levelId.toLowerCase()}-gen-${Date.now()}` };
      setGeneratedLessons((prev) => {
        const next = { ...prev, [levelId]: [...(prev[levelId] || []), parsed] };
        saveJSON("generated-lessons", next);
        return next;
      });
      setGenSuccess((s) => ({ ...s, [levelId]: parsed.title }));
      setTimeout(() => setGenSuccess((s) => ({ ...s, [levelId]: null })), 3000);
      return parsed.title;
    } catch (e) {
      setGenError((s) => ({ ...s, [levelId]: e.message || "Errore sconosciuto." }));
      return null;
    } finally {
      setGenLoading((s) => ({ ...s, [levelId]: false }));
    }
  }

  async function generateBatch(levelId, count) {
    const batchTitles = [];
    for (let i = 0; i < count; i++) {
      const title = await generateLesson(levelId, batchTitles);
      if (title) batchTitles.push(title);
    }
  }

  const [customNouns, setCustomNouns] = useState({});
  const [nounGenLoading, setNounGenLoading] = useState({});
  const [nounGenError, setNounGenError] = useState({});

  useEffect(() => {
    (async () => {
      const n = await loadJSON("custom-nouns", {});
      setCustomNouns(n);
    })();
  }, []);

  async function generateOneNoun(levelId, gender, existingWords) {
    const genderLabel = gender === "masc" ? "maschile" : gender === "fem" ? "femminile" : "neutro";
    const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Scegli UN sostantivo russo di genere ${genderLabel}, adatto al livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}), diverso da questi già usati: ${existingWords.join(", ") || "nessuno"}.

Fornisci la declinazione completa nei 6 casi (singolare), e per ogni caso 3 frasi brevi ed esempio: affermativa, negativa, interrogativa, ciascuna con traduzione italiana.

IMPORTANTE — accento tonico: nel campo "word" e in ogni "form", segna la sillaba accentata inserendo il carattere Unicode U+0301 (accento acuto combinante) subito dopo la vocale accentata, es. "окно\u0301" per una parola con accento sull'ultima sillaba. Non serve per parole di una sola sillaba. Non aggiungere l'accento dentro le frasi di esempio, solo nei campi "word" e "form".

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"word":"forma al nominativo con accento","meaning_it":"traduzione italiana","note_it":"breve nota grammaticale in italiano su questo tipo di declinazione (1 frase)","cases":[{"case":"Именительный","form":"...","examples":{"aff":{"ru":"...","it":"..."},"neg":{"ru":"...","it":"..."},"int":{"ru":"...","it":"..."}}},{"case":"Родительный","form":"...","examples":{...}},{"case":"Дательный","form":"...","examples":{...}},{"case":"Винительный","form":"...","examples":{...}},{"case":"Творительный","form":"...","examples":{...}},{"case":"Предложный","form":"...","examples":{...}}]}

Ogni frase deve essere breve (4-8 parole) e naturale, coerente con il livello ${levelId}.`;

    const parsed = await callClaudeJSON(prompt);
    if (!parsed.word || !parsed.cases || parsed.cases.length !== 6) {
      throw new Error(`Struttura incompleta per il sostantivo ${genderLabel}.`);
    }
    return parsed;
  }

  async function generateNounSet(levelId) {
    setNounGenError((s) => ({ ...s, [levelId]: null }));
    const existing = [...DECLENSIONS[levelId], ...(customNouns[levelId] || [])].map((n) => stripAccentMarks(n.word));
    const newNouns = [];
    try {
      for (const gender of ["masc", "fem", "neu"]) {
        setNounGenLoading((s) => ({ ...s, [levelId]: gender }));
        const noun = await generateOneNoun(levelId, gender, [...existing, ...newNouns.map((n) => stripAccentMarks(n.word))]);
        newNouns.push(noun);
      }
      setCustomNouns((prev) => {
        const next = { ...prev, [levelId]: [...(prev[levelId] || []), ...newNouns] };
        saveJSON("custom-nouns", next);
        return next;
      });
    } catch (e) {
      setNounGenError((s) => ({ ...s, [levelId]: e.message || "Non sono riuscita a generare i sostantivi." }));
      if (newNouns.length) {
        setCustomNouns((prev) => {
          const next = { ...prev, [levelId]: [...(prev[levelId] || []), ...newNouns] };
          saveJSON("custom-nouns", next);
          return next;
        });
      }
    } finally {
      setNounGenLoading((s) => ({ ...s, [levelId]: null }));
    }
  }

  const [customVerbs, setCustomVerbs] = useState({});
  const [verbGenLoading, setVerbGenLoading] = useState({});
  const [verbGenError, setVerbGenError] = useState({});

  useEffect(() => {
    (async () => {
      const v = await loadJSON("custom-verbs", {});
      setCustomVerbs(v);
    })();
  }, []);

  async function generateVerb(levelId) {
    setVerbGenLoading((s) => ({ ...s, [levelId]: true }));
    setVerbGenError((s) => ({ ...s, [levelId]: null }));
    try {
      const existing = [...VERBS[levelId], ...(customVerbs[levelId] || [])].map((v) => stripAccentMarks(v.word));
      const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Scegli UN verbo russo adatto al livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}), diverso da questi già usati: ${existing.join(", ") || "nessuno"}.

Fornisci 4 forme rilevanti del verbo (es. presente 1a persona, presente 3a persona o passato, futuro o imperativo — scegli le forme più utili per questo verbo), ciascuna con una breve frase di esempio (4-8 parole) e la sua traduzione italiana.

IMPORTANTE — accento tonico: nel campo "word" e in ogni "form", segna la sillaba accentata con il carattere Unicode U+0301 subito dopo la vocale accentata (non serve per parole di una sola sillaba, e non va messo dentro le frasi di esempio).

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"word":"infinito con accento","meaning_it":"traduzione italiana","aspect":"imperfettivo|perfettivo|coppia aspettuale|impersonale ecc.","note_it":"breve nota grammaticale in italiano (1 frase)","forms":[{"label":"...","form":"...","example_ru":"...","example_it":"..."}]}`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.word || !parsed.forms || !parsed.forms.length) {
        throw new Error("Struttura incompleta.");
      }
      setCustomVerbs((prev) => {
        const next = { ...prev, [levelId]: [...(prev[levelId] || []), parsed] };
        saveJSON("custom-verbs", next);
        return next;
      });
    } catch (e) {
      setVerbGenError((s) => ({ ...s, [levelId]: e.message || "Non sono riuscita a generare il verbo." }));
    } finally {
      setVerbGenLoading((s) => ({ ...s, [levelId]: false }));
    }
  }

  const [customPhraseGroups, setCustomPhraseGroups] = useState({});
  const [phraseGenLoading, setPhraseGenLoading] = useState({});
  const [phraseGenError, setPhraseGenError] = useState({});
  const [repeatFlags, setRepeatFlags] = useState({});

  useEffect(() => {
    (async () => {
      const g = await loadJSON("custom-phrase-groups", {});
      setCustomPhraseGroups(g);
      const r = await loadJSON("repeat-flags", {});
      setRepeatFlags(r);
    })();
  }, []);

  function toggleRepeatFlag(key) {
    setRepeatFlags((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveJSON("repeat-flags", next);
      return next;
    });
  }

  async function generatePhraseGroup(levelId) {
    setPhraseGenLoading((s) => ({ ...s, [levelId]: true }));
    setPhraseGenError((s) => ({ ...s, [levelId]: null }));
    try {
      const existingPatterns = [...PHRASE_GROUPS[levelId], ...(customPhraseGroups[levelId] || [])].map((g) => g.pattern);
      const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Crea un gruppo di 5 frasi russe brevi che condividono la STESSA struttura grammaticale/lessicale (un pattern fisso con un elemento che cambia), adatto al livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}). Questo aiuta la memorizzazione per ripetizione del pattern.

Il pattern deve essere diverso da questi già usati: ${existingPatterns.join(" | ") || "nessuno"}.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"pattern":"il pattern con ___ al posto della parte variabile","pattern_it":"spiegazione breve del pattern in italiano","phrases":[{"ru":"...","it":"..."}]}

Devi fornire esattamente 5 frasi nell'array "phrases", tutte con la stessa struttura ma un elemento diverso.`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.pattern || !parsed.phrases || parsed.phrases.length < 2) {
        throw new Error("Struttura incompleta.");
      }
      setCustomPhraseGroups((prev) => {
        const next = { ...prev, [levelId]: [...(prev[levelId] || []), parsed] };
        saveJSON("custom-phrase-groups", next);
        return next;
      });
    } catch (e) {
      setPhraseGenError((s) => ({ ...s, [levelId]: e.message || "Non sono riuscita a generare le frasi." }));
    } finally {
      setPhraseGenLoading((s) => ({ ...s, [levelId]: false }));
    }
  }

  const [customComposeGroups, setCustomComposeGroups] = useState({});
  const [composeGenLoading, setComposeGenLoading] = useState({});
  const [composeGenError, setComposeGenError] = useState({});

  useEffect(() => {
    (async () => {
      const c = await loadJSON("custom-compose-groups", {});
      setCustomComposeGroups(c);
    })();
  }, []);

  async function generateComposeGroup(levelId) {
    setComposeGenLoading((s) => ({ ...s, [levelId]: true }));
    setComposeGenError((s) => ({ ...s, [levelId]: null }));
    try {
      const existingThemes = [...COMPOSE_GROUPS[levelId], ...(customComposeGroups[levelId] || [])].map((g) => g.theme);
      const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Crea un gruppo di 5 frasi brevi su un tema comunicativo utile, adatto al livello CEFR ${levelId} (${LEVEL_DESCRIPTIONS[levelId]}), per un esercizio in cui lo studente vede la frase in ITALIANO e deve ricomporla in russo scegliendo le parole in ordine.

Il tema deve essere diverso da questi già usati: ${existingThemes.join(", ") || "nessuno"}.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"theme":"nome breve del tema in italiano","items":[{"it":"frase in italiano","ru":"traduzione russa corretta, con maiuscola iniziale e punteggiatura finale","tokens":["parole della frase russa in ordine sparso, punteggiatura attaccata alla parola precedente"]}]}

Fornisci esattamente 5 elementi nell'array "items". Le frasi russe devono essere naturali e corrette per il livello indicato.`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.theme || !parsed.items || parsed.items.length < 2) {
        throw new Error("Struttura incompleta.");
      }
      setCustomComposeGroups((prev) => {
        const next = { ...prev, [levelId]: [...(prev[levelId] || []), parsed] };
        saveJSON("custom-compose-groups", next);
        return next;
      });
    } catch (e) {
      setComposeGenError((s) => ({ ...s, [levelId]: e.message || "Non sono riuscita a generare le frasi." }));
    } finally {
      setComposeGenLoading((s) => ({ ...s, [levelId]: false }));
    }
  }

  useEffect(() => {
    (async () => {
      const pr = await loadJSON("premium-tts", null);
      if (pr) setPremium(pr);
    })();
  }, []);

  function updatePremium(next) {
    setPremium((prev) => {
      const merged = { ...prev, ...next };
      saveJSON("premium-tts", merged);
      return merged;
    });
  }

  useEffect(() => {
    function refreshVoices() {
      const opts = getRuVoices();
      setVoiceOptions(opts);
    }
    refreshVoices();
    if (TTS_SUPPORTED) window.speechSynthesis.onvoiceschanged = refreshVoices;
  }, []);

  useEffect(() => {
    (async () => {
      const t = await loadJSON("tts-settings", null);
      if (t) setTtsSettings(t);
    })();
  }, []);

  function updateTtsSettings(next) {
    setTtsSettings((prev) => {
      const merged = { ...prev, ...next };
      saveJSON("tts-settings", merged);
      return merged;
    });
  }

  useEffect(() => {
    (async () => {
      const p = await loadJSON("progress", { completed: [], streak: 0, lastActive: null });
      const v = await loadJSON("vocab-box", {});
      setProgress(p);
      setVocabBox(v);
      setReady(true);
    })();
  }, []);

  const bumpStreak = useCallback(async () => {
    setProgress((prev) => {
      const t = todayStr();
      if (prev.lastActive === t) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const streak = prev.lastActive === yesterday ? prev.streak + 1 : 1;
      const next = { ...prev, streak, lastActive: t };
      saveJSON("progress", next);
      return next;
    });
  }, []);

  const completeLesson = useCallback(
    (lessonId) => {
      setProgress((prev) => {
        if (prev.completed.includes(lessonId)) return prev;
        const next = { ...prev, completed: [...prev.completed, lessonId] };
        saveJSON("progress", next);
        return next;
      });
      bumpStreak();
    },
    [bumpStreak]
  );

  const allVocab = [...Object.values(LESSONS).flat(), ...Object.values(generatedLessons).flat()].flatMap((l) =>
    (l.vocab || []).map((v) => ({ ...v, key: `${l.id}:${v.ru}` }))
  );

  const deck = allVocab.length ? allVocab : [];
  const sortedDeck = [...deck].sort((a, b) => (vocabBox[a.key] || 1) - (vocabBox[b.key] || 1));
  const learningDeck = sortedDeck.filter((c) => (vocabBox[c.key] || 1) < 5);
  const masteredDeck = sortedDeck.filter((c) => (vocabBox[c.key] || 1) >= 5);
  const filteredDeck = cardFilter === "mastered" ? masteredDeck : cardFilter === "learning" ? learningDeck : sortedDeck;

  function reviewCard(delta) {
    const card = filteredDeck[cardIndex % (filteredDeck.length || 1)];
    if (!card) return;
    setVocabBox((prev) => {
      const cur = prev[card.key] || 1;
      const next = { ...prev, [card.key]: Math.max(1, Math.min(5, cur + delta)) };
      saveJSON("vocab-box", next);
      return next;
    });
    setFlipped(false);
    setCardIndex((i) => i + 1);
    if (delta > 0) bumpStreak();
  }

  function toggleMastered() {
    const card = filteredDeck[cardIndex % (filteredDeck.length || 1)];
    if (!card) return;
    const cur = vocabBox[card.key] || 1;
    const wasMastered = cur >= 5;
    setVocabBox((prev) => {
      const next = { ...prev, [card.key]: wasMastered ? 1 : 5 };
      saveJSON("vocab-box", next);
      return next;
    });
    setFlipped(false);
    setCardIndex((i) => i + 1);
    if (!wasMastered) bumpStreak();
  }

  const [sessionLevel, setSessionLevel] = useState(null);
  const [sessionSteps, setSessionSteps] = useState([]);
  const [sessionIndex, setSessionIndex] = useState(0);

  function generateSession(levelId) {
    const steps = [];

    const levelDeck = learningDeck.filter((c) => levelFromId(c.key.split(":")[0]) === levelId);
    const cardPool = levelDeck.length ? levelDeck : sortedDeck.filter((c) => levelFromId(c.key.split(":")[0]) === levelId);
    const usedCardKeys = new Set();
    for (let i = 0; i < 2; i++) {
      const remaining = cardPool.filter((c) => !usedCardKeys.has(c.key));
      const card = pickRandom(remaining);
      if (card) {
        usedCardKeys.add(card.key);
        steps.push({ type: "flashcard", card });
      }
    }

    const phraseGroupsAll = [...PHRASE_GROUPS[levelId], ...(customPhraseGroups[levelId] || [])];
    const allPhrases = phraseGroupsAll.flatMap((g) => g.phrases.map((p) => ({ ...p, pattern: g.pattern })));
    const phrase = pickRandom(allPhrases);
    if (phrase) steps.push({ type: "phrase", ...phrase });

    const composeGroupsAll = [...COMPOSE_GROUPS[levelId], ...(customComposeGroups[levelId] || [])];
    const allComposeItems = composeGroupsAll.flatMap((g) => g.items);
    const composeItem = pickRandom(allComposeItems);
    if (composeItem) steps.push({ type: "compose", item: composeItem });

    const nounsAll = [...DECLENSIONS[levelId], ...(customNouns[levelId] || [])];
    const noun = pickRandom(nounsAll);
    if (noun) {
      const c = pickRandom(noun.cases);
      steps.push({ type: "declension", word: noun.word, meaning_it: noun.meaning_it, case: c.case, form: c.form, example: c.examples.aff });
    }

    const verbsAll = [...VERBS[levelId], ...(customVerbs[levelId] || [])];
    const verb = pickRandom(verbsAll);
    if (verb) {
      const f = pickRandom(verb.forms);
      steps.push({ type: "verb", word: verb.word, meaning_it: verb.meaning_it, label: f.label, form: f.form, example_ru: f.example_ru, example_it: f.example_it });
    }

    setSessionLevel(levelId);
    setSessionSteps(steps);
    setSessionIndex(0);
  }

  async function requestFeedback(lesson) {
    setFeedbackLoading(true);
    setFeedback(null);
    try {
      const prompt = `Sei un'insegnante di russo madrelingua, gentile e naturale. Uno studente italiano di livello intermedio ha letto questo dialogo:
${lesson.story.map((s) => s.ru).join(" ")}

Consegna: "${lesson.production}"

Risposta dello studente: "${answer}"

Correggi come farebbe un genitore con un bambino: ripeti la frase in modo naturale e corretto, senza elencare regole grammaticali pedanti. Poi aggiungi una riga di incoraggiamento in italiano.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"corrected":"...","note_it":"...","encouragement_it":"..."}`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.corrected && !parsed.note_it) {
        throw new Error("Struttura incompleta nella risposta.");
      }
      setFeedback(parsed);
    } catch (e) {
      setFeedback({
        corrected: "",
        note_it: "Errore: " + (e.message || "sconosciuto"),
        encouragement_it: "Non è un problema del testo che hai scritto — riprova più tardi.",
      });
    } finally {
      setFeedbackLoading(false);
    }
  }

  const masteredCount = Object.values(vocabBox).filter((b) => b >= 5).length;
  const anySectionActive = view !== "home" || showVoicePanel;
  function navBtnStyle(borderColor, isActive) {
    return {
      background: isActive ? `${borderColor}33` : "none",
      border: `1px solid ${borderColor}`,
      borderRadius: 20,
      padding: "6px 8px",
      color: "#F0EAD8",
      fontSize: 12,
      lineHeight: 1.3,
      cursor: "pointer",
      opacity: !anySectionActive || isActive ? 1 : 0.35,
      transition: "opacity 0.15s ease, background 0.15s ease",
    };
  }

  return (
    <div
      className="matryoshka-bg"
      style={{
        fontFamily: "'PT Sans', sans-serif",
        background: "#13294B",
        minHeight: "100vh",
        color: "#F0EAD8",
        position: "relative",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        .display { font-family: 'PT Serif', serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes openDoll { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .doll-open { animation: openDoll 0.25s ease-out; }
        button { font-family: inherit; }
        ::selection { background: #D9A441; color: #1B2430; }
        .btn-3d {
          box-shadow: 0 3px 0 rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.25);
          transform: translateY(0);
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .btn-3d:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2);
        }
        .matryoshka-bg::before {
          content: "";
          position: fixed;
          inset: -10%;
          background:
            repeating-linear-gradient(
              112deg,
              rgba(255,255,255,0.14) 0px,
              rgba(255,255,255,0.14) 60px,
              rgba(0,0,0,0.10) 60px,
              rgba(0,0,0,0.10) 130px
            ),
            linear-gradient(158deg, #FFFFFF 6%, #2E5FC7 46%, #B5281C 88%);
          background-blend-mode: overlay;
          filter: blur(30px);
          opacity: 0.8;
          transform: scale(1.08);
          pointer-events: none;
          z-index: 0;
        }
        .matryoshka-bg::after {
          content: "";
          position: fixed;
          inset: 0;
          background-image: url("${MATRYOSHKA_PATTERN_URI}");
          background-repeat: repeat;
          background-size: 130px 170px;
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
      <header
        style={{
          padding: "28px 20px 20px",
          textAlign: "center",
          background: "rgba(14,32,64,0.82)",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <div
          className="display"
          style={{ fontSize: 32, fontWeight: 700, letterSpacing: 0.5 }}
          onClick={() => {
            setView("home");
            setActiveLesson(null);
          }}
        >
          Матрёшка
        </div>
        <div style={{ fontSize: 14, opacity: 0.6, marginTop: 2 }}>
          italiano → russo, un livello alla volta
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginTop: 14,
            fontSize: 14,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Flame size={15} color="#D9A441" /> {progress.streak} giorni
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <BookOpen size={15} color="#5B84B1" /> {progress.completed.length} lezioni
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginTop: 14,
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <button
            onClick={() => {
              setView(view === "flashcards" ? "home" : "flashcards");
              setCardIndex(0);
              setFlipped(false);
            }}
            className="btn-3d"
            style={{ ...navBtnStyle("#7C8C6B", view === "flashcards"), textAlign: "center" }}
          >
            <Layers size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
            Carte ({masteredCount}/{deck.length})
          </button>
          <button
            onClick={() => setView(view === "declensions" ? "home" : "declensions")}
            className="btn-3d"
            style={{ ...navBtnStyle("#9A6B9E", view === "declensions"), textAlign: "center" }}
          >
            📖 Casi
          </button>
          <button
            onClick={() => setView(view === "verbs" ? "home" : "verbs")}
            className="btn-3d"
            style={{ ...navBtnStyle("#7C8C6B", view === "verbs"), textAlign: "center" }}
          >
            🗣️ Verbi
          </button>
          <button
            onClick={() => setView(view === "phrases" ? "home" : "phrases")}
            className="btn-3d"
            style={{ ...navBtnStyle("#5B84B1", view === "phrases"), textAlign: "center" }}
          >
            💬 Frasi
          </button>
          <button
            onClick={() => setView(view === "compose" ? "home" : "compose")}
            className="btn-3d"
            style={{ ...navBtnStyle("#C1543C", view === "compose"), textAlign: "center" }}
          >
            🧩 Componi
          </button>
          <button
            onClick={() => setView(view === "session" ? "home" : "session")}
            className="btn-3d"
            style={{ ...navBtnStyle("#D9A441", view === "session"), textAlign: "center" }}
          >
            📅 Sessione
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <button
            onClick={() => setShowVoicePanel((s) => !s)}
            className="btn-3d"
            style={navBtnStyle("#D9A441", showVoicePanel)}
          >
            <Volume2 size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
            Voce
          </button>
        </div>

        {!premium.enabled && !showVoicePanel && (
          <p style={{ fontSize: 12, opacity: 0.55, marginTop: 8 }}>
            👆 Tocca "Voce" qui sopra per una pronuncia più naturale (voce premium disponibile)
          </p>
        )}

        {showVoicePanel && (
          <div
            style={{
              maxWidth: 340,
              margin: "12px auto 0",
              background: "#232E3D",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 10,
              padding: 14,
              textAlign: "left",
              fontSize: 13,
            }}
          >
            {!TTS_SUPPORTED ? (
              <div style={{ opacity: 0.6 }}>Il tuo browser non supporta la sintesi vocale.</div>
            ) : (
              <>
                {voiceOptions.length > 0 ? (
                  <>
                    <div style={{ opacity: 0.6, marginBottom: 4 }}>Voce russa</div>
                    <select
                      value={ttsSettings.voiceURI || ""}
                      onChange={(e) => updateTtsSettings({ voiceURI: e.target.value || null })}
                      style={{
                        width: "100%",
                        background: "#1B2430",
                        color: "#F0EAD8",
                        border: "1px solid rgba(240,234,216,0.2)",
                        borderRadius: 6,
                        padding: 6,
                        marginBottom: 10,
                        fontSize: 13,
                      }}
                    >
                      <option value="">Automatica (migliore disponibile)</option>
                      {voiceOptions.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <div style={{ opacity: 0.6, marginBottom: 8 }}>
                    Nessuna voce russa trovata sul dispositivo. Su Chrome o Edge di solito ce ne sono di più naturali
                    che su altri browser.
                  </div>
                )}
                <div style={{ opacity: 0.6, marginBottom: 4 }}>
                  Velocità: {ttsSettings.rate.toFixed(2)}×
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.15"
                  step="0.02"
                  value={ttsSettings.rate}
                  onChange={(e) => updateTtsSettings({ rate: parseFloat(e.target.value) })}
                  style={{ width: "100%" }}
                />
                <button
                  onClick={async () => {
                    setTestLoading(true);
                    setPremiumError(null);
                    await playAudio(
                      "Привет! Как поживаешь? Очень приятно с тобой познакомиться.",
                      { ttsSettings, premium },
                      (msg) => setPremiumError(msg)
                    );
                    setTestLoading(false);
                  }}
                  disabled={testLoading}
                  style={{
                    marginTop: 10,
                    background: "#5B84B1",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    color: "#1B2430",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    opacity: testLoading ? 0.6 : 1,
                  }}
                >
                  {testLoading ? "Genero l'audio…" : "Prova la voce"}
                </button>
                <div style={{ opacity: 0.45, marginTop: 8, fontSize: 12 }}>
                  La qualità dipende dalle voci installate sul tuo dispositivo/browser: non è un vero madrelingua. Su
                  iOS, scaricare la voce russa "Enhanced/Premium" da Impostazioni → Accessibilità → Contenuto vocale
                  migliora molto. Su Android/Chrome, le voci "Google" sono di solito le migliori.
                </div>

                <div style={{ borderTop: "1px solid rgba(240,234,216,0.15)", marginTop: 14, paddingTop: 12 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={premium.enabled}
                      onChange={(e) => updatePremium({ enabled: e.target.checked })}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Voce premium (ElevenLabs) — davvero naturale</span>
                  </label>

                  {premium.enabled && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ opacity: 0.6, marginBottom: 4 }}>Chiave API ElevenLabs</div>
                      <input
                        type="password"
                        value={premium.apiKey}
                        onChange={(e) => updatePremium({ apiKey: e.target.value })}
                        placeholder="sk_..."
                        style={{
                          width: "100%",
                          background: "#1B2430",
                          color: "#F0EAD8",
                          border: "1px solid rgba(240,234,216,0.2)",
                          borderRadius: 6,
                          padding: 6,
                          marginBottom: 8,
                          fontSize: 13,
                        }}
                      />
                      <div style={{ opacity: 0.6, marginBottom: 4 }}>Voice ID (opzionale)</div>
                      <input
                        type="text"
                        value={premium.voiceId}
                        onChange={(e) => updatePremium({ voiceId: e.target.value })}
                        placeholder={ELEVENLABS_DEFAULT_VOICE}
                        style={{
                          width: "100%",
                          background: "#1B2430",
                          color: "#F0EAD8",
                          border: "1px solid rgba(240,234,216,0.2)",
                          borderRadius: 6,
                          padding: 6,
                          marginBottom: 8,
                          fontSize: 13,
                        }}
                      />
                      {premiumError && (
                        <div style={{ color: "#C1543C", fontSize: 13, marginBottom: 8 }}>{premiumError}</div>
                      )}
                      <div style={{ opacity: 0.5, fontSize: 12, lineHeight: 1.5 }}>
                        Richiede un account ElevenLabs (a pagamento oltre la soglia gratuita). La chiave resta salvata
                        solo nel tuo browser e viene inviata direttamente a elevenlabs.io ad ogni riproduzione — non
                        passa da Anthropic. Chiunque avesse accesso a questo browser potrebbe leggerla: non è uno
                        storage pensato per segreti sensibili.
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {!ready ? (
        <div style={{ textAlign: "center", padding: 60, opacity: 0.6 }}>Carico i tuoi progressi…</div>
      ) : view === "declensions" ? (
        <DeclensionsView
          ttsSettings={ttsSettings}
          premium={premium}
          customNouns={customNouns}
          nounGenLoading={nounGenLoading}
          nounGenError={nounGenError}
          onGenerateNounSet={generateNounSet}
        />
      ) : view === "verbs" ? (
        <VerbsView
          ttsSettings={ttsSettings}
          premium={premium}
          customVerbs={customVerbs}
          verbGenLoading={verbGenLoading}
          verbGenError={verbGenError}
          onGenerateVerb={generateVerb}
        />
      ) : view === "phrases" ? (
        <PhrasesView
          ttsSettings={ttsSettings}
          premium={premium}
          customPhraseGroups={customPhraseGroups}
          phraseGenLoading={phraseGenLoading}
          phraseGenError={phraseGenError}
          onGeneratePhraseGroup={generatePhraseGroup}
          repeatFlags={repeatFlags}
          onToggleRepeatFlag={toggleRepeatFlag}
        />
      ) : view === "compose" ? (
        <ComposeView
          ttsSettings={ttsSettings}
          premium={premium}
          customComposeGroups={customComposeGroups}
          composeGenLoading={composeGenLoading}
          composeGenError={composeGenError}
          onGenerateComposeGroup={generateComposeGroup}
        />
      ) : view === "session" ? (
        <SessionView
          ttsSettings={ttsSettings}
          premium={premium}
          sessionLevel={sessionLevel}
          sessionSteps={sessionSteps}
          sessionIndex={sessionIndex}
          setSessionIndex={setSessionIndex}
          onGenerateSession={generateSession}
        />
      ) : view === "flashcards" ? (
        <FlashcardView
          card={filteredDeck[cardIndex % (filteredDeck.length || 1)]}
          flipped={flipped}
          setFlipped={setFlipped}
          onReview={reviewCard}
          onToggleMastered={toggleMastered}
          cardIsMastered={(() => {
            const c = filteredDeck[cardIndex % (filteredDeck.length || 1)];
            return c ? (vocabBox[c.key] || 1) >= 5 : false;
          })()}
          count={filteredDeck.length}
          learningCount={learningDeck.length}
          masteredCount={masteredDeck.length}
          cardFilter={cardFilter}
          setCardFilter={setCardFilter}
          ttsSettings={ttsSettings}
          premium={premium}
        />
      ) : activeLesson ? (
        <LessonView
          key={activeLesson.id}
          lesson={activeLesson}
          ttsSettings={ttsSettings}
          premium={premium}
          showGloss={showGloss}
          setShowGloss={setShowGloss}
          quizPicked={quizPicked}
          setQuizPicked={setQuizPicked}
          answer={answer}
          setAnswer={setAnswer}
          feedback={feedback}
          feedbackLoading={feedbackLoading}
          onAskFeedback={() => requestFeedback(activeLesson)}
          onComplete={() => {
            completeLesson(activeLesson.id);
            setActiveLesson(null);
            setQuizPicked(null);
            setAnswer("");
            setFeedback(null);
            setShowGloss({});
          }}
          onBack={() => {
            setActiveLesson(null);
            setQuizPicked(null);
            setAnswer("");
            setFeedback(null);
            setShowGloss({});
          }}
        />
      ) : (
        <HomeView
          openLevel={openLevel}
          setOpenLevel={setOpenLevel}
          completed={progress.completed}
          onOpenLesson={(l) => setActiveLesson(l)}
          allLessonsFor={allLessonsFor}
          genLoading={genLoading}
          genError={genError}
          genSuccess={genSuccess}
          onGenerateOne={generateLesson}
          onGenerateBatch={generateBatch}
        />
      )}
      </div>
    </div>
  );
}

// ---------- Home / matryoshka selector ----------

function HomeView({
  openLevel,
  setOpenLevel,
  completed,
  onOpenLesson,
  allLessonsFor,
  genLoading,
  genError,
  genSuccess,
  onGenerateOne,
  onGenerateBatch,
}) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "10px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <div style={{ position: "relative", height: 250, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 8 }}>
        {[...LEVELS].reverse().map((lvl) => (
          <div
            key={lvl.id}
            onClick={() => setOpenLevel(openLevel === lvl.id ? null : lvl.id)}
            style={{
              position: "absolute",
              bottom: 0,
              width: lvl.size,
              height: lvl.size * 1.15,
              borderRadius: "50% 50% 46% 46%",
              background: lvl.color,
              opacity: openLevel && openLevel !== lvl.id ? 0.35 : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 14,
              cursor: "pointer",
              transition: "opacity 0.2s ease",
              boxShadow: "inset 0 -14px 24px rgba(0,0,0,0.18)",
            }}
          >
            <div
              className="display"
              style={{
                fontWeight: 700,
                fontSize: lvl.size > 100 ? 24 : 16,
                color: "#1B2430",
              }}
            >
              {lvl.id}
            </div>
            {lvl.size > 120 && (
              <div style={{ fontSize: 13, color: "#1B2430", opacity: 0.75 }}>{lvl.label}</div>
            )}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 13, opacity: 0.55, marginBottom: 22 }}>
        Tocca una matrioska per aprire il suo livello
      </p>

      {openLevel && (
        <div className="doll-open">
          {LEVELS.find((l) => l.id === openLevel).ready ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <span style={{ fontSize: 13, opacity: 0.55 }}>
                  {allLessonsFor(openLevel).length} lezioni
                </span>
              </div>
              {allLessonsFor(openLevel).map((lesson) => {
                const done = completed.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onOpenLesson(lesson)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#232E3D",
                      border: "1px solid rgba(240,234,216,0.12)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      color: "#F0EAD8",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div className="display" style={{ fontSize: 18, fontWeight: 700 }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: 13, opacity: 0.6 }}>{lesson.subtitle}</div>
                    </div>
                    {done ? <Check size={18} color="#7C8C6B" /> : <ChevronRight size={18} opacity={0.5} />}
                  </button>
                );
              })}

              <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
                <button
                  onClick={() => onGenerateOne(openLevel)}
                  disabled={genLoading[openLevel]}
                  style={{
                    background: "rgba(217,164,65,0.15)",
                    border: "1px solid rgba(217,164,65,0.4)",
                    borderRadius: 10,
                    padding: "10px 20px",
                    color: "#D9A441",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: genLoading[openLevel] ? 0.5 : 1,
                  }}
                >
                  {genLoading[openLevel] ? "Genero…" : "+ Genera nuova lezione"}
                </button>
              </div>
              {genSuccess[openLevel] && (
                <div style={{ fontSize: 13, color: "#7C8C6B", textAlign: "center", fontWeight: 700 }}>
                  ✓ Lezione aggiunta: {genSuccess[openLevel]}
                </div>
              )}
              {genError[openLevel] && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <div style={{ fontSize: 13, color: "#C1543C", textAlign: "center" }}>{genError[openLevel]}</div>
                  <button
                    onClick={() => onGenerateOne(openLevel)}
                    disabled={genLoading[openLevel]}
                    style={{
                      background: "none",
                      border: "1px solid #C1543C",
                      borderRadius: 8,
                      padding: "3px 10px",
                      color: "#C1543C",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    🔄 Riprova
                  </button>
                </div>
              )}
              <p style={{ fontSize: 12, opacity: 0.4, textAlign: "center", marginTop: 2 }}>
                Ogni lezione è generata dall'IA e salvata per sempre — puoi generarne quante ne vuoi, senza limite.
              </p>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: 24,
                border: "1px dashed rgba(240,234,216,0.25)",
                borderRadius: 12,
                fontSize: 14,
                opacity: 0.6,
              }}
            >
              Contenuti in arrivo per il livello {openLevel}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Declensions reference ----------

function DeclensionsView({ ttsSettings, premium, customNouns, nounGenLoading, nounGenError, onGenerateNounSet }) {
  const [level, setLevel] = useState("A1");
  const [packageIndex, setPackageIndex] = useState(0);

  const nouns = [...DECLENSIONS[level], ...(customNouns[level] || [])];
  const loadingStage = nounGenLoading[level]; // null | "masc" | "fem" | "neu"
  const prevCountRef = useRef(nouns.length);

  useEffect(() => {
    setPackageIndex(0);
  }, [level]);

  useEffect(() => {
    if (nouns.length > prevCountRef.current) {
      setPackageIndex(prevCountRef.current); // salta al primo dei nuovi appena generati
    }
    prevCountRef.current = nouns.length;
  }, [nouns.length]);

  const current = nouns[Math.min(packageIndex, nouns.length - 1)];
  const isLast = packageIndex >= nouns.length - 1;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        Declinazioni per livello
      </h2>
      <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 14 }}>
        Un sostantivo diverso per livello, nei 6 casi, con frase affermativa, negativa e interrogativa per ognuno.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              background: level === l.id ? l.color : "#232E3D",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 20,
              padding: "6px 14px",
              color: level === l.id ? "#1B2430" : "#F0EAD8",
              fontWeight: level === l.id ? 700 : 400,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {l.id}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <button
          onClick={() => setPackageIndex((i) => Math.max(0, i - 1))}
          disabled={packageIndex === 0}
          style={pkgNavBtnStyle(packageIndex === 0)}
        >
          ◀
        </button>
        <span style={{ fontSize: 13, opacity: 0.6 }}>
          Pacchetto {packageIndex + 1} di {nouns.length}
        </span>
        <button
          onClick={() => setPackageIndex((i) => Math.min(nouns.length - 1, i + 1))}
          disabled={isLast}
          style={pkgNavBtnStyle(isLast)}
        >
          ▶
        </button>
      </div>

      <NounCard data={current} level={level} nounIndex={packageIndex} ttsSettings={ttsSettings} premium={premium} />

      {isLast && (
        <button
          onClick={() => onGenerateNounSet(level)}
          disabled={!!loadingStage}
          style={{
            width: "100%",
            marginTop: 18,
            background: "rgba(217,164,65,0.15)",
            border: "1px solid rgba(217,164,65,0.4)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#D9A441",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            opacity: loadingStage ? 0.6 : 1,
          }}
        >
          {loadingStage === "masc" && "Genero il sostantivo maschile…"}
          {loadingStage === "fem" && "Genero il sostantivo femminile…"}
          {loadingStage === "neu" && "Genero il sostantivo neutro…"}
          {!loadingStage && "+ Nuovo pacchetto (masch. · femm. · neutro)"}
        </button>
      )}
      {nounGenError[level] && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "#C1543C", textAlign: "center", margin: 0 }}>{nounGenError[level]}</p>
          <button
            onClick={() => onGenerateNounSet(level)}
            disabled={!!loadingStage}
            style={{
              background: "none",
              border: "1px solid #C1543C",
              borderRadius: 8,
              padding: "3px 10px",
              color: "#C1543C",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            🔄 Riprova
          </button>
        </div>
      )}
      <p style={{ fontSize: 12, opacity: 0.4, textAlign: "center", marginTop: 6 }}>
        Ogni tocco aggiunge un maschile, un femminile e un neutro nuovi, salvati per sempre a questo livello.
      </p>
    </div>
  );
}

function NounCard({ data, level, nounIndex, ttsSettings: _ttsSettings, premium }) {
  const [audioLoading, setAudioLoading] = useState({});
  const [audioError, setAudioError] = useState({});
  const ttsSettings = { ..._ttsSettings, rate: LEVEL_RATE[level] || _ttsSettings.rate };

  async function play(key, text) {
    setAudioLoading((a) => ({ ...a, [key]: true }));
    setAudioError((a) => ({ ...a, [key]: null }));
    await playAudio(text, { ttsSettings, premium }, (msg) => setAudioError((a) => ({ ...a, [key]: msg })));
    setAudioLoading((a) => ({ ...a, [key]: false }));
  }

  return (
    <div>
      <div
        style={{
          background: "rgba(154,107,158,0.12)",
          border: "1px solid rgba(154,107,158,0.35)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>
          {data.word} <span style={{ fontSize: 15, opacity: 0.6, fontWeight: 400 }}>({data.meaning_it})</span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.65, marginTop: 6 }}>{data.note_it}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.cases.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#232E3D",
              border: "1px solid rgba(240,234,216,0.1)",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
              <span className="display" style={{ fontSize: 16, fontWeight: 700 }}>
                {c.case} <span style={{ fontWeight: 400, opacity: 0.65, fontSize: 14 }}>({CASE_INFO[c.case]?.name_it})</span>
              </span>
              <span className="mono" style={{ fontSize: 17, color: "#D9A441" }}>
                {c.form}
              </span>
            </div>
            <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 10 }}>
              Domanda: <span className="mono">{CASE_INFO[c.case]?.ru}</span> — <em>{CASE_INFO[c.case]?.it}</em>
            </div>

            {["aff", "neg", "int"].map((kind) => {
              const label = kind === "aff" ? "＋" : kind === "neg" ? "－" : "？";
              const ex2 = c.examples[kind];
              const key = `${level}-${nounIndex}-${i}-${kind}`;
              return (
                <div
                  key={kind}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "5px 0",
                    borderTop: kind !== "aff" ? "1px solid rgba(240,234,216,0.06)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      opacity: 0.5,
                      width: 16,
                      flexShrink: 0,
                      textAlign: "center",
                      marginTop: 2,
                    }}
                  >
                    {label}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15 }}>{ex2.ru}</div>
                    <div style={{ fontSize: 13, opacity: 0.55, fontStyle: "italic" }}>{ex2.it}</div>
                    {audioError[key] && (
                      <div style={{ fontSize: 12, color: "#C1543C", marginTop: 2 }}>
                        Voce premium non disponibile ({audioError[key]}), uso la voce di sistema.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => play(key, ex2.ru)}
                    disabled={audioLoading[key] || (!TTS_SUPPORTED && !premium?.enabled)}
                    style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
                  >
                    <Volume2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Verbs reference ----------

function VerbsView({ ttsSettings, premium, customVerbs, verbGenLoading, verbGenError, onGenerateVerb }) {
  const [level, setLevel] = useState("A1");
  const [packageIndex, setPackageIndex] = useState(0);
  const verbs = [...VERBS[level], ...(customVerbs[level] || [])];
  const prevCountRef = useRef(verbs.length);

  useEffect(() => {
    setPackageIndex(0);
  }, [level]);

  useEffect(() => {
    if (verbs.length > prevCountRef.current) {
      setPackageIndex(prevCountRef.current);
    }
    prevCountRef.current = verbs.length;
  }, [verbs.length]);

  const current = verbs[Math.min(packageIndex, verbs.length - 1)];
  const isLast = packageIndex >= verbs.length - 1;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        Verbi per livello
      </h2>
      <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 14 }}>
        Un verbo diverso per livello, con le forme principali, un esempio per ciascuna, audio e prova di pronuncia.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              background: level === l.id ? l.color : "#232E3D",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 20,
              padding: "6px 14px",
              color: level === l.id ? "#1B2430" : "#F0EAD8",
              fontWeight: level === l.id ? 700 : 400,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {l.id}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <button
          onClick={() => setPackageIndex((i) => Math.max(0, i - 1))}
          disabled={packageIndex === 0}
          style={pkgNavBtnStyle(packageIndex === 0)}
        >
          ◀
        </button>
        <span style={{ fontSize: 13, opacity: 0.6 }}>
          Pacchetto {packageIndex + 1} di {verbs.length}
        </span>
        <button
          onClick={() => setPackageIndex((i) => Math.min(verbs.length - 1, i + 1))}
          disabled={isLast}
          style={pkgNavBtnStyle(isLast)}
        >
          ▶
        </button>
      </div>

      <VerbCard data={current} level={level} verbIndex={packageIndex} ttsSettings={ttsSettings} premium={premium} />

      {isLast && (
        <button
          onClick={() => onGenerateVerb(level)}
          disabled={verbGenLoading[level]}
          style={{
            width: "100%",
            marginTop: 18,
            background: "rgba(124,140,107,0.15)",
            border: "1px solid rgba(124,140,107,0.4)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#7C8C6B",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            opacity: verbGenLoading[level] ? 0.6 : 1,
          }}
        >
          {verbGenLoading[level] ? "Genero il verbo…" : "+ Nuovo pacchetto (nuovo verbo)"}
        </button>
      )}
      {verbGenError[level] && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "#C1543C", textAlign: "center", margin: 0 }}>{verbGenError[level]}</p>
          <button
            onClick={() => onGenerateVerb(level)}
            disabled={verbGenLoading[level]}
            style={{
              background: "none",
              border: "1px solid #C1543C",
              borderRadius: 8,
              padding: "3px 10px",
              color: "#C1543C",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            🔄 Riprova
          </button>
        </div>
      )}
      <p style={{ fontSize: 12, opacity: 0.4, textAlign: "center", marginTop: 6 }}>
        Ogni verbo aggiunto si salva per sempre a questo livello.
      </p>
    </div>
  );
}

function VerbCard({ data, level, verbIndex, ttsSettings: _ttsSettings, premium }) {
  const [audioLoading, setAudioLoading] = useState({});
  const [audioError, setAudioError] = useState({});
  const [pron, setPron] = useState({});
  const ttsSettings = { ..._ttsSettings, rate: LEVEL_RATE[level] || _ttsSettings.rate };

  async function play(key, text) {
    setAudioLoading((a) => ({ ...a, [key]: true }));
    setAudioError((a) => ({ ...a, [key]: null }));
    await playAudio(text, { ttsSettings, premium }, (msg) => setAudioError((a) => ({ ...a, [key]: msg })));
    setAudioLoading((a) => ({ ...a, [key]: false }));
  }

  return (
    <div>
      <div
        style={{
          background: "rgba(124,140,107,0.12)",
          border: "1px solid rgba(124,140,107,0.35)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div className="display" style={{ fontSize: 20, fontWeight: 700 }}>
          {data.word} <span style={{ fontSize: 14, opacity: 0.6, fontWeight: 400 }}>({data.meaning_it})</span>
        </div>
        <div style={{ fontSize: 12, opacity: 0.55, marginTop: 2 }}>{data.aspect}</div>
        <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>{data.note_it}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.forms.map((f, fi) => {
          const key = `${level}-${verbIndex}-${fi}`;
          const p = pron[key];
          return (
            <div
              key={fi}
              style={{
                background: "#232E3D",
                border: "1px solid rgba(240,234,216,0.1)",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontSize: 13, opacity: 0.6 }}>{f.label}</span>
                <span className="mono" style={{ fontSize: 16, color: "#D9A441" }}>{f.form}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{f.example_ru}</div>
                  <div style={{ fontSize: 13, opacity: 0.6, fontStyle: "italic" }}>{f.example_it}</div>
                  {audioError[key] && (
                    <div style={{ fontSize: 11, color: "#C1543C", marginTop: 2 }}>{audioError[key]}</div>
                  )}
                  {p?.status === "listening" && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>In ascolto…</div>}
                  {p?.status === "denied" && (
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                      Consenti l'uso del microfono per controllare la pronuncia.
                    </div>
                  )}
                  {p?.status === "error" && (
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Non ho sentito bene, riprova.</div>
                  )}
                  {p?.status === "done" && (
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: 4,
                        color: p.score >= 0.85 ? "#7C8C6B" : p.score >= 0.6 ? "#D9A441" : "#C1543C",
                      }}
                    >
                      {p.score >= 0.85
                        ? "Ottima pronuncia! 🎉"
                        : p.score >= 0.6
                        ? `Quasi giusto — ho sentito: "${p.transcript}"`
                        : `Riprova, parlando più lentamente — ho sentito: "${p.transcript}"`}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => play(key, f.example_ru)}
                  disabled={audioLoading[key] || (!TTS_SUPPORTED && !premium?.enabled)}
                  title="Ascolta"
                  style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
                >
                  <Volume2 size={12} />
                </button>
                <button
                  onClick={() => startPronunciationCheck(f.example_ru, (u) => setPron((prev) => ({ ...prev, [key]: u })))}
                  disabled={!SPEECH_RECOGNITION_SUPPORTED || p?.status === "listening"}
                  title="Prova a pronunciare"
                  style={{
                    ...iconBtnStyle,
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    background: p?.status === "listening" ? "rgba(193,84,60,0.4)" : iconBtnStyle.background,
                  }}
                >
                  <Mic size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Phrases reference ----------

function PhrasesView({
  ttsSettings,
  premium,
  customPhraseGroups,
  phraseGenLoading,
  phraseGenError,
  onGeneratePhraseGroup,
  repeatFlags,
  onToggleRepeatFlag,
}) {
  const [level, setLevel] = useState("A1");
  const [showOnlyRepeat, setShowOnlyRepeat] = useState(false);
  const [packageIndex, setPackageIndex] = useState(0);
  const groups = [...PHRASE_GROUPS[level], ...(customPhraseGroups[level] || [])];
  const prevCountRef = useRef(groups.length);

  useEffect(() => {
    setPackageIndex(0);
  }, [level]);

  useEffect(() => {
    if (groups.length > prevCountRef.current) {
      setPackageIndex(prevCountRef.current);
    }
    prevCountRef.current = groups.length;
  }, [groups.length]);

  const current = groups[Math.min(packageIndex, groups.length - 1)];
  const isLast = packageIndex >= groups.length - 1;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        Frasi per livello
      </h2>
      <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 14 }}>
        Gruppi di 5 frasi con la stessa struttura: ripetere il pattern aiuta a fissarlo in memoria.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              background: level === l.id ? l.color : "#232E3D",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 20,
              padding: "6px 14px",
              color: level === l.id ? "#1B2430" : "#F0EAD8",
              fontWeight: level === l.id ? 700 : 400,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {l.id}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowOnlyRepeat((s) => !s)}
        style={{
          background: showOnlyRepeat ? "rgba(193,84,60,0.25)" : "#232E3D",
          border: showOnlyRepeat ? "1px solid #C1543C" : "1px solid rgba(240,234,216,0.15)",
          borderRadius: 10,
          padding: "8px 12px",
          color: "#F0EAD8",
          fontSize: 13,
          fontWeight: showOnlyRepeat ? 700 : 400,
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        🔁 {showOnlyRepeat ? "Mostro solo le frasi da ripetere" : "Mostra solo le frasi da ripetere"}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <button
          onClick={() => setPackageIndex((i) => Math.max(0, i - 1))}
          disabled={packageIndex === 0}
          style={pkgNavBtnStyle(packageIndex === 0)}
        >
          ◀
        </button>
        <span style={{ fontSize: 13, opacity: 0.6 }}>
          Pacchetto {packageIndex + 1} di {groups.length}
        </span>
        <button
          onClick={() => setPackageIndex((i) => Math.min(groups.length - 1, i + 1))}
          disabled={isLast}
          style={pkgNavBtnStyle(isLast)}
        >
          ▶
        </button>
      </div>

      <PhraseGroupCard
        data={current}
        level={level}
        groupIndex={packageIndex}
        ttsSettings={ttsSettings}
        premium={premium}
        repeatFlags={repeatFlags}
        onToggleRepeatFlag={onToggleRepeatFlag}
        showOnlyRepeat={showOnlyRepeat}
      />

      {isLast && (
        <button
          onClick={() => onGeneratePhraseGroup(level)}
          disabled={phraseGenLoading[level]}
          style={{
            width: "100%",
            marginTop: 18,
            background: "rgba(91,132,177,0.15)",
            border: "1px solid rgba(91,132,177,0.4)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#5B84B1",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            opacity: phraseGenLoading[level] ? 0.6 : 1,
          }}
        >
          {phraseGenLoading[level] ? "Genero un nuovo pattern…" : "+ Nuovo pacchetto (altre 5 frasi)"}
        </button>
      )}
      {phraseGenError[level] && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "#C1543C", textAlign: "center", margin: 0 }}>{phraseGenError[level]}</p>
          <button
            onClick={() => onGeneratePhraseGroup(level)}
            disabled={phraseGenLoading[level]}
            style={{
              background: "none",
              border: "1px solid #C1543C",
              borderRadius: 8,
              padding: "3px 10px",
              color: "#C1543C",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            🔄 Riprova
          </button>
        </div>
      )}
    </div>
  );
}

function PhraseGroupCard({ data, level, groupIndex, ttsSettings: _ttsSettings, premium, repeatFlags, onToggleRepeatFlag, showOnlyRepeat }) {
  const [audioLoading, setAudioLoading] = useState({});
  const [audioError, setAudioError] = useState({});
  const [pron, setPron] = useState({});
  const ttsSettings = { ..._ttsSettings, rate: LEVEL_RATE[level] || _ttsSettings.rate };

  async function play(key, text) {
    setAudioLoading((a) => ({ ...a, [key]: true }));
    setAudioError((a) => ({ ...a, [key]: null }));
    await playAudio(text, { ttsSettings, premium }, (msg) => setAudioError((a) => ({ ...a, [key]: msg })));
    setAudioLoading((a) => ({ ...a, [key]: false }));
  }

  const visiblePhrases = data.phrases
    .map((ph, pi) => ({ ph, pi }))
    .filter(({ pi }) => !showOnlyRepeat || repeatFlags[`${level}-${groupIndex}-${pi}`]);

  if (showOnlyRepeat && visiblePhrases.length === 0) return null;

  return (
    <div>
      <div
        style={{
          background: "rgba(91,132,177,0.12)",
          border: "1px solid rgba(91,132,177,0.35)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{data.pattern}</div>
        <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>{data.pattern_it}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visiblePhrases.map(({ ph, pi }) => {
          const key = `${level}-${groupIndex}-${pi}`;
          const p = pron[key];
          const flagged = !!repeatFlags[key];
          return (
            <div
              key={pi}
              style={{
                background: "#232E3D",
                border: flagged ? "1px solid #C1543C" : "1px solid rgba(240,234,216,0.1)",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15 }}>{ph.ru}</div>
                  <div style={{ fontSize: 13, opacity: 0.6, fontStyle: "italic" }}>{ph.it}</div>
                  {audioError[key] && <div style={{ fontSize: 11, color: "#C1543C", marginTop: 2 }}>{audioError[key]}</div>}
                  {p?.status === "listening" && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>In ascolto…</div>}
                  {p?.status === "denied" && (
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                      Consenti l'uso del microfono per controllare la pronuncia.
                    </div>
                  )}
                  {p?.status === "error" && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Non ho sentito bene, riprova.</div>}
                  {p?.status === "done" && (
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: 4,
                        color: p.score >= 0.85 ? "#7C8C6B" : p.score >= 0.6 ? "#D9A441" : "#C1543C",
                      }}
                    >
                      {p.score >= 0.85
                        ? "Ottima pronuncia! 🎉"
                        : p.score >= 0.6
                        ? `Quasi giusto — ho sentito: "${p.transcript}"`
                        : `Riprova, parlando più lentamente — ho sentito: "${p.transcript}"`}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => play(key, ph.ru)}
                  disabled={audioLoading[key] || (!TTS_SUPPORTED && !premium?.enabled)}
                  title="Ascolta"
                  style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
                >
                  <Volume2 size={12} />
                </button>
                <button
                  onClick={() => startPronunciationCheck(ph.ru, (u) => setPron((prev) => ({ ...prev, [key]: u })))}
                  disabled={!SPEECH_RECOGNITION_SUPPORTED || p?.status === "listening"}
                  title="Prova a pronunciare"
                  style={{
                    ...iconBtnStyle,
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    background: p?.status === "listening" ? "rgba(193,84,60,0.4)" : iconBtnStyle.background,
                  }}
                >
                  <Mic size={12} />
                </button>
                <button
                  onClick={() => onToggleRepeatFlag(key)}
                  title={flagged ? "Togli da 'da ripetere'" : "Segna come da ripetere"}
                  style={{
                    ...iconBtnStyle,
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    background: flagged ? "rgba(193,84,60,0.4)" : iconBtnStyle.background,
                  }}
                >
                  🔁
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Compose (IT -> RU sentence building) ----------

function ComposeView({ ttsSettings, premium, customComposeGroups, composeGenLoading, composeGenError, onGenerateComposeGroup }) {
  const [level, setLevel] = useState("A1");
  const [speedMult, setSpeedMult] = useState(1);
  const [packageIndex, setPackageIndex] = useState(0);
  const groups = [...COMPOSE_GROUPS[level], ...(customComposeGroups[level] || [])];
  const prevCountRef = useRef(groups.length);

  useEffect(() => {
    setPackageIndex(0);
  }, [level]);

  useEffect(() => {
    if (groups.length > prevCountRef.current) {
      setPackageIndex(prevCountRef.current);
    }
    prevCountRef.current = groups.length;
  }, [groups.length]);

  const current = groups[Math.min(packageIndex, groups.length - 1)];
  const isLast = packageIndex >= groups.length - 1;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        Componi la frase
      </h2>
      <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 14 }}>
        Leggi la frase in italiano e ricomponila in russo scegliendo le parole in ordine.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            style={{
              background: level === l.id ? l.color : "#232E3D",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 20,
              padding: "6px 14px",
              color: level === l.id ? "#1B2430" : "#F0EAD8",
              fontWeight: level === l.id ? 700 : 400,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {l.id}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 18,
          background: "#232E3D",
          border: "1px solid rgba(240,234,216,0.12)",
          borderRadius: 10,
          padding: "8px 12px",
        }}
      >
        <span style={{ fontSize: 12, opacity: 0.6 }}>Velocità audio:</span>
        <button
          onClick={() => setSpeedMult((m) => Math.max(0.6, +(m - 0.1).toFixed(2)))}
          title="Più lento"
          style={{ ...iconBtnStyle, width: 28, height: 28 }}
        >
          🐢
        </button>
        <span className="mono" style={{ fontSize: 13, minWidth: 40, textAlign: "center" }}>
          {speedMult.toFixed(1)}×
        </span>
        <button
          onClick={() => setSpeedMult((m) => Math.min(1.6, +(m + 0.1).toFixed(2)))}
          title="Più veloce"
          style={{ ...iconBtnStyle, width: 28, height: 28 }}
        >
          🐇
        </button>
        {speedMult !== 1 && (
          <button
            onClick={() => setSpeedMult(1)}
            style={{
              background: "none",
              border: "none",
              color: "#D9A441",
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            reimposta
          </button>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <button
          onClick={() => setPackageIndex((i) => Math.max(0, i - 1))}
          disabled={packageIndex === 0}
          style={pkgNavBtnStyle(packageIndex === 0)}
        >
          ◀
        </button>
        <span style={{ fontSize: 13, opacity: 0.6 }}>
          Pacchetto {packageIndex + 1} di {groups.length}
        </span>
        <button
          onClick={() => setPackageIndex((i) => Math.min(groups.length - 1, i + 1))}
          disabled={isLast}
          style={pkgNavBtnStyle(isLast)}
        >
          ▶
        </button>
      </div>

      <div>
        <div className="display" style={{ fontSize: 16, opacity: 0.8, marginBottom: 10 }}>
          {current.theme}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {current.items.map((item, ii) => (
            <ComposeItemCard
              key={`${level}-${packageIndex}-${ii}`}
              item={item}
              level={level}
              itemKey={`${level}-${packageIndex}-${ii}`}
              ttsSettings={ttsSettings}
              premium={premium}
              speedMult={speedMult}
            />
          ))}
        </div>
      </div>

      {isLast && (
        <button
          onClick={() => onGenerateComposeGroup(level)}
          disabled={composeGenLoading[level]}
          style={{
            width: "100%",
            marginTop: 18,
            background: "rgba(193,84,60,0.15)",
            border: "1px solid rgba(193,84,60,0.4)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#C1543C",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            opacity: composeGenLoading[level] ? 0.6 : 1,
          }}
        >
          {composeGenLoading[level] ? "Genero nuove frasi…" : "+ Nuovo pacchetto (nuovo argomento)"}
        </button>
      )}
      {composeGenError[level] && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "#C1543C", textAlign: "center", margin: 0 }}>{composeGenError[level]}</p>
          <button
            onClick={() => onGenerateComposeGroup(level)}
            disabled={composeGenLoading[level]}
            style={{
              background: "none",
              border: "1px solid #C1543C",
              borderRadius: 8,
              padding: "3px 10px",
              color: "#C1543C",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            🔄 Riprova
          </button>
        </div>
      )}
    </div>
  );
}

function ComposeItemCard({ item, level, itemKey, ttsSettings: _ttsSettings, premium, speedMult = 1 }) {
  const [builderState, setBuilderState] = useState({ chosen: [], pool: shuffleOnce(item.tokens) });
  const [checked, setChecked] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const ttsSettings = { ..._ttsSettings, rate: (LEVEL_RATE[level] || _ttsSettings.rate) * speedMult };

  useEffect(() => {
    setBuilderState({ chosen: [], pool: shuffleOnce(item.tokens) });
    setChecked(false);
  }, [itemKey]);

  const isCorrect = normalizeText(builderState.chosen.map((c) => c.t).join(" ")) === normalizeText(item.ru);

  return (
    <div
      style={{
        background: "#232E3D",
        border: "1px solid rgba(240,234,216,0.1)",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 15, marginBottom: 10 }}>{item.it}</div>

      <div
        style={{
          minHeight: 40,
          border: "1px dashed rgba(240,234,216,0.25)",
          borderRadius: 10,
          padding: 8,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 8,
        }}
      >
        {builderState.chosen.length === 0 && (
          <span style={{ fontSize: 12, opacity: 0.35 }}>Tocca le parole qui sotto in ordine…</span>
        )}
        {builderState.chosen.map((tok, idx) => (
          <button
            key={idx}
            onClick={() => {
              setChecked(false);
              setBuilderState((s) => {
                const chosen = [...s.chosen];
                const [removed] = chosen.splice(idx, 1);
                return { chosen, pool: [...s.pool, removed] };
              });
            }}
            style={{
              background: "rgba(91,132,177,0.3)",
              border: "1px solid rgba(91,132,177,0.5)",
              borderRadius: 8,
              padding: "6px 10px",
              color: "#F0EAD8",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {tok.t}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {builderState.pool.map((tok, idx) => (
          <button
            key={idx}
            onClick={() => {
              setChecked(false);
              setBuilderState((s) => {
                const pool = [...s.pool];
                pool.splice(idx, 1);
                return { chosen: [...s.chosen, tok], pool };
              });
            }}
            style={{
              background: "#1B2430",
              border: "1px solid rgba(240,234,216,0.15)",
              borderRadius: 8,
              padding: "6px 10px",
              color: "#F0EAD8",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {tok.t}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setChecked(true)}
          disabled={builderState.pool.length > 0}
          style={{
            background: "#7C8C6B",
            border: "none",
            borderRadius: 8,
            padding: "7px 14px",
            color: "#1B2430",
            fontWeight: 700,
            fontSize: 13,
            cursor: builderState.pool.length > 0 ? "default" : "pointer",
            opacity: builderState.pool.length > 0 ? 0.5 : 1,
          }}
        >
          Verifica
        </button>
        <button
          onClick={() => {
            setBuilderState({ chosen: [], pool: shuffleOnce(item.tokens) });
            setChecked(false);
          }}
          style={{
            background: "none",
            border: "1px solid rgba(240,234,216,0.2)",
            borderRadius: 8,
            padding: "7px 14px",
            color: "#F0EAD8",
            fontSize: 13,
            cursor: "pointer",
            opacity: 0.7,
          }}
        >
          Ricomincia
        </button>
        <button
          onClick={async () => {
            setAudioLoading(true);
            setAudioError(null);
            await playAudio(item.ru, { ttsSettings, premium }, (msg) => setAudioError(msg));
            setAudioLoading(false);
          }}
          disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)}
          title="Ascolta la frase corretta"
          style={{ ...iconBtnStyle, width: 32, height: 32 }}
        >
          <Volume2 size={13} />
        </button>
      </div>

      {audioError && <div style={{ fontSize: 11, color: "#C1543C", marginTop: 6 }}>{audioError}</div>}

      {checked && (
        <div style={{ marginTop: 10, fontSize: 14, color: isCorrect ? "#7C8C6B" : "#C1543C" }}>
          {isCorrect ? "Esatto! 🎉" : `Non proprio — la frase corretta è: "${item.ru}"`}
        </div>
      )}
    </div>
  );
}

// ---------- Daily session ----------

function SessionView({ ttsSettings: _ttsSettings, premium, sessionLevel, sessionSteps, sessionIndex, setSessionIndex, onGenerateSession }) {
  const [flipped, setFlipped] = useState(false);
  const [builderState, setBuilderState] = useState(null);
  const [checked, setChecked] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [pron, setPron] = useState(null);

  const step = sessionSteps[sessionIndex];
  const ttsSettings = { ..._ttsSettings, rate: LEVEL_RATE[sessionLevel] || _ttsSettings.rate };

  useEffect(() => {
    setFlipped(false);
    setChecked(false);
    setPron(null);
    setAudioError(null);
    if (step?.type === "compose") {
      setBuilderState({ chosen: [], pool: shuffleOnce(step.item.tokens) });
    } else {
      setBuilderState(null);
    }
  }, [sessionIndex, step?.type]);

  async function play(text) {
    setAudioLoading(true);
    setAudioError(null);
    await playAudio(text, { ttsSettings, premium }, (msg) => setAudioError(msg));
    setAudioLoading(false);
  }

  if (!sessionLevel || !sessionSteps.length) {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
        <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
          Sessione giornaliera
        </h2>
        <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
          Un piccolo allenamento misto: qualche carta, una frase, una declinazione, un verbo — pescati da tutte le
          sezioni. Scegli un livello per iniziare.
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => onGenerateSession(l.id)}
              style={{
                background: l.color,
                border: "none",
                borderRadius: 20,
                padding: "8px 16px",
                color: "#1B2430",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {l.id}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (sessionIndex >= sessionSteps.length) {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
        <h2 className="display" style={{ fontSize: 22, marginBottom: 8 }}>
          Sessione completata!
        </h2>
        <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>
          Hai finito l'allenamento di oggi per il livello {sessionLevel}.
        </p>
        <button
          onClick={() => onGenerateSession(sessionLevel)}
          style={{
            background: "#D9A441",
            border: "none",
            borderRadius: 10,
            padding: "12px 20px",
            color: "#1B2430",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          + Nuova sessione ({sessionLevel})
        </button>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => onGenerateSession(l.id)}
              style={{
                background: l.id === sessionLevel ? l.color : "#232E3D",
                border: "1px solid rgba(240,234,216,0.15)",
                borderRadius: 20,
                padding: "6px 12px",
                color: l.id === sessionLevel ? "#1B2430" : "#F0EAD8",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {l.id}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const progressPct = Math.round((sessionIndex / sessionSteps.length) * 100);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, opacity: 0.6 }}>
          Passo {sessionIndex + 1} di {sessionSteps.length} · livello {sessionLevel}
        </span>
      </div>
      <div style={{ height: 6, background: "#232E3D", borderRadius: 3, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progressPct}%`, background: "#D9A441", transition: "width 0.2s ease" }} />
      </div>

      <div style={{ background: "#232E3D", border: "1px solid rgba(240,234,216,0.1)", borderRadius: 14, padding: 18, minHeight: 160 }}>
        {step.type === "flashcard" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10 }}>📇 VOCABOLARIO</div>
            <div
              onClick={() => setFlipped((f) => !f)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <div className="display" style={{ fontSize: 24 }}>{step.card.ru}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  play(step.card.ru);
                }}
                disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)}
                style={{ ...iconBtnStyle, width: 28, height: 28 }}
              >
                <Volume2 size={14} />
              </button>
            </div>
            {flipped ? (
              <>
                <div className="mono" style={{ fontSize: 13, opacity: 0.6, marginTop: 10 }}>{step.card.translit}</div>
                <div style={{ fontSize: 15, opacity: 0.85, marginTop: 4 }}>{step.card.it}</div>
              </>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.4, marginTop: 10 }}>Tocca la parola per la traduzione</div>
            )}
          </div>
        )}

        {step.type === "phrase" && (
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10 }}>💬 FRASE</div>
            <div className="mono" style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>{step.pattern}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 17, flex: 1 }}>{step.ru}</div>
              <button
                onClick={() => play(step.ru)}
                disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)}
                style={{ ...iconBtnStyle, width: 28, height: 28, flexShrink: 0 }}
              >
                <Volume2 size={14} />
              </button>
              <button
                onClick={() => startPronunciationCheck(step.ru, (u) => setPron(u))}
                disabled={!SPEECH_RECOGNITION_SUPPORTED || pron?.status === "listening"}
                style={{ ...iconBtnStyle, width: 28, height: 28, flexShrink: 0, background: pron?.status === "listening" ? "rgba(193,84,60,0.4)" : iconBtnStyle.background }}
              >
                <Mic size={14} />
              </button>
            </div>
            <div style={{ fontSize: 14, opacity: 0.6, fontStyle: "italic", marginTop: 4 }}>{step.it}</div>
            {pron?.status === "done" && (
              <div style={{ fontSize: 12, marginTop: 6, color: pron.score >= 0.85 ? "#7C8C6B" : pron.score >= 0.6 ? "#D9A441" : "#C1543C" }}>
                {pron.score >= 0.85 ? "Ottima pronuncia! 🎉" : `Ho sentito: "${pron.transcript}"`}
              </div>
            )}
          </div>
        )}

        {step.type === "compose" && builderState && (
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10 }}>🧩 COMPONI</div>
            <div style={{ fontSize: 15, marginBottom: 10 }}>{step.item.it}</div>
            <div style={{ minHeight: 40, border: "1px dashed rgba(240,234,216,0.25)", borderRadius: 10, padding: 8, display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {builderState.chosen.length === 0 && <span style={{ fontSize: 12, opacity: 0.35 }}>Tocca le parole in ordine…</span>}
              {builderState.chosen.map((tok, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChecked(false);
                    setBuilderState((s) => {
                      const chosen = [...s.chosen];
                      const [removed] = chosen.splice(idx, 1);
                      return { chosen, pool: [...s.pool, removed] };
                    });
                  }}
                  style={{ background: "rgba(91,132,177,0.3)", border: "1px solid rgba(91,132,177,0.5)", borderRadius: 8, padding: "6px 10px", color: "#F0EAD8", fontSize: 14, cursor: "pointer" }}
                >
                  {tok.t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {builderState.pool.map((tok, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChecked(false);
                    setBuilderState((s) => {
                      const pool = [...s.pool];
                      pool.splice(idx, 1);
                      return { chosen: [...s.chosen, tok], pool };
                    });
                  }}
                  style={{ background: "#1B2430", border: "1px solid rgba(240,234,216,0.15)", borderRadius: 8, padding: "6px 10px", color: "#F0EAD8", fontSize: 14, cursor: "pointer" }}
                >
                  {tok.t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setChecked(true)}
                disabled={builderState.pool.length > 0}
                style={{ background: "#7C8C6B", border: "none", borderRadius: 8, padding: "7px 14px", color: "#1B2430", fontWeight: 700, fontSize: 13, cursor: builderState.pool.length > 0 ? "default" : "pointer", opacity: builderState.pool.length > 0 ? 0.5 : 1 }}
              >
                Verifica
              </button>
              <button
                onClick={() => play(step.item.ru)}
                disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)}
                style={{ ...iconBtnStyle, width: 32, height: 32 }}
              >
                <Volume2 size={13} />
              </button>
            </div>
            {checked && (
              <div style={{ marginTop: 10, fontSize: 14, color: normalizeText(builderState.chosen.map((c) => c.t).join(" ")) === normalizeText(step.item.ru) ? "#7C8C6B" : "#C1543C" }}>
                {normalizeText(builderState.chosen.map((c) => c.t).join(" ")) === normalizeText(step.item.ru)
                  ? "Esatto! 🎉"
                  : `Non proprio — la frase corretta è: "${step.item.ru}"`}
              </div>
            )}
          </div>
        )}

        {step.type === "declension" && (
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10 }}>📖 CASO</div>
            <div style={{ marginBottom: 8 }}>
              <span className="display" style={{ fontSize: 18, fontWeight: 700 }}>{step.word}</span>
              <span style={{ fontSize: 13, opacity: 0.6 }}> ({step.meaning_it})</span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
              {step.case} <span className="mono" style={{ color: "#D9A441" }}>{step.form}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, fontSize: 15 }}>{step.example.ru}</div>
              <button onClick={() => play(step.example.ru)} disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)} style={{ ...iconBtnStyle, width: 28, height: 28, flexShrink: 0 }}>
                <Volume2 size={14} />
              </button>
            </div>
            <div style={{ fontSize: 13, opacity: 0.6, fontStyle: "italic", marginTop: 4 }}>{step.example.it}</div>
          </div>
        )}

        {step.type === "verb" && (
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10 }}>🗣️ VERBO</div>
            <div style={{ marginBottom: 8 }}>
              <span className="display" style={{ fontSize: 18, fontWeight: 700 }}>{step.word}</span>
              <span style={{ fontSize: 13, opacity: 0.6 }}> ({step.meaning_it})</span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
              {step.label} <span className="mono" style={{ color: "#D9A441" }}>{step.form}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, fontSize: 15 }}>{step.example_ru}</div>
              <button onClick={() => play(step.example_ru)} disabled={audioLoading || (!TTS_SUPPORTED && !premium?.enabled)} style={{ ...iconBtnStyle, width: 28, height: 28, flexShrink: 0 }}>
                <Volume2 size={14} />
              </button>
            </div>
            <div style={{ fontSize: 13, opacity: 0.6, fontStyle: "italic", marginTop: 4 }}>{step.example_it}</div>
          </div>
        )}

        {audioError && <div style={{ fontSize: 12, color: "#C1543C", marginTop: 8 }}>{audioError}</div>}
      </div>

      <button
        onClick={() => setSessionIndex((i) => i + 1)}
        style={{
          width: "100%",
          marginTop: 16,
          background: "#D9A441",
          border: "none",
          borderRadius: 10,
          padding: "12px 16px",
          color: "#1B2430",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        {sessionIndex === sessionSteps.length - 1 ? "Finisci sessione →" : "Avanti →"}
      </button>
    </div>
  );
}

// ---------- Lesson view ----------

function LessonView({
  lesson,
  ttsSettings: _ttsSettings,
  premium,
  showGloss,
  setShowGloss,
  quizPicked,
  setQuizPicked,
  answer,
  setAnswer,
  feedback,
  feedbackLoading,
  onAskFeedback,
  onComplete,
  onBack,
}) {
  const ttsSettings = { ..._ttsSettings, rate: rateForLevel(lesson.id, _ttsSettings.rate) };
  const [grammarPicked, setGrammarPicked] = useState(null);
  const [pron, setPron] = useState({});
  const [audioLoading, setAudioLoading] = useState({});
  const [audioError, setAudioError] = useState({});
  const [drillRevealed, setDrillRevealed] = useState({});
  const [currentSentence, setCurrentSentence] = useState(lesson.sentenceBuilder);
  const [builderState, setBuilderState] = useState({ chosen: [], pool: shuffleOnce(lesson.sentenceBuilder?.tokens) });
  const [builderChecked, setBuilderChecked] = useState(false);
  const [newSentenceLoading, setNewSentenceLoading] = useState(false);
  const [newSentenceError, setNewSentenceError] = useState(null);
  const [lastTopicUsed, setLastTopicUsed] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [topicInput, setTopicInput] = useState("");
  const [vocabDetails, setVocabDetails] = useState({});
  const [vocabDetailsLoading, setVocabDetailsLoading] = useState({});
  const [vocabDetailsError, setVocabDetailsError] = useState({});
  const [vocabOpen, setVocabOpen] = useState({});

  async function toggleVocabDetails(v, i) {
    setVocabOpen((s) => ({ ...s, [i]: !s[i] }));
    if (vocabDetails[i] || vocabDetailsLoading[i]) return;
    setVocabDetailsLoading((s) => ({ ...s, [i]: true }));
    setVocabDetailsError((s) => ({ ...s, [i]: null }));
    try {
      const storageKey = `vocab-detail:${lesson.id}:${v.ru}`;
      const cached = await loadJSON(storageKey, null);
      if (cached) {
        setVocabDetails((s) => ({ ...s, [i]: cached }));
        return;
      }
      const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Analizza questa parola/espressione russa presa da una lezione: "${v.ru}" (traslitterazione: ${v.translit}, traduzione: ${v.it}).

Determina la categoria grammaticale ed elenca le forme rilevanti:
- Se è un sostantivo o aggettivo: indica il genere (maschile/femminile/neutro/plurale) e dai la declinazione nei 6 casi (singolare), con UN breve esempio di frase per ciascun caso.
- Se è un verbo: indica l'aspetto (perfettivo/imperfettivo) e dai le forme principali (presente o futuro alla 1a persona, passato, imperativo), con un breve esempio per ciascuna.
- Se è invariabile (avverbio, particella, congiunzione, interiezione): dillo chiaramente e dai 2-3 esempi d'uso in contesti diversi al posto delle forme.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"type":"sostantivo","gender":"maschile","note_it":"breve nota grammaticale in italiano, 1 frase","forms":[{"label":"Nominativo","form":"...","example_ru":"...","example_it":"..."}]}

Il campo "type" deve essere uno tra: sostantivo, aggettivo, verbo, invariabile. Il campo "gender" va con null se non applicabile (es. per verbi o parole invariabili). IMPORTANTE — accento tonico: nel campo "form" di ogni voce, segna la sillaba accentata con il carattere Unicode U+0301 subito dopo la vocale accentata (non serve per parole di una sola sillaba, e non va messo dentro le frasi di esempio).`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.type || !parsed.forms) {
        throw new Error("Struttura incompleta.");
      }
      setVocabDetails((s) => ({ ...s, [i]: parsed }));
      saveJSON(storageKey, parsed);
    } catch (e) {
      setVocabDetailsError((s) => ({ ...s, [i]: e.message || "Non sono riuscita a caricare i dettagli." }));
    } finally {
      setVocabDetailsLoading((s) => ({ ...s, [i]: false }));
    }
  }

  async function getNewSentence(topic) {
    setNewSentenceLoading(true);
    setNewSentenceError(null);
    setLastTopicUsed(topic || "");
    try {
      const vocabList = lesson.vocab.map((v) => v.ru).join(", ");
      const topicLine = topic && topic.trim()
        ? `L'argomento richiesto dallo studente è: "${topic.trim()}". Usa quell'argomento, restando comunque al livello adatto alla lezione.`
        : `Scegli tu un argomento coerente con questa lezione (vocabolario: ${vocabList}; argomento della lezione: ${lesson.title} — ${lesson.subtitle}).`;

      const prompt = `Sei un'insegnante di russo madrelingua per studenti italiani. Crea UNA nuova frase russa breve (5-9 parole), diversa da: "${currentSentence?.answer || ""}".

${topicLine}

Poi scegli UN sostantivo chiave della frase (al singolare) e forniscine la declinazione completa nei 6 casi russi.

${JSON_FORMAT_INSTRUCTIONS}

Struttura richiesta:
{"instruction_it":"Metti le parole in ordine.","tokens":["...parole della frase in ordine sparso..."],"answer":"la frase corretta completa, con maiuscola iniziale e punteggiatura finale","answer_it":"traduzione italiana della frase","declension":{"word":"forma base al nominativo","meaning_it":"traduzione italiana","cases":[{"case":"Именительный","meaning_it":"chi? cosa?","form":"..."},{"case":"Родительный","meaning_it":"di chi? di cosa?","form":"..."},{"case":"Дательный","meaning_it":"a chi? a cosa?","form":"..."},{"case":"Винительный","meaning_it":"chi? cosa? (oggetto)","form":"..."},{"case":"Творительный","meaning_it":"con chi? con cosa?","form":"..."},{"case":"Предложный","meaning_it":"di chi/cosa (con о/в/на)","form":"..."}]}}`;

      const parsed = await callClaudeJSON(prompt);
      if (!parsed.tokens || !parsed.answer) {
        throw new Error("Struttura incompleta.");
      }
      setCurrentSentence(parsed);
      setBuilderState({ chosen: [], pool: shuffleOnce(parsed.tokens) });
      setBuilderChecked(false);
      setShowTopicInput(false);
      setTopicInput("");
    } catch (e) {
      setNewSentenceError(e.message || "Non sono riuscita a generare una nuova frase.");
    } finally {
      setNewSentenceLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "4px 18px 60px", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: "#F0EAD8", opacity: 0.6, fontSize: 14, cursor: "pointer", marginBottom: 10 }}
      >
        ← Indietro
      </button>

      <h2 className="display" style={{ fontSize: 26, marginBottom: 2 }}>
        {lesson.title}
      </h2>
      <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 18 }}>{lesson.subtitle}</p>

      {!SPEECH_RECOGNITION_SUPPORTED && (
        <p style={{ fontSize: 12, opacity: 0.45, marginBottom: 10 }}>
          Il riconoscimento vocale non è supportato in questo browser: potrai comunque ascoltare, ma non controllare la pronuncia.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
        {lesson.story.map((line, i) => {
          const p = pron[i];
          return (
            <div
              key={i}
              style={{
                background: "#232E3D",
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <div onClick={() => setShowGloss((g) => ({ ...g, [i]: !g[i] }))} style={{ cursor: "pointer", flex: 1 }}>
                  <div style={{ fontSize: 17 }}>{line.ru}</div>
                  {showGloss[i] && (
                    <div style={{ fontSize: 14, opacity: 0.6, marginTop: 4, fontStyle: "italic" }}>{line.it}</div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => setShowGloss((g) => ({ ...g, [i]: !g[i] }))}
                    title="Mostra traduzione"
                    style={{
                      ...iconBtnStyle,
                      background: showGloss[i] ? "rgba(217,164,65,0.3)" : iconBtnStyle.background,
                    }}
                  >
                    <Languages size={15} />
                  </button>
                  <button
                    onClick={async () => {
                      setAudioLoading((a) => ({ ...a, [i]: true }));
                      setAudioError((a) => ({ ...a, [i]: null }));
                      await playAudio(line.ru, { ttsSettings, premium }, (msg) =>
                        setAudioError((a) => ({ ...a, [i]: msg }))
                      );
                      setAudioLoading((a) => ({ ...a, [i]: false }));
                    }}
                    disabled={!TTS_SUPPORTED && !premium?.enabled}
                    title="Ascolta"
                    style={iconBtnStyle}
                  >
                    <Volume2 size={15} />
                  </button>
                  <button
                    onClick={() => startPronunciationCheck(line.ru, (u) => setPron((prev) => ({ ...prev, [i]: u })))}
                    disabled={!SPEECH_RECOGNITION_SUPPORTED || p?.status === "listening"}
                    title="Prova a pronunciare"
                    style={{
                      ...iconBtnStyle,
                      background: p?.status === "listening" ? "rgba(193,84,60,0.4)" : iconBtnStyle.background,
                    }}
                  >
                    <Mic size={15} />
                  </button>
                </div>
              </div>

              {audioLoading[i] && <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>Genero l'audio…</div>}
              {audioError[i] && <div style={{ fontSize: 12, color: "#C1543C", marginTop: 6 }}>{audioError[i]}</div>}

              {p?.status === "listening" && (
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>In ascolto…</div>
              )}
              {p?.status === "denied" && (
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>
                  Devi consentire l'uso del microfono al browser per controllare la pronuncia.
                </div>
              )}
              {p?.status === "error" && (
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>Non ho sentito bene, riprova.</div>
              )}
              {p?.status === "done" && (
                <div
                  style={{
                    fontSize: 13,
                    marginTop: 6,
                    color: p.score >= 0.85 ? "#7C8C6B" : p.score >= 0.6 ? "#D9A441" : "#C1543C",
                  }}
                >
                  {p.score >= 0.85
                    ? "Ottima pronuncia! 🎉"
                    : p.score >= 0.6
                    ? `Quasi giusto — ho sentito: "${p.transcript}"`
                    : `Riprova, parlando più lentamente — ho sentito: "${p.transcript}"`}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 12, opacity: 0.4, marginTop: 0, marginBottom: 22 }}>
        Tocca una riga per la traduzione · 🔊 per ascoltare · 🎤 per provare a pronunciarla
      </p>

      {lesson.grammar && (
        <div style={{ marginBottom: 24 }}>
          <div className="display" style={{ fontSize: 16, marginBottom: 8, opacity: 0.85 }}>
            Grammatica
          </div>
          <div
            style={{
              background: "rgba(124,140,107,0.1)",
            border: "1px solid rgba(124,140,107,0.3)",
            borderRadius: 10,
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div className="mono" style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>
            {lesson.grammar.pattern}
          </div>
          <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 8 }}>{lesson.grammar.explanation_it}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {lesson.grammar.examples.map((ex, i) => (
              <div key={i} style={{ fontSize: 14, opacity: 0.9 }}>
                · {ex}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 6 }}>{lesson.grammar.exercise.template}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {lesson.grammar.exercise.options.map((opt, i) => {
            const picked = grammarPicked === i;
            const isCorrect = i === lesson.grammar.exercise.correct;
            const revealed = grammarPicked !== null;
            let bg = "#232E3D";
            if (revealed && isCorrect) bg = "rgba(124,140,107,0.35)";
            else if (revealed && picked && !isCorrect) bg = "rgba(193,84,60,0.35)";
            return (
              <button
                key={i}
                onClick={() => setGrammarPicked(i)}
                style={{
                  background: bg,
                  border: "1px solid rgba(240,234,216,0.12)",
                  borderRadius: 8,
                  padding: "7px 12px",
                  color: "#F0EAD8",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {grammarPicked !== null && lesson.grammar.exercise.full_ru && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <button
              onClick={async () => {
                setAudioLoading((a) => ({ ...a, grammarEx: true }));
                setAudioError((a) => ({ ...a, grammarEx: null }));
                await playAudio(lesson.grammar.exercise.full_ru, { ttsSettings, premium }, (msg) =>
                  setAudioError((a) => ({ ...a, grammarEx: msg }))
                );
                setAudioLoading((a) => ({ ...a, grammarEx: false }));
              }}
              disabled={audioLoading.grammarEx || (!TTS_SUPPORTED && !premium?.enabled)}
              title="Ascolta"
              style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
            >
              <Volume2 size={12} />
            </button>
            <span style={{ fontSize: 15, opacity: 0.75, fontStyle: "italic" }}>{lesson.grammar.exercise.full_it}</span>
          </div>
        )}
      </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 16, marginBottom: 8, opacity: 0.85 }}>
          Vocabolario
        </div>
        <p style={{ fontSize: 12, opacity: 0.45, marginTop: -4, marginBottom: 10 }}>
          Tocca una parola per vedere genere/tipo e le sue forme, con un esempio per ciascuna.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lesson.vocab.map((v, i) => (
            <div key={i}>
              <button
                onClick={() => toggleVocabDetails(v, i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "rgba(217,164,65,0.12)",
                  border: "1px solid rgba(217,164,65,0.35)",
                  borderRadius: vocabOpen[i] ? "12px 12px 0 0" : 20,
                  padding: "6px 12px",
                  fontSize: 14,
                  color: "#F0EAD8",
                  cursor: "pointer",
                }}
              >
                <span>{v.ru}</span>
                <span className="mono" style={{ opacity: 0.5, marginLeft: 6 }}>
                  {v.translit}
                </span>
                <span style={{ opacity: 0.7, marginLeft: 6 }}>· {v.it}</span>
                <span style={{ opacity: 0.4, marginLeft: 6, fontSize: 12 }}>{vocabOpen[i] ? "▲" : "▼"}</span>
              </button>

              {vocabOpen[i] && (
                <div
                  style={{
                    background: "#232E3D",
                    border: "1px solid rgba(217,164,65,0.25)",
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    padding: 12,
                  }}
                >
                  {vocabDetailsLoading[i] && (
                    <div style={{ fontSize: 13, opacity: 0.5 }}>Analizzo la parola…</div>
                  )}
                  {vocabDetailsError[i] && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ fontSize: 13, color: "#C1543C" }}>{vocabDetailsError[i]}</div>
                      <button
                        onClick={() => toggleVocabDetails(v, i)}
                        style={{
                          background: "none",
                          border: "1px solid #C1543C",
                          borderRadius: 8,
                          padding: "3px 10px",
                          color: "#C1543C",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        🔄 Riprova
                      </button>
                    </div>
                  )}
                  {vocabDetails[i] && (
                    <>
                      <div style={{ fontSize: 13, marginBottom: 8 }}>
                        <span style={{ fontWeight: 700 }}>
                          {vocabDetails[i].type}
                          {vocabDetails[i].gender ? ` · ${vocabDetails[i].gender}` : ""}
                        </span>
                        {vocabDetails[i].note_it && (
                          <span style={{ opacity: 0.6 }}> — {vocabDetails[i].note_it}</span>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {vocabDetails[i].forms.map((f, fi) => {
                          const audioKey = `vocabform-${i}-${fi}`;
                          return (
                            <div key={fi} style={{ borderTop: fi > 0 ? "1px solid rgba(240,234,216,0.08)" : "none", paddingTop: fi > 0 ? 8 : 0 }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 12, opacity: 0.55 }}>{f.label}</span>
                                <span className="mono" style={{ fontSize: 14, color: "#D9A441" }}>{f.form}</span>
                              </div>
                              {f.example_ru && (
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 2 }}>
                                  <div style={{ flex: 1, fontSize: 13 }}>
                                    {f.example_ru}
                                    <span style={{ opacity: 0.55, fontStyle: "italic" }}> — {f.example_it}</span>
                                  </div>
                                  <button
                                    onClick={async () => {
                                      setAudioLoading((a) => ({ ...a, [audioKey]: true }));
                                      setAudioError((a) => ({ ...a, [audioKey]: null }));
                                      await playAudio(f.example_ru, { ttsSettings, premium }, (msg) =>
                                        setAudioError((a) => ({ ...a, [audioKey]: msg }))
                                      );
                                      setAudioLoading((a) => ({ ...a, [audioKey]: false }));
                                    }}
                                    disabled={audioLoading[audioKey] || (!TTS_SUPPORTED && !premium?.enabled)}
                                    title="Ascolta"
                                    style={{ ...iconBtnStyle, width: 24, height: 24, flexShrink: 0 }}
                                  >
                                    <Volume2 size={11} />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {currentSentence && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div className="display" style={{ fontSize: 16, opacity: 0.85 }}>
              Costruisci la frase
            </div>
            <button
              onClick={() => setShowTopicInput((s) => !s)}
              disabled={newSentenceLoading}
              style={{
                background: "none",
                border: "1px solid rgba(217,164,65,0.4)",
                borderRadius: 8,
                padding: "4px 10px",
                color: "#D9A441",
                fontSize: 13,
                cursor: "pointer",
                opacity: newSentenceLoading ? 0.5 : 1,
              }}
            >
              {newSentenceLoading ? "Genero…" : "🔄 Nuova frase"}
            </button>
          </div>

          {showTopicInput && !newSentenceLoading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 10,
                background: "#232E3D",
                border: "1px solid rgba(217,164,65,0.3)",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Che contesto vuoi? (es. al lavoro, in viaggio…)"
                  style={{
                    flex: 1,
                    background: "#1B2430",
                    color: "#F0EAD8",
                    border: "1px solid rgba(240,234,216,0.2)",
                    borderRadius: 6,
                    padding: "6px 8px",
                    fontSize: 14,
                  }}
                />
                <button
                  onClick={() => getNewSentence(topicInput)}
                  style={{
                    background: "#D9A441",
                    border: "none",
                    borderRadius: 6,
                    padding: "0 12px",
                    color: "#1B2430",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Genera
                </button>
                <button
                  onClick={() => getNewSentence(null)}
                  title="Lascia scegliere all'IA"
                  style={{
                    background: "none",
                    border: "1px solid rgba(240,234,216,0.2)",
                    borderRadius: 6,
                    padding: "0 10px",
                    color: "#F0EAD8",
                    fontSize: 13,
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                >
                  Sorprendimi
                </button>
              </div>

              <div style={{ fontSize: 11, opacity: 0.5 }}>Oppure scegli un contesto:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CONTEXT_SUGGESTIONS.map((ctx) => (
                  <button
                    key={ctx}
                    onClick={() => {
                      setTopicInput(ctx);
                      getNewSentence(ctx);
                    }}
                    style={{
                      background: "rgba(91,132,177,0.15)",
                      border: "1px solid rgba(91,132,177,0.4)",
                      borderRadius: 14,
                      padding: "4px 10px",
                      color: "#F0EAD8",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {ctx}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 10 }}>{currentSentence.instruction_it}</p>
          {newSentenceError && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <p style={{ fontSize: 13, color: "#C1543C", margin: 0 }}>{newSentenceError}</p>
              <button
                onClick={() => getNewSentence(lastTopicUsed)}
                disabled={newSentenceLoading}
                style={{
                  background: "none",
                  border: "1px solid #C1543C",
                  borderRadius: 8,
                  padding: "3px 10px",
                  color: "#C1543C",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                🔄 Riprova
              </button>
            </div>
          )}

          <div
            style={{
              minHeight: 42,
              border: "1px dashed rgba(240,234,216,0.25)",
              borderRadius: 10,
              padding: 10,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 10,
            }}
          >
            {builderState.chosen.length === 0 && (
              <span style={{ fontSize: 13, opacity: 0.35 }}>Tocca le parole qui sotto in ordine…</span>
            )}
            {builderState.chosen.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setBuilderChecked(false);
                  setBuilderState((s) => {
                    const chosen = [...s.chosen];
                    const [removed] = chosen.splice(idx, 1);
                    return { chosen, pool: [...s.pool, removed] };
                  });
                }}
                style={{
                  background: "rgba(91,132,177,0.3)",
                  border: "1px solid rgba(91,132,177,0.5)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#F0EAD8",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {item.t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {builderState.pool.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setBuilderChecked(false);
                  setBuilderState((s) => {
                    const pool = [...s.pool];
                    pool.splice(idx, 1);
                    return { chosen: [...s.chosen, item], pool };
                  });
                }}
                style={{
                  background: "#232E3D",
                  border: "1px solid rgba(240,234,216,0.15)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#F0EAD8",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {item.t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setBuilderChecked(true)}
              disabled={builderState.pool.length > 0}
              style={{
                background: "#7C8C6B",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#1B2430",
                fontWeight: 700,
                fontSize: 14,
                cursor: builderState.pool.length > 0 ? "default" : "pointer",
                opacity: builderState.pool.length > 0 ? 0.5 : 1,
              }}
            >
              Verifica
            </button>
            <button
              onClick={() => {
                setBuilderState({ chosen: [], pool: shuffleOnce(currentSentence.tokens) });
                setBuilderChecked(false);
              }}
              style={{
                background: "none",
                border: "1px solid rgba(240,234,216,0.2)",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#F0EAD8",
                fontSize: 14,
                cursor: "pointer",
                opacity: 0.7,
              }}
            >
              Ricomincia
            </button>
          </div>

          {builderChecked && (
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color:
                  normalizeText(builderState.chosen.map((c) => c.t).join(" ")) === normalizeText(currentSentence.answer)
                    ? "#7C8C6B"
                    : "#C1543C",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>
                  {normalizeText(builderState.chosen.map((c) => c.t).join(" ")) === normalizeText(currentSentence.answer)
                    ? "Esatto! 🎉"
                    : `Non proprio — la frase corretta è: "${currentSentence.answer}"`}
                </span>
                <button
                  onClick={async () => {
                    setAudioLoading((a) => ({ ...a, sentenceCheck: true }));
                    setAudioError((a) => ({ ...a, sentenceCheck: null }));
                    await playAudio(currentSentence.answer, { ttsSettings, premium }, (msg) =>
                      setAudioError((a) => ({ ...a, sentenceCheck: msg }))
                    );
                    setAudioLoading((a) => ({ ...a, sentenceCheck: false }));
                  }}
                  disabled={audioLoading.sentenceCheck || (!TTS_SUPPORTED && !premium?.enabled)}
                  title="Ascolta"
                  style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
                >
                  <Volume2 size={12} />
                </button>
              </div>
              {currentSentence.answer_it && (
                <div style={{ fontSize: 15, opacity: 0.75, fontStyle: "italic", marginTop: 3 }}>
                  {currentSentence.answer_it}
                </div>
              )}
            </div>
          )}

          {currentSentence.declension && (
            <div
              style={{
                marginTop: 14,
                background: "rgba(154,107,158,0.1)",
                border: "1px solid rgba(154,107,158,0.3)",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                Declinazione di{" "}
                <span className="display" style={{ fontWeight: 700 }}>
                  {currentSentence.declension.word}
                </span>{" "}
                <span style={{ opacity: 0.6 }}>({currentSentence.declension.meaning_it})</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {currentSentence.declension.cases.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      padding: "4px 0",
                      borderBottom: i < currentSentence.declension.cases.length - 1 ? "1px solid rgba(240,234,216,0.08)" : "none",
                    }}
                  >
                    <span style={{ opacity: 0.65 }}>
                      {c.case} <span style={{ opacity: 0.5 }}>({c.meaning_it})</span>
                    </span>
                    <span style={{ fontWeight: 700 }}>{c.form}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 16, marginBottom: 8, opacity: 0.85 }}>
          {lesson.quiz.question}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lesson.quiz.options.map((opt, i) => {
            const picked = quizPicked === i;
            const isCorrect = i === lesson.quiz.correct;
            const revealed = quizPicked !== null;
            let bg = "#232E3D";
            if (revealed && isCorrect) bg = "rgba(124,140,107,0.35)";
            else if (revealed && picked && !isCorrect) bg = "rgba(193,84,60,0.35)";
            return (
              <button
                key={i}
                onClick={() => setQuizPicked(i)}
                style={{
                  background: bg,
                  border: "1px solid rgba(240,234,216,0.12)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#F0EAD8",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {opt}
                {revealed && isCorrect && <Check size={16} color="#7C8C6B" />}
                {revealed && picked && !isCorrect && <X size={16} color="#C1543C" />}
              </button>
            );
          })}
        </div>

        {lesson.translationDrills && (
          <div style={{ marginTop: 20 }}>
            <div className="display" style={{ fontSize: 16, marginBottom: 8, opacity: 0.85 }}>
              Traduci al volo
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lesson.translationDrills.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: "#232E3D",
                    border: "1px solid rgba(240,234,216,0.1)",
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>{d.prompt_it}</div>
                  {drillRevealed[i] ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, color: "#D9A441" }}>{d.answer_ru}</span>
                      <button
                        onClick={async () => {
                          setAudioLoading((a) => ({ ...a, [`drill${i}`]: true }));
                          setAudioError((a) => ({ ...a, [`drill${i}`]: null }));
                          await playAudio(d.answer_ru, { ttsSettings, premium }, (msg) =>
                            setAudioError((a) => ({ ...a, [`drill${i}`]: msg }))
                          );
                          setAudioLoading((a) => ({ ...a, [`drill${i}`]: false }));
                        }}
                        disabled={audioLoading[`drill${i}`] || (!TTS_SUPPORTED && !premium?.enabled)}
                        title="Ascolta"
                        style={{ ...iconBtnStyle, width: 24, height: 24, flexShrink: 0 }}
                      >
                        <Volume2 size={11} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDrillRevealed((r) => ({ ...r, [i]: true }))}
                      style={{
                        background: "none",
                        border: "1px solid rgba(217,164,65,0.4)",
                        borderRadius: 6,
                        padding: "4px 10px",
                        color: "#D9A441",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Mostra la risposta
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="display" style={{ fontSize: 16, marginBottom: 8, opacity: 0.85 }}>
          <Sparkles size={14} style={{ verticalAlign: -2, marginRight: 4 }} />
          {lesson.production}
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Scrivi in russo…"
          rows={3}
          style={{
            width: "100%",
            background: "#232E3D",
            border: "1px solid rgba(240,234,216,0.2)",
            borderRadius: 10,
            padding: 12,
            color: "#F0EAD8",
            fontSize: 16,
            resize: "vertical",
          }}
        />
        <button
          onClick={onAskFeedback}
          disabled={!answer.trim() || feedbackLoading}
          style={{
            marginTop: 8,
            background: "#5B84B1",
            border: "none",
            borderRadius: 8,
            padding: "9px 16px",
            color: "#1B2430",
            fontWeight: 700,
            fontSize: 14,
            cursor: answer.trim() ? "pointer" : "default",
            opacity: !answer.trim() || feedbackLoading ? 0.5 : 1,
          }}
        >
          {feedbackLoading ? "Correggo…" : "Correggi la mia frase"}
        </button>

        {feedback && (
          <div
            style={{
              marginTop: 12,
              background: "rgba(91,132,177,0.12)",
              border: "1px solid rgba(91,132,177,0.35)",
              borderRadius: 10,
              padding: 14,
            }}
          >
            {feedback.corrected && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 17 }}>{feedback.corrected}</span>
                <button
                  onClick={async () => {
                    setAudioLoading((a) => ({ ...a, feedbackCorrected: true }));
                    setAudioError((a) => ({ ...a, feedbackCorrected: null }));
                    await playAudio(feedback.corrected, { ttsSettings, premium }, (msg) =>
                      setAudioError((a) => ({ ...a, feedbackCorrected: msg }))
                    );
                    setAudioLoading((a) => ({ ...a, feedbackCorrected: false }));
                  }}
                  disabled={audioLoading.feedbackCorrected || (!TTS_SUPPORTED && !premium?.enabled)}
                  title="Ascolta"
                  style={{ ...iconBtnStyle, width: 26, height: 26, flexShrink: 0 }}
                >
                  <Volume2 size={12} />
                </button>
              </div>
            )}
            <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 4 }}>{feedback.note_it}</div>
            <div style={{ fontSize: 14, opacity: 0.6, fontStyle: "italic" }}>{feedback.encouragement_it}</div>
          </div>
        )}
      </div>

      <button
        onClick={onComplete}
        style={{
          width: "100%",
          background: "#D9A441",
          border: "none",
          borderRadius: 10,
          padding: "12px 16px",
          color: "#1B2430",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        Completa lezione
      </button>
    </div>
  );
}

// ---------- Flashcards ----------

function FlashcardView({
  card,
  flipped,
  setFlipped,
  onReview,
  onToggleMastered,
  cardIsMastered,
  count,
  learningCount,
  masteredCount,
  cardFilter,
  setCardFilter,
  ttsSettings: _ttsSettings,
  premium,
}) {
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [pron, setPron] = useState(null);
  useEffect(() => {
    setPron(null);
  }, [card?.ru]);

  const filterBar = (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <button
        onClick={() => setCardFilter("learning")}
        style={{
          flex: 1,
          background: cardFilter === "learning" ? "rgba(217,164,65,0.25)" : "#232E3D",
          border: cardFilter === "learning" ? "1px solid #D9A441" : "1px solid rgba(240,234,216,0.15)",
          borderRadius: 10,
          padding: "8px 10px",
          color: "#F0EAD8",
          fontWeight: cardFilter === "learning" ? 700 : 400,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        📖 Da imparare ({learningCount})
      </button>
      <button
        onClick={() => setCardFilter("mastered")}
        style={{
          flex: 1,
          background: cardFilter === "mastered" ? "rgba(124,140,107,0.25)" : "#232E3D",
          border: cardFilter === "mastered" ? "1px solid #7C8C6B" : "1px solid rgba(240,234,216,0.15)",
          borderRadius: 10,
          padding: "8px 10px",
          color: "#F0EAD8",
          fontWeight: cardFilter === "mastered" ? 700 : 400,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        ✅ Imparate ({masteredCount})
      </button>
    </div>
  );

  if (!card) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "20px 18px 60px", textAlign: "center", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
        {learningCount === 0 && masteredCount === 0 ? (
          <div style={{ padding: 40, opacity: 0.6, fontSize: 14 }}>Completa qualche lezione per sbloccare le carte.</div>
        ) : (
          <>
            {filterBar}
            <div style={{ padding: 40, opacity: 0.6, fontSize: 14 }}>
              {cardFilter === "mastered"
                ? "Non hai ancora parole segnate come imparate. Rivedile in \"Da imparare\" e tocca \"Facile\" quando le sai bene."
                : "Hai imparato tutte le parole di questo gruppo! 🎉 Completa altre lezioni per sbloccarne di nuove."}
            </div>
          </>
        )}
      </div>
    );
  }
  const cardLessonId = card.key ? card.key.split(":")[0] : null;
  const ttsSettings = { ..._ttsSettings, rate: rateForLevel(cardLessonId, _ttsSettings.rate) };
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "20px 18px 60px", textAlign: "center", background: "rgba(14,32,64,0.82)", borderRadius: 18 }}>
      {filterBar}
      <p style={{ fontSize: 13, opacity: 0.5, marginBottom: 16 }}>{count} parole in questo gruppo</p>
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          background: "#232E3D",
          border: "1px solid rgba(240,234,216,0.15)",
          borderRadius: 16,
          padding: "50px 20px",
          cursor: "pointer",
          minHeight: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="display" style={{ fontSize: 28 }}>{card.ru}</div>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              setAudioLoading(true);
              setAudioError(null);
              await playAudio(card.ru, { ttsSettings, premium }, (msg) => setAudioError(msg));
              setAudioLoading(false);
            }}
            disabled={!TTS_SUPPORTED && !premium?.enabled}
            style={{ ...iconBtnStyle, width: 28, height: 28 }}
            title="Ascolta"
          >
            <Volume2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              startPronunciationCheck(card.ru, (u) => setPron(u));
            }}
            disabled={!SPEECH_RECOGNITION_SUPPORTED || pron?.status === "listening"}
            title="Prova a pronunciare"
            style={{
              ...iconBtnStyle,
              width: 28,
              height: 28,
              background: pron?.status === "listening" ? "rgba(193,84,60,0.4)" : iconBtnStyle.background,
            }}
          >
            <Mic size={14} />
          </button>
        </div>
        {audioLoading && <div style={{ fontSize: 12, opacity: 0.5 }}>Genero l'audio…</div>}
        {audioError && <div style={{ fontSize: 12, color: "#C1543C" }}>{audioError}</div>}
        {pron?.status === "listening" && <div style={{ fontSize: 13, opacity: 0.6 }}>In ascolto…</div>}
        {pron?.status === "denied" && (
          <div style={{ fontSize: 13, opacity: 0.6 }}>
            Devi consentire l'uso del microfono al browser per controllare la pronuncia.
          </div>
        )}
        {pron?.status === "error" && <div style={{ fontSize: 13, opacity: 0.6 }}>Non ho sentito bene, riprova.</div>}
        {pron?.status === "done" && (
          <div
            style={{
              fontSize: 13,
              marginTop: 2,
              color: pron.score >= 0.85 ? "#7C8C6B" : pron.score >= 0.6 ? "#D9A441" : "#C1543C",
            }}
          >
            {pron.score >= 0.85
              ? "Ottima pronuncia! 🎉"
              : pron.score >= 0.6
              ? `Quasi giusto — ho sentito: "${pron.transcript}"`
              : `Riprova, parlando più lentamente — ho sentito: "${pron.transcript}"`}
          </div>
        )}
        {flipped && (
          <>
            <div className="mono" style={{ fontSize: 14, opacity: 0.6 }}>{card.translit}</div>
            <div style={{ fontSize: 16, opacity: 0.8, marginTop: 6 }}>{card.it}</div>
          </>
        )}
        {!flipped && <div style={{ fontSize: 12, opacity: 0.4 }}>Tocca per girare</div>}
      </div>

      <button
        onClick={onToggleMastered}
        style={{
          width: "100%",
          marginTop: 14,
          background: cardIsMastered ? "rgba(124,140,107,0.25)" : "rgba(217,164,65,0.15)",
          border: cardIsMastered ? "1px solid #7C8C6B" : "1px solid rgba(217,164,65,0.4)",
          borderRadius: 10,
          padding: "10px 14px",
          color: cardIsMastered ? "#7C8C6B" : "#D9A441",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {cardIsMastered ? "✓ Imparata — tocca per rimetterla tra quelle da imparare" : "Segna come Imparata ✓"}
      </button>

      {flipped && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={() => onReview(-1)} style={btnStyle("#C1543C")}>Difficile</button>
          <button onClick={() => onReview(1)} style={btnStyle("#5B84B1")}>Bene</button>
          <button onClick={() => onReview(2)} style={btnStyle("#7C8C6B")}>Facile</button>
        </div>
      )}
    </div>
  );
}

const iconBtnStyle = {
  background: "rgba(240,234,216,0.08)",
  border: "1px solid rgba(240,234,216,0.15)",
  borderRadius: 8,
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#F0EAD8",
  cursor: "pointer",
};

function pkgNavBtnStyle(disabled) {
  return {
    background: "rgba(217,164,65,0.22)",
    border: "2px solid #D9A441",
    borderRadius: 12,
    width: 52,
    height: 52,
    fontSize: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D9A441",
    fontWeight: 700,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
    flexShrink: 0,
  };
}

function btnStyle(color) {
  return {
    flex: 1,
    background: color,
    border: "none",
    borderRadius: 10,
    padding: "10px 0",
    color: "#1B2430",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  };
}
