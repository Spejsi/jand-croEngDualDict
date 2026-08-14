const FALLBACK_DICTIONARY = [
  {
    "en": "hello",
    "hr": "zdravo"
  },
  {
    "en": "goodbye",
    "hr": "doviđenja"
  },
  {
    "en": "please",
    "hr": "molim"
  },
  {
    "en": "thank you",
    "hr": "hvala"
  },
  {
    "en": "yes",
    "hr": "da"
  },
  {
    "en": "no",
    "hr": "ne"
  },
  {
    "en": "man",
    "hr": "muškarac"
  },
  {
    "en": "woman",
    "hr": "žena"
  },
  {
    "en": "child",
    "hr": "dijete"
  },
  {
    "en": "friend",
    "hr": "prijatelj"
  },
  {
    "en": "family",
    "hr": "obitelj"
  },
  {
    "en": "house",
    "hr": "kuća"
  },
  {
    "en": "apartment",
    "hr": "stan"
  },
  {
    "en": "room",
    "hr": "soba"
  },
  {
    "en": "door",
    "hr": "vrata"
  },
  {
    "en": "window",
    "hr": "prozor"
  },
  {
    "en": "table",
    "hr": "stol"
  },
  {
    "en": "chair",
    "hr": "stolica"
  },
  {
    "en": "bed",
    "hr": "krevet"
  },
  {
    "en": "kitchen",
    "hr": "kuhinja"
  },
  {
    "en": "bathroom",
    "hr": "kupaonica"
  },
  {
    "en": "city",
    "hr": "grad"
  },
  {
    "en": "village",
    "hr": "selo"
  },
  {
    "en": "country",
    "hr": "zemlja"
  },
  {
    "en": "road",
    "hr": "cesta"
  },
  {
    "en": "car",
    "hr": "auto"
  },
  {
    "en": "bus",
    "hr": "autobus"
  },
  {
    "en": "train",
    "hr": "vlak"
  },
  {
    "en": "bicycle",
    "hr": "bicikl"
  },
  {
    "en": "airplane",
    "hr": "avion"
  },
  {
    "en": "boat",
    "hr": "brod"
  },
  {
    "en": "water",
    "hr": "voda"
  },
  {
    "en": "food",
    "hr": "hrana"
  },
  {
    "en": "bread",
    "hr": "kruh"
  },
  {
    "en": "milk",
    "hr": "mlijeko"
  },
  {
    "en": "coffee",
    "hr": "kava"
  },
  {
    "en": "tea",
    "hr": "čaj"
  },
  {
    "en": "beer",
    "hr": "pivo"
  },
  {
    "en": "wine",
    "hr": "vino"
  },
  {
    "en": "apple",
    "hr": "jabuka"
  },
  {
    "en": "orange",
    "hr": "naranča"
  },
  {
    "en": "banana",
    "hr": "banana"
  },
  {
    "en": "grape",
    "hr": "grožđe"
  },
  {
    "en": "potato",
    "hr": "krumpir"
  },
  {
    "en": "tomato",
    "hr": "rajčica"
  },
  {
    "en": "salt",
    "hr": "sol"
  },
  {
    "en": "sugar",
    "hr": "šećer"
  },
  {
    "en": "morning",
    "hr": "jutro"
  },
  {
    "en": "afternoon",
    "hr": "poslijepodne"
  },
  {
    "en": "evening",
    "hr": "večer"
  },
  {
    "en": "night",
    "hr": "noć"
  },
  {
    "en": "day",
    "hr": "dan"
  },
  {
    "en": "week",
    "hr": "tjedan"
  },
  {
    "en": "month",
    "hr": "mjesec"
  },
  {
    "en": "year",
    "hr": "godina"
  },
  {
    "en": "time",
    "hr": "vrijeme"
  },
  {
    "en": "today",
    "hr": "danas"
  },
  {
    "en": "tomorrow",
    "hr": "sutra"
  },
  {
    "en": "yesterday",
    "hr": "jučer"
  },
  {
    "en": "spring",
    "hr": "proljeće"
  },
  {
    "en": "summer",
    "hr": "ljeto"
  },
  {
    "en": "autumn",
    "hr": "jesen"
  },
  {
    "en": "winter",
    "hr": "zima"
  },
  {
    "en": "sun",
    "hr": "sunce"
  },
  {
    "en": "star",
    "hr": "zvijezda"
  },
  {
    "en": "rain",
    "hr": "kiša"
  },
  {
    "en": "snow",
    "hr": "snijeg"
  },
  {
    "en": "wind",
    "hr": "vjetar"
  },
  {
    "en": "sky",
    "hr": "nebo"
  },
  {
    "en": "sea",
    "hr": "more"
  },
  {
    "en": "river",
    "hr": "rijeka"
  },
  {
    "en": "mountain",
    "hr": "planina"
  },
  {
    "en": "forest",
    "hr": "šuma"
  },
  {
    "en": "dog",
    "hr": "pas"
  },
  {
    "en": "cat",
    "hr": "mačka"
  },
  {
    "en": "bird",
    "hr": "ptica"
  },
  {
    "en": "fish",
    "hr": "riba"
  },
  {
    "en": "horse",
    "hr": "konj"
  },
  {
    "en": "cow",
    "hr": "krava"
  },
  {
    "en": "school",
    "hr": "škola"
  },
  {
    "en": "teacher",
    "hr": "učitelj"
  },
  {
    "en": "student",
    "hr": "učenik"
  },
  {
    "en": "book",
    "hr": "knjiga"
  },
  {
    "en": "pen",
    "hr": "olovka"
  },
  {
    "en": "paper",
    "hr": "papir"
  },
  {
    "en": "computer",
    "hr": "računalo"
  },
  {
    "en": "phone",
    "hr": "telefon"
  },
  {
    "en": "internet",
    "hr": "internet"
  },
  {
    "en": "music",
    "hr": "glazba"
  },
  {
    "en": "movie",
    "hr": "film"
  },
  {
    "en": "work",
    "hr": "posao"
  },
  {
    "en": "money",
    "hr": "novac"
  },
  {
    "en": "shop",
    "hr": "trgovina"
  },
  {
    "en": "market",
    "hr": "tržnica"
  },
  {
    "en": "hospital",
    "hr": "bolnica"
  },
  {
    "en": "doctor",
    "hr": "liječnik"
  },
  {
    "en": "medicine",
    "hr": "lijek"
  },
  {
    "en": "love",
    "hr": "ljubav"
  },
  {
    "en": "happiness",
    "hr": "sreća"
  },
  {
    "en": "sadness",
    "hr": "tuga"
  },
  {
    "en": "beautiful",
    "hr": "lijep"
  },
  {
    "en": "big",
    "hr": "velik"
  },
  {
    "en": "small",
    "hr": "malen"
  },
  {
    "en": "new",
    "hr": "nov"
  },
  {
    "en": "old",
    "hr": "star"
  },
  {
    "en": "hot",
    "hr": "vruć"
  },
  {
    "en": "cold",
    "hr": "hladan"
  },
  {
    "en": "fast",
    "hr": "brz"
  },
  {
    "en": "slow",
    "hr": "spor"
  },
  {
    "en": "easy",
    "hr": "lak"
  },
  {
    "en": "difficult",
    "hr": "težak"
  },
  {
    "en": "good",
    "hr": "dobar"
  },
  {
    "en": "bad",
    "hr": "loš"
  },
  {
    "en": "open",
    "hr": "otvoren"
  },
  {
    "en": "closed",
    "hr": "zatvoren"
  },
  {
    "en": "left",
    "hr": "lijevo"
  },
  {
    "en": "right",
    "hr": "desno"
  },
  {
    "en": "inside",
    "hr": "unutra"
  },
  {
    "en": "outside",
    "hr": "vani"
  },
  {
    "en": "near",
    "hr": "blizu"
  },
  {
    "en": "far",
    "hr": "daleko"
  },
  {
    "en": "name",
    "hr": "ime"
  },
  {
    "en": "question",
    "hr": "pitanje"
  },
  {
    "en": "answer",
    "hr": "odgovor"
  },
  {
    "en": "language",
    "hr": "jezik"
  },
  {
    "en": "word",
    "hr": "riječ"
  },
  {
    "en": "dictionary",
    "hr": "rječnik"
  },
  {
    "en": "translation",
    "hr": "prijevod"
  },
  {
    "en": "search",
    "hr": "traženje"
  },
  {
    "en": "read",
    "hr": "čitati"
  },
  {
    "en": "write",
    "hr": "pisati"
  },
  {
    "en": "speak",
    "hr": "govoriti"
  },
  {
    "en": "listen",
    "hr": "slušati"
  },
  {
    "en": "buy",
    "hr": "kupiti"
  },
  {
    "en": "sell",
    "hr": "prodati"
  },
  {
    "en": "eat",
    "hr": "jesti"
  },
  {
    "en": "drink",
    "hr": "piti"
  },
  {
    "en": "sleep",
    "hr": "spavati"
  },
  {
    "en": "walk",
    "hr": "hodati"
  },
  {
    "en": "run",
    "hr": "trčati"
  },
  {
    "en": "swim",
    "hr": "plivati"
  },
  {
    "en": "help",
    "hr": "pomoći"
  },
  {
    "en": "drive",
    "hr": "voziti"
  },
  {
    "en": "learn",
    "hr": "učiti"
  },
  {
    "en": "understand",
    "hr": "razumjeti"
  },
  {
    "en": "live",
    "hr": "živjeti"
  },
  {
    "en": "come",
    "hr": "doći"
  },
  {
    "en": "go",
    "hr": "ići"
  },
  {
    "en": "see",
    "hr": "vidjeti"
  },
  {
    "en": "know",
    "hr": "znati"
  },
  {
    "en": "think",
    "hr": "misliti"
  },
  {
    "en": "feel",
    "hr": "osjećati"
  }
];

const state = {
  dictionary: [],
  query: "",
  selectedMode: "auto"
};

const searchInput = document.getElementById("searchInput");
const directionSelect = document.getElementById("directionSelect");
const resultsList = document.getElementById("resultsList");
const directionNote = document.getElementById("directionNote");
const resultCount = document.getElementById("resultCount");

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "dj");
}

function compareByLocale(a, b) {
  return a.localeCompare(b, "hr", { sensitivity: "base" });
}

function inferDirection(query, dictionary) {
  const trimmed = query.trim();
  if (!trimmed) return "en-hr";

  const normalizedQuery = normalizeText(trimmed);
  const looksCroatian = /[čćđšž]/i.test(trimmed);
  const enMatches = dictionary.filter((entry) => normalizeText(entry.en).includes(normalizedQuery)).length;
  const hrMatches = dictionary.filter((entry) => normalizeText(entry.hr).includes(normalizedQuery)).length;

  if (enMatches === 0 && hrMatches === 0) return looksCroatian ? "hr-en" : "en-hr";
  if (hrMatches > enMatches) return "hr-en";
  if (enMatches > hrMatches) return "en-hr";
  return looksCroatian ? "hr-en" : "en-hr";
}

function getDirectionLabel(direction) {
  return direction === "hr-en" ? "Croatian → English" : "English → Croatian";
}

function matchScore(text, query) {
  const source = normalizeText(text);
  const lookup = normalizeText(query.trim());

  if (!lookup) return 4;
  if (source === lookup) return 0;
  if (source.startsWith(lookup)) return 1;
  if (source.includes(` ${lookup}`) || source.includes(`-${lookup}`)) return 2;
  if (source.includes(lookup)) return 3;
  return Number.POSITIVE_INFINITY;
}

function getResults(query, direction, dictionary) {
  const sourceKey = direction === "hr-en" ? "hr" : "en";
  const targetKey = direction === "hr-en" ? "en" : "hr";

  const mapped = dictionary.map((entry) => {
    const source = entry[sourceKey];
    const target = entry[targetKey];
    return { entry, source, target, score: matchScore(source, query) };
  });

  const filtered = query.trim()
    ? mapped.filter((item) => Number.isFinite(item.score))
    : mapped;

  return filtered
    .sort((a, b) => a.score - b.score || compareByLocale(a.source, b.source))
    .slice(0, query.trim() ? 50 : 18);
}

function render() {
  const activeDirection = state.selectedMode === "auto"
    ? inferDirection(state.query, state.dictionary)
    : state.selectedMode;

  const results = getResults(state.query, activeDirection, state.dictionary);
  const label = getDirectionLabel(activeDirection);
  const summary = state.query.trim()
    ? `Showing matches for “${state.query.trim()}” in ${label} mode${state.selectedMode === "auto" ? " (auto-detected)" : ""}.`
    : `Browse a starter list in ${label} mode or type to search.`;

  directionNote.textContent = summary;
  resultCount.textContent = `${results.length} ${results.length === 1 ? "entry" : "entries"}`;
  resultsList.innerHTML = "";

  if (!results.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No matches found. Try a different spelling or switch the search direction.";
    resultsList.appendChild(empty);
    return;
  }

  for (const item of results) {
    const li = document.createElement("li");
    li.className = "result-item";
    li.innerHTML = `
      <h3>${item.source}</h3>
      <p>${item.target}</p>
      <div class="result-tags">
        <span class="tag">EN: ${item.entry.en}</span>
        <span class="tag">HR: ${item.entry.hr}</span>
      </div>
    `;
    resultsList.appendChild(li);
  }
}

async function loadDictionary() {
  try {
    const response = await fetch("../data/dictionary.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (_error) {
    return FALLBACK_DICTIONARY;
  }
}

async function init() {
  state.dictionary = await loadDictionary();
  state.dictionary.sort((a, b) => compareByLocale(a.en, b.en));

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  directionSelect.addEventListener("change", (event) => {
    state.selectedMode = event.target.value;
    render();
  });

  render();
}

init();
