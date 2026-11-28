/** Общие утилиты для globe.html и country.html. */
(function (global) {
  "use strict";
  const ru = (v, d = 0) => Number(v).toLocaleString("ru-RU", { minimumFractionDigits: d, maximumFractionDigits: d });
  const n = (v, d = 2) => (v == null ? "—" : Number(v).toLocaleString("ru-RU", { maximumFractionDigits: d }));
  function pct(v, d = 1) {
    if (v == null) return "—";
    const x = v * 100;
    if (x > 0 && x < 0.05) return "<0,1%";
    return x.toLocaleString("ru-RU", { maximumFractionDigits: d }) + "%";
  }
  const money = (v) => (v == null ? "—" : Math.round(v).toLocaleString("ru-RU") + " ₽");
  const escHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  function fmtDate(s) {
    const d = String(s || "").slice(0, 10).split("-");
    if (d.length !== 3) return "";
    if (d[1] === "01" && d[2] === "01") return d[0];
    return d[2] + "." + d[1] + "." + d[0];
  }
  function fmtStamp(iso) {
    const t = new Date(iso);
    return isFinite(t) ? t.toLocaleString("ru-RU", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    }) : fmtDate(iso);
  }
  const LANG_RU = {
"Afrikaans": "африкаанс", "Albanian": "албанский", "Amharic": "амхарский",
"Arabic": "арабский", "Aramaic": "арамейский", "Armenian": "армянский",
"Austro-Bavarian German": "баварский немецкий", "Aymara": "аймара", "Azerbaijani": "азербайджанский",
"Belarusian": "белорусский", "Belizean Creole": "белизский креольский", "Bengali": "бенгальский",
"Berber": "берберский", "Bislama": "бислама", "Bosnian": "боснийский",
"Bulgarian": "болгарский", "Burmese": "бирманский", "Carolinian": "каролинский",
"Catalan": "каталанский", "Chamorro": "чаморро", "Chewa": "чева",
"Chibarwe": "чибарве", "Chinese": "китайский", "Comorian": "коморский",
"Cook Islands Māori": "маори Островов Кука", "Croatian": "хорватский", "Czech": "чешский",
"Danish": "датский", "Dari": "дари", "Dutch": "нидерландский",
"Dzongkha": "дзонг-кэ", "English": "английский", "Estonian": "эстонский",
"Faroese": "фарерский", "Fiji Hindi": "фиджийский хинди", "Fijian": "фиджийский",
"Filipino": "филиппинский", "Finnish": "финский", "French": "французский",
"Georgian": "грузинский", "German": "немецкий", "Gilbertese": "кирибати",
"Greek": "греческий", "Greenlandic": "гренландский", "Guaraní": "гуарани",
"Guernésiais": "гернсийский", "Haitian Creole": "гаитянский креольский", "Hassaniya": "хассания",
"Hebrew": "иврит", "Herero": "гереро", "Hindi": "хинди",
"Hiri Motu": "хири-моту", "Hungarian": "венгерский", "Icelandic": "исландский",
"Indonesian": "индонезийский", "Irish": "ирландский", "Italian": "итальянский",
"Jamaican Patois": "ямайский патуа", "Japanese": "японский", "Jèrriais": "джерсийский",
"Kalanga": "каланга", "Kazakh": "казахский", "Khmer": "кхмерский",
"Khoekhoe": "кой-кой", "Khoisan": "койсанские", "Kikongo": "киконго",
"Kinyarwanda": "киньяруанда", "Kirundi": "кирунди", "Korean": "корейский",
"Kwangali": "кваньгали", "Kyrgyz": "киргизский", "Lao": "лаосский",
"Latin": "латынь", "Latvian": "латышский", "Lingala": "лингала",
"Lithuanian": "литовский", "Lozi": "лози", "Luxembourgish": "люксембургский",
"Macedonian": "македонский", "Malagasy": "малагасийский", "Malay": "малайский",
"Maldivian": "мальдивский (дивехи)", "Maltese": "мальтийский", "Manx": "мэнский",
"Marshallese": "маршалльский", "Mauritian Creole": "маврикийский креольский", "Moldavian": "молдавский",
"Mongolian": "монгольский", "Montenegrin": "черногорский", "Māori": "маори",
"Nauru": "науруанский", "Ndau": "ндау", "Ndonga": "ндонга",
"Nepali": "непальский", "New Zealand Sign Language": "новозеландский жестовый", "Niuean": "ниуэ",
"Norfuk": "норфолкский", "Northern Ndebele": "северный ндебеле", "Northern Sotho": "северный сото",
"Norwegian": "норвежский", "Norwegian Bokmål": "норвежский букмол", "Norwegian Nynorsk": "норвежский нюношк",
"Palauan": "палауский", "Papiamento": "папьяменто", "Pashto": "пушту",
"Persian (Farsi)": "персидский (фарси)", "Polish": "польский", "Portuguese": "португальский",
"Quechua": "кечуа", "Romanian": "румынский", "Romansh": "ретороманский",
"Russian": "русский", "Sami": "саамский", "Samoan": "самоанский",
"Sango": "санго", "Serbian": "сербский", "Seychellois Creole": "сейшельский креольский",
"Shona": "шона", "Sinhala": "сингальский", "Slovak": "словацкий",
"Slovene": "словенский", "Somali": "сомалийский", "Sorani": "сорани (курдский)",
"Sotho": "сото", "Southern Ndebele": "южный ндебеле", "Southern Sotho": "южный сото",
"Spanish": "испанский", "Swahili": "суахили", "Swazi": "свази",
"Swedish": "шведский", "Swiss German": "швейцарский немецкий", "Tajik": "таджикский",
"Tamil": "тамильский", "Tetum": "тетум", "Thai": "тайский",
"Tigrinya": "тигринья", "Tok Pisin": "ток-писин", "Tokelauan": "токелау",
"Tonga": "тонга", "Tongan": "тонганский", "Tshiluba": "чилуба",
"Tsonga": "тсонга", "Tswana": "тсвана", "Turkish": "турецкий",
"Turkmen": "туркменский", "Tuvaluan": "тувалу", "Ukrainian": "украинский",
"Upper Guinea Creole": "верхнегвинейский креольский", "Urdu": "урду", "Uzbek": "узбекский",
"Venda": "венда", "Vietnamese": "вьетнамский", "Xhosa": "коса",
"Zimbabwean Sign Language": "зимбабвийский жестовый", "Zulu": "зулу",
    };
  const langRu = (x) => LANG_RU[String(x)] || String(x);
  function langList(cat, limit) {
    const all = (cat && cat.languages) || [];
    const shown = limit ? all.slice(0, limit) : all;
    return shown.map((x) => {
      const ru2 = langRu(x);
      const own = /^(русский|английский)$/.test(ru2);
      return own ? "<b class=\"langown\">" + escHtml(ru2) + "</b>" : escHtml(ru2);
    }).join(", ") + (limit && all.length > limit ? " и ещё " + (all.length - limit) : "");
  }
  const VISA_LABEL = {
    visa_free: "безвиз",
    visa_required: "нужна виза",
    visa_on_arrival: "по прибытии",
    visa_or_eta_required: "виза или ETA",
    e_visa: "eVisa",
    visa_on_arrival_or_evisa: "по прибытии / eVisa",
    visa_free_transit: "безвизовый транзит",
    visa_free_de_facto: "безвиз де-факто",
    via_moldova: "через Молдову",
    citizen: "своя страна",
  };
  function visaLabel(code) {
    if (!code) return "—";
    return VISA_LABEL[code] || "уточнить";
  }
  function visaDsLabel(req) {
    if (!req) return "";
    const t = String(req).trim();
    if (/^\d+$/.test(t)) return "безвиз · " + t + " дн.";
    return ({
      "visa free": "безвиз",
      "visa on arrival": "по прибытии",
      "e-visa": "eVisa",
      "eta": "ETA",
      "visa required": "нужна виза",
      "no admission": "въезд закрыт",
      "-1": "своя страна",
    })[t.toLowerCase()] || t;
  }
  function workStatusLabel(ws) {
    if (ws === "yes") return "можно работать на локальном рынке";
    if (ws === "remote") return "только удалёнка / номад-виза";
    if (ws === "no") return "легально работать нельзя";
    return "—";
  }
  const INCOME_RU = {
    "High income": "высокий доход",
    "Upper middle income": "доход выше среднего",
    "Lower middle income": "доход ниже среднего",
    "Low income": "низкий доход",
  };
  const FOOD_CATS = [
    ["eurostat_pli_bread", "Хлеб и крупы"],
    ["eurostat_pli_meat", "Мясо"],
    ["eurostat_pli_fish", "Рыба"],
    ["eurostat_pli_dairy", "Молоко, сыр, яйца"],
    ["eurostat_pli_fruit_veg", "Фрукты и овощи"],
    ["eurostat_pli_alcohol", "Алкоголь"],
    ["eurostat_pli_restaurants", "Рестораны и отели"],
  ];
  const FPMA = [
    ["fpma_milk", "Молоко"],
    ["fpma_bread_flour", "Хлеб / мука"],
    ["fpma_rice", "Рис"],
    ["fpma_potatoes", "Картофель"],
    ["fpma_eggs", "Яйца"],
    ["fpma_sugar", "Сахар"],
    ["fpma_oil", "Масло растительное"],
    ["fpma_beans", "Фасоль / бобы"],
    ["fpma_maize", "Кукурузная мука"],
  ];
  const BASE_RU = { kg: "кг", liter: "литр", piece: "штуку" };
  const FPMA_EMOJI = {
    fpma_milk: "🥛", fpma_bread_flour: "🍞", fpma_rice: "🍚", fpma_potatoes: "🥔",
    fpma_eggs: "🥚", fpma_sugar: "🧂", fpma_oil: "🌻", fpma_beans: "🥫", fpma_maize: "🌽",
  };
  const SOCIAL_LIFE = [
    ["social_life_expectancy", "Продолжительность жизни", (v) => ru(v, 1) + " года"],
    ["social_edu_gdp_pct", "Образование, % ВВП", (v) => ru(v, 1) + "%"],
    ["social_safe_water_pct", "Чистая вода, % населения", (v) => ru(v, 1) + "%"],
  ];
  const SOCIAL_MED = [
    ["social_uhc_index", "Охват медуслугами (UHC)", (v) => ru(v) + " / 100"],
    ["social_physicians", "Врачи на 1000 человек", (v) => ru(v, 1)],
    ["social_hospital_beds", "Больничные койки на 1000", (v) => ru(v, 1)],
    ["social_health_usd_pc", "Расходы на медицину", (v) => "$" + ru(v) + " в год на человека"],
    ["social_infant_mortality", "Младенческая смертность", (v) => ru(v, 1) + " на 1000"],
  ];
  function byMetric(prices) {
    const m = {};
    for (const o of prices || []) m[o.metric] = o;
    return m;
  }
  // Производные метрики штампуются сегодняшним числом (compute_derived берёт
  // max(исходники, сегодня)), и «Корзина vs США · derived · 24.08.2026» читается
  // как замер от вчера — хотя PPP Всемирного банка в ней за 2025 год. Показываем
  // возраст САМОГО СТАРОГО куска: свежий курс не оправдывает позапрошлогодний PPP.
  const BASIS_MIN_DAYS = 60;   // моложе — это обычное дневное обновление, шуметь незачем
  function basisNote(o) {
    const dates = (o.based_on || []).map((x) => x.observed_at).filter(Boolean).sort();
    if (!dates.length || !o.observed_at) return "";
    const days = (Date.parse(o.observed_at) - Date.parse(dates[0])) / 86400000;
    if (!(days > BASIS_MIN_DAYS)) return "";
    return " · основа — данные за " + fmtDate(dates[0]);
  }
  function metricRow(bm, metric, label, fmt) {
    const o = bm[metric];
    if (!o || o.value == null) return "";
    return "<div class=\"row\"><span>" + label + "<small>" + escHtml(o.source || "") + " · " + fmtDate(o.observed_at) + basisNote(o) + "</small></span>"
      + "<span>" + fmt(o.value) + "</span></div>";
  }
  function fpmaRows(bm, emoji) {
    return FPMA.map(([base, label]) => {
      const usd = bm[base + "_usd"];
      const loc = bm[base + "_local"];
      const o = (usd && usd.value != null) ? usd : loc;
      if (!o || o.value == null) return "";
      const e = o.extra || {};
      const unitKey = e.base_unit || String(o.unit || "").replace(/^usd_per_|^per_/, "");
      const unit = BASE_RU[unitKey] ? " за " + BASE_RU[unitKey] : "";
      const raw = e.raw_unit && !/^(kg|liter)$/i.test(String(e.raw_unit))
        ? "<small>в источнике — за " + escHtml(e.raw_unit) + "</small>" : "";
      const value = (usd && usd.value != null)
        ? "$" + ru(usd.value, 2) + (e.local != null && e.local_currency ? " (" + ru(e.local, 2) + " " + e.local_currency + ")" : "")
        : ru(o.value, 2) + " " + (o.currency || "");
      const pic = emoji ? "<span class=\"emo\">" + (FPMA_EMOJI[base] || "") + "</span>" : "";
      return "<div class=\"row\"><span>" + pic + label + unit + "<small>" + escHtml(e.source_name || "FAO") + " · " + fmtDate(o.observed_at) + "</small>" + raw + "</span>"
        + "<span>" + value + "</span></div>";
    }).join("");
  }
  function fuelGradesRow(bm) {
    const o = bm["fuel_gasoline_per_liter_local"];
    const e = (o && o.extra) || {};
    if (!o || o.value == null) return "";
    const ccy = o.currency || "";
    const parts = [];
    if (e.regular != null && e.regular < o.value) parts.push("обычный " + ru(e.regular, 2));
    parts.push("базовый " + ru(o.value, 2));
    if (e.premium != null && e.premium > o.value) parts.push("премиум " + ru(e.premium, 2));
    if (parts.length < 2) return "";
    return "<div class=\"row\"><span>Сорта бензина<small>" + escHtml(o.source) + " · " + ccy + "/л</small></span><span>" + parts.join(" · ") + "</span></div>";
  }
  function childrenExitHtml(iso2) {
    const abos = iso2 === "AB" || iso2 === "OS";
    const body = "С 20.01.2026 свидетельство о рождении для выезда ребёнка до 14 лет больше не годится: нужен загранпаспорт ребёнка либо старый пятилетний загран родителя со сведениями о ребёнке.";
    const except = "Исключение временное — Абхазия и Южная Осетия до конца 2027.";
    if (abos) return body + " " + except;
    return body + " Человек с ребёнком может доехать до границы и развернуться. " + except;
  }
  global.WP = {
    ru, n, pct, money, escHtml, fmtDate, fmtStamp,
    LANG_RU, langRu, langList, VISA_LABEL, visaLabel, visaDsLabel, workStatusLabel,
    INCOME_RU, FOOD_CATS, FPMA, BASE_RU, FPMA_EMOJI, SOCIAL_LIFE, SOCIAL_MED,
    byMetric, metricRow, basisNote, fpmaRows, fuelGradesRow, childrenExitHtml,
  };
})(typeof window !== "undefined" ? window : globalThis);
