const arrowSvg = `<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

let activeTab = "about";

const translations = {
    hr: {
        appTitle: "Englesko-Hrvatski Rječnik",
        appSubtitle: "Brzo i jednostavno pretraživanje riječi i izraza",
        tabAboutBtn: "O aplikaciji",
        tabGuideBtn: "Upute",

        aboutTitle: "O aplikaciji i funkcionalnostima",
        aboutDesc: "Aplikacija omogućuje dvosmjerno pretraživanje riječi između engleskog i hrvatskog jezika. Osmišljena je za brzu svakodnevnu upotrebu s jednostavnim i intuitivnim sučeljem.",
        feat1Label: "Dvosmjerni rječnik:",
        feat1Value: `<span style="white-space: nowrap;">HRV${arrowSvg}ENG</span> / <span style="white-space: nowrap;">ENG${arrowSvg}HRV</span>`,
        feat2Label: "Pretraživanje:",
        feat2Value: "Po riječi ili dijelu riječi",
        feat3Label: "Prikaz rezultata:",
        feat3Value: "Točni i srodni pojmovi",

        sourceTitle: "Izvor podataka i autorstvo",
        sourceDesc: "Baza podataka rječnika temelji se na otvorenom rječničkom projektu autora Gorana Igalyja. Podaci se koriste u skladu s uvjetima licenciranja izvornog projekta.",
        githubBtnText: "Otvori GitHub repozitorij baze",

        appLicenseTitle: "Licenciranje i izvorni kod aplikacije",
        appLicenseDesc: "Ova aplikacija je slobodan softver objavljen pod GNU General Public License v3.0 (GPLv3). Izvorni kod same aplikacije dostupan je na GitHubu.",
        appSourceBtnText: "Otvori GitHub repozitorij aplikacije",

        otherAppsTitle: "Više od istog autora",
        otherAppsDesc: "Pogledajte cijelu kolekciju aplikacija koje sam izradio i pronađite još nešto korisno za sebe.",
        otherAppsBtnText: "Posjetite moj Google Play profil",

        techTitle: "Tehničke specifikacije",
        tech1Label: "Rad bez interneta:",
        tech1Value: "Potpuno funkcionalno izvan mreže",
        tech2Label: "Baza podataka:",
        tech2Value: "Lokalna SQLite baza",
        tech3Label: "Kompatibilnost:",
        tech3Value: "Android 8.0 (Oreo) i noviji",
        tech4Label: "Oglasi:",
        tech4Value: "Google AdMob (nepersonalizirani)",
        tech5Label: "Jezik sučelja:",
        tech5Value: "Hrvatski / Engleski",

        privacyTitle: "Zaštita privatnosti",
        privacyDesc: "Aplikacija ne prikuplja niti pohranjuje osobne podatke korisnika. Mrežna veza koristi se isključivo za prikazivanje oglasa putem AdMob servisa kako bi aplikacija ostala besplatna za korištenje.",

        guideTitle: "Upute za korištenje",
        guideIntro: "Pregled svih funkcionalnosti aplikacije i značenje svakog gumba.",
        guide1Label: "Donji lijevi gumb (Info/Pretraga):",
        guide1Value: "Donji lijevi gumb za navigaciju služi za prebacivanje između ove stranice i stranice za prevođenje. Ikona gumba mijenja se tako da prikazuje stranicu na koju će se korisnik prebaciti kada tapne na gumb.",
        guide2Label: "Donji desni gumb (Close):",
        guide2Value: "Donji desni gumb aplikacije služi za izlaz iz aplikacije. Prije izlaska aplikacija će zatražiti potvrdu. Za potvrdu izlaska odaberite ✓, a za ostanak u aplikaciji odaberite ✕.",
        guide3Label: "Srednji gumbi jezika:",
        guide3Value: "Gumbi sa zastavama na dnu zaslona služe za odabir jezika aplikacije. Dodirom na gumb s hrvatskom zastavom aplikacija se prebacuje na hrvatski jezik, a dodirom na gumb s kombiniranom zastavom Ujedinjenog Kraljevstva i Sjedinjenih Američkih Država na engleski jezik.",
        guide4Label: "Odabir smjera prijevoda:",
        guide4Value: `Pritiskom na gumb <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;"><img src="images/hr_flag.png" alt="HR" class="flag-img"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg><img src="images/en_flag.png" alt="EN" class="flag-img"></span> odabire se prevođenje s hrvatskog na engleski jezik, a pritiskom na gumb <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;"><img src="images/en_flag.png" alt="EN" class="flag-img"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg><img src="images/hr_flag.png" alt="HR" class="flag-img"></span> prevođenje s engleskog na hrvatski jezik.`,
        guide5Label: "Unos pojma:",
        guide5Value: "Pojam se unosi u drugi redak. Unesite riječ ili dio riječi na jeziku s kojeg se prevodi.",
        guide6Label: "Brisanje unosa:",
        guide6Value: "Dodirom na gumb s ikonom kante za smeće briše se tekst unesen u polje za unos.",
        guide7Label: "Prevedi:",
        guide7Value: "Pretraga se pokreće pritiskom na gumb s povećalom ili pritiskom na tipku <em>Enter</em> na tipkovnici.",
        guide8Label: "Prikaz pretraga ili rezultata:",
        guide8Value: "Pritiskom na gumb \"Pretrage\" u donjem prikazu otvara se kartica s nedavnim pretragama. Pritiskom na gumb \"Prijevodi\" donji se prikaz postavlja tako da prikazuje rezultate pretrage.",
        guide9Label: "Nedavno pretraživano:",
        guide9Value: "U kartici \"Nedavno pretraživano\" prikazuje se najviše 50 posljednjih pretraga. Klikom na pojedinu pretragu prikazuju se rezultati za odabrani pojam.",
        guide10Label: "Razmještaj pretraga:",
        guide10Value: "Pretrage se na kartici mogu premještati tehnikom \"uhvati, povuci i pusti\" kako bi se promijenio redoslijed prikaza pojmova.",
        guide11Label: "Brisanje pretraga:",
        guide11Value: "Pretragu možete izbrisati iz kartice \"Nedavno pretraživano\" tako da pojam povučete izvan kartice. Sve pojmove možete izbrisati pritiskom na \"Obriši\" u gornjem desnom kutu kartice.",
        guide12Label: "Ispis rezultata:",
        guide12Value: "Rezultati se prikazuju u karticama, pri čemu se svaki pojam prikazuje u zasebnoj kartici. Najprije se prikazuju točna podudaranja, a zatim pojmovi koji sadrže uneseni tekst.",
        guide13Label: "Povratak na vrh:",
        guide13Value: "Kada se ne nalazite na vrhu stranice, s desne strane pojavljuje se gumb sa strelicom. Pritiskom na taj gumb vraćate se na vrh stranice.",

        footerRights: "© 2026 Spacedancer. Sva prava pridržana."
    },
    en: {
        appTitle: "English-Croatian Dictionary",
        appSubtitle: "Fast and easy search for words and phrases",
        tabAboutBtn: "About App",
        tabGuideBtn: "Instructions",

        aboutTitle: "About the App & Features",
        aboutDesc: "The application allows bidirectional word searching between English and Croatian. It is designed for fast everyday use with a simple and intuitive interface.",
        feat1Label: "Bidirectional dictionary:",
        feat1Value: `<span style="white-space: nowrap;">CRO${arrowSvg}ENG</span> / <span style="white-space: nowrap;">ENG${arrowSvg}CRO</span>`,
        feat2Label: "Search:",
        feat2Value: "By word or part of a word",
        feat3Label: "Result display:",
        feat3Value: "Exact and related terms",

        sourceTitle: "Data Source & Authorship",
        sourceDesc: "The dictionary database is based on an open dictionary project by author Goran Igaly. Data is used in accordance with the licensing terms of the original project.",
        githubBtnText: "Open Database GitHub Repository",

        appLicenseTitle: "Licensing & Application Source Code",
        appLicenseDesc: "This application is free software released under the GNU General Public License v3.0 (GPLv3). The application source code is available on GitHub.",
        appSourceBtnText: "Open Application GitHub Repository",

        otherAppsTitle: "More from this Developer",
        otherAppsDesc: "Check out the full collection of apps I've created and find something else useful for yourself.",
        otherAppsBtnText: "Visit my Google Play profile",

        techTitle: "Technical Specifications",
        tech1Label: "Offline operation:",
        tech1Value: "Fully functional offline",
        tech2Label: "Database:",
        tech2Value: "Local SQLite database",
        tech3Label: "Compatibility:",
        tech3Value: "Android 8.0 (Oreo) and newer",
        tech4Label: "Ads:",
        tech4Value: "Google AdMob (non-personalized)",
        tech5Label: "Interface language:",
        tech5Value: "Croatian / English",

        privacyTitle: "Privacy Protection",
        privacyDesc: "The application does not collect or store personal user data. Network connection is used exclusively for displaying ads via the AdMob service to keep the app free to use.",

        guideTitle: "Instructions for Use",
        guideIntro: "Overview of all application features and the meaning of each button.",
        guide1Label: "Bottom-left button (Info/Search):",
        guide1Value: "The bottom-left navigation button is used to switch between this page and the translation page. The button icon changes to display the page the user will switch to when tapping the button.",
        guide2Label: "Bottom-right button (Close):",
        guide2Value: "The bottom-right button of the application is used to exit the app. Before exiting, the application will ask for confirmation. Choose ✓ to confirm exit, or ✕ to stay in the app.",
        guide3Label: "Middle language buttons:",
        guide3Value: "The flag buttons at the bottom of the screen are used to select the app language. Tapping the button with the Croatian flag switches the app to Croatian, and tapping the button with the combined UK and US flag switches it to English.",
        guide4Label: "Selecting translation direction:",
        guide4Value: `Pressing the button <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;"><img src="images/hr_flag.png" alt="HR" class="flag-img"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg><img src="images/en_flag.png" alt="EN" class="flag-img"></span> selects translation from Croatian to English, and pressing the button <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;"><img src="images/en_flag.png" alt="EN" class="flag-img"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg><img src="images/hr_flag.png" alt="HR" class="flag-img"></span> selects translation from English to Croatian.`,
        guide5Label: "Term entry:",
        guide5Value: "The term is entered in the second row. Enter a word or part of a word in the source language.",
        guide6Label: "Clear entry:",
        guide6Value: "Tapping the trash can icon button clears the text entered in the input field.",
        guide7Label: "Translate:",
        guide7Value: "Search is triggered by pressing the magnifying glass button or pressing the <em>Enter</em> key on the keyboard.",
        guide8Label: "Display of searches or results:",
        guide8Value: "Pressing the \"Searches\" button in the bottom view opens the recent searches card. Pressing the \"Translations\" button sets the bottom view to display search results.",
        guide9Label: "Recent searches:",
        guide9Value: "The \"Recent searches\" card displays up to 50 latest searches. Clicking on an individual search displays results for the selected term.",
        guide10Label: "Reordering searches:",
        guide10Value: "Searches within the card can be moved using the \"drag and drop\" technique to change the display order of terms.",
        guide11Label: "Deleting searches:",
        guide11Value: "You can delete a search from the \"Recent searches\" card by dragging the term outside the card. All terms can be deleted by pressing \"Clear\" in the upper right corner of the card.",
        guide12Label: "Result output:",
        guide12Value: "Results are displayed in cards, with each term shown in a separate card. Exact matches are shown first, followed by terms containing the entered text.",
        guide13Label: "Back to top:",
        guide13Value: "When you are not at the top of the page, an arrow button appears on the right side. Pressing this button returns you to the top of the page.",

        footerRights: "© 2026 Spacedancer. All rights reserved."
    }
};

function applyLanguage(lang) {
    const data = translations[lang] || translations.hr;
    for (const key in data) {
        const el = document.getElementById(key);
        if (el) {
            el.innerHTML = data[key];
        }
    }
}

function switchTab(tabName) {
    activeTab = tabName === "guide" ? "guide" : "about";

    const tabAbout = document.getElementById("tabAbout");
    const tabGuide = document.getElementById("tabGuide");
    const tabAboutBtn = document.getElementById("tabAboutBtn");
    const tabGuideBtn = document.getElementById("tabGuideBtn");

    const isAbout = activeTab === "about";

    if (tabAbout) tabAbout.classList.toggle("active", isAbout);
    if (tabGuide) tabGuide.classList.toggle("active", !isAbout);
    if (tabAboutBtn) tabAboutBtn.classList.toggle("active", isAbout);
    if (tabGuideBtn) tabGuideBtn.classList.toggle("active", !isAbout);
}

function openGitHubRepo() {
    if (typeof AndroidInterface !== "undefined" && typeof AndroidInterface.openExternalUrl === "function") {
        AndroidInterface.openExternalUrl("https://github.com/gigaly/rjecnik-hrvatskih-jezika");
    }
}

function openAppSourceRepo() {
    if (typeof AndroidInterface !== "undefined" && typeof AndroidInterface.openExternalUrl === "function") {
        AndroidInterface.openExternalUrl("https://github.com/Spejsi/jand-croEngDualDict");
    }
}

function openGooglePlayDeveloper() {
    if (typeof AndroidInterface !== "undefined" && typeof AndroidInterface.openExternalUrl === "function") {
        AndroidInterface.openExternalUrl("https://play.google.com/store/apps/developer?id=Spacedancer");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        applyLanguage("hr");
        switchTab("about");
    });
} else {
    applyLanguage("hr");
    switchTab("about");
}