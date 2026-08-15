let currentSearchInput = "";
let lastSearchDirection = "cro_en"; // Pamti smjer pretraživanja
let currentLang = "hr";
let lastResultsData = null;

const searchTranslations = {
    hr: {
        viewTranslation: "Prijevod",
        viewSearches: "Pretrage",
        placeholder: "Unesite riječ ili dio riječi",
        translateBtn: "Prevedi",
        noResults: "Nema pronađenih rezultata.",
        errorResults: "Pogreška pri dohvaćanju podataka.",
        historyTitle: "Nedavno pretraživano",
        clearHistory: "Obriši",
        emptyInstruction: "Unesite riječ iznad za pretraživanje rječnika.",
        translationFor: "Prijevod za",
        dirCroEn: "HRV &raquo;&nbsp;ENG",
        dirEnHr: "ENG &raquo;&nbsp;HRV"
    },
    en: {
        viewTranslation: "Translation",
        viewSearches: "Searches",
        placeholder: "Enter a word or part of a word",
        translateBtn: "Translate",
        noResults: "No results found.",
        errorResults: "Error retrieving data.",
        historyTitle: "Recent Searches",
        clearHistory: "Clear",
        emptyInstruction: "Enter a word above to search the dictionary.",
        translationFor: "Translation for",
        dirCroEn: "CRO &raquo;&nbsp;ENG",
        dirEnHr: "ENG &raquo;&nbsp;CRO"
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

function initApp() {
    if (typeof AndroidInterface !== "undefined" && AndroidInterface.getCurrentLanguage) {
        currentLang = AndroidInterface.getCurrentLanguage();
    }
    applyLanguage(currentLang);
    setupClearInputButton();
}

// Praćenje pozicije skrola prozora za prikaz/skrivanje plutajućeg gumba
window.addEventListener("scroll", function() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Prikazuje gumb ako je stranica skrolana više od 30px
        if (currentScroll > 30) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function applyLanguage(lang) {
    currentLang = lang || "hr";
    const t = searchTranslations[currentLang] || searchTranslations["hr"];

    const labelViewTranslation = document.getElementById("labelViewTranslation");
    if (labelViewTranslation) labelViewTranslation.textContent = t.viewTranslation;

    const labelViewHistory = document.getElementById("labelViewHistory");
    if (labelViewHistory) labelViewHistory.textContent = t.viewSearches;

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.placeholder = t.placeholder;

    const translateBtn = document.getElementById("translateBtn");
    if (translateBtn) {
        translateBtn.setAttribute("aria-label", t.translateBtn);
        translateBtn.setAttribute("title", t.translateBtn);
    }

    const clearInputBtn = document.getElementById("clearInputBtn");
    if (clearInputBtn) {
        clearInputBtn.setAttribute("aria-label", "Očisti unos");
        clearInputBtn.setAttribute("title", "Očisti unos");
    }

    renderView();
}

function getHistoryKey() {
    const direction = document.querySelector('input[name="direction"]:checked')?.value || "cro_en";
    return `search_history_${direction}`;
}

function getViewMode() {
    return document.querySelector('input[name="view_mode"]:checked')?.value || "history";
}

function setViewMode(mode) {
    const radio = document.querySelector(`input[name="view_mode"][value="${mode}"]`);
    if (radio) {
        radio.checked = true;
    }
}

function onDirectionChange() {
    renderView();
}

function onViewModeChange() {
    renderView();
}

function saveToHistory(word) {
    if (!word) return;
    const key = getHistoryKey();
    let history = JSON.parse(localStorage.getItem(key) || "[]");

    history = history.filter(item => item.toLowerCase() !== word.toLowerCase());
    history.unshift(word);

    if (history.length > 50) history.pop();

    localStorage.setItem(key, JSON.stringify(history));
}

function clearHistory() {
    const key = getHistoryKey();
    localStorage.removeItem(key);
    renderView();
}

function searchFromHistory(word) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = word;
        currentSearchInput = word;
        lastSearchDirection = document.querySelector('input[name="direction"]:checked')?.value || "cro_en";
        setViewMode("translation");

        if (typeof AndroidInterface !== "undefined") {
            if (lastSearchDirection === "cro_en") {
                AndroidInterface.translateCroToEn(word);
            } else {
                AndroidInterface.translateEnToCro(word);
            }
        }
    }
}

function removeFromHistory(wordToRemove) {
    const key = getHistoryKey();
    let history = JSON.parse(localStorage.getItem(key) || "[]");
    history = history.filter(item => item.toLowerCase() !== wordToRemove.toLowerCase());
    localStorage.setItem(key, JSON.stringify(history));
    renderView();
}

function reorderHistory(draggedWord, targetWord) {
    const key = getHistoryKey();
    let history = JSON.parse(localStorage.getItem(key) || "[]");

    const draggedIdx = history.findIndex(item => item.toLowerCase() === draggedWord.toLowerCase());
    const targetIdx = history.findIndex(item => item.toLowerCase() === targetWord.toLowerCase());

    if (draggedIdx !== -1 && targetIdx !== -1) {
        history.splice(draggedIdx, 1);
        history.splice(targetIdx, 0, draggedWord);
        localStorage.setItem(key, JSON.stringify(history));
    }
    renderView();
}

function renderView() {
    const mode = getViewMode();
    if (mode === "history") {
        renderHistoryView();
    } else {
        renderTranslationView();
    }
}

function renderHistoryView() {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    const key = getHistoryKey();
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const t = searchTranslations[currentLang] || searchTranslations["hr"];

    if (history.length > 0) {
        const historyCard = document.createElement("div");
        historyCard.className = "history-container";

        const header = document.createElement("div");
        header.className = "history-header";

        const title = document.createElement("span");
        title.className = "history-title";
        title.textContent = t.historyTitle;

        const clearBtn = document.createElement("button");
        clearBtn.className = "clear-history-btn";
        clearBtn.textContent = t.clearHistory;
        clearBtn.onclick = clearHistory;

        header.appendChild(title);
        header.appendChild(clearBtn);

        const list = document.createElement("div");
        list.className = "history-list";

        history.forEach(word => {
            const chip = document.createElement("button");
            chip.className = "history-chip";
            chip.textContent = word;

            let isDragging = false;
            let startX = 0, startY = 0;

            chip.addEventListener("pointerdown", (e) => {
                if (e.button !== 0 && e.pointerType === "mouse") return;
                startX = e.clientX;
                startY = e.clientY;
                isDragging = false;
                chip.setPointerCapture(e.pointerId);
            });

            chip.addEventListener("pointermove", (e) => {
                if (!e.isPrimary) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (!isDragging && distance > 10) {
                    isDragging = true;
                    chip.classList.add("dragging");
                }

                if (isDragging) {
                    e.preventDefault();
                    chip.style.transform = `translate(${dx}px, ${dy}px)`;

                    const containerRect = historyCard.getBoundingClientRect();
                    if (e.clientX < containerRect.left || e.clientX > containerRect.right ||
                        e.clientY < containerRect.top || e.clientY > containerRect.bottom) {
                        historyCard.classList.add("drop-outside-warning");
                    } else {
                        historyCard.classList.remove("drop-outside-warning");
                    }
                }
            });

            chip.addEventListener("pointerup", (e) => {
                try {
                    chip.releasePointerCapture(e.pointerId);
                } catch (err) {}

                historyCard.classList.remove("drop-outside-warning");

                if (!isDragging) {
                    searchFromHistory(word);
                    return;
                }

                isDragging = false;
                chip.classList.remove("dragging");
                chip.style.transform = "";

                const containerRect = historyCard.getBoundingClientRect();

                if (e.clientX < containerRect.left || e.clientX > containerRect.right ||
                    e.clientY < containerRect.top || e.clientY > containerRect.bottom) {
                    removeFromHistory(word);
                } else {
                    const chips = Array.from(list.querySelectorAll(".history-chip"));
                    let targetWord = null;

                    chips.forEach(c => {
                        if (c === chip) return;
                        const rect = c.getBoundingClientRect();
                        if (e.clientX >= rect.left && e.clientX <= rect.right &&
                            e.clientY >= rect.top && e.clientY <= rect.bottom) {
                            targetWord = c.textContent;
                        }
                    });

                    if (targetWord && targetWord !== word) {
                        reorderHistory(word, targetWord);
                    } else {
                        renderView();
                    }
                }
            });

            list.appendChild(chip);
        });

        historyCard.appendChild(header);
        historyCard.appendChild(list);
        container.appendChild(historyCard);
    } else {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <div class="empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <p>${t.emptyInstruction}</p>
        `;
        container.appendChild(emptyState);
    }
}

function renderTranslationView() {
    if (lastResultsData) {
        displayResultsData(lastResultsData);
    } else {
        const container = document.getElementById("resultsContainer");
        container.innerHTML = "";
        const t = searchTranslations[currentLang] || searchTranslations["hr"];
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <div class="empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <p>${t.emptyInstruction}</p>
        `;
        container.appendChild(emptyState);
    }
}

function onTranslateClick() {
    const input = document.getElementById("searchInput").value.trim();
    if (!input) {
        currentSearchInput = "";
        lastResultsData = null;
        setViewMode("history");
        renderView();
        return;
    }

    currentSearchInput = input;
    lastSearchDirection = document.querySelector('input[name="direction"]:checked')?.value || "cro_en";
    saveToHistory(input);
    setViewMode("translation");

    if (typeof AndroidInterface !== "undefined") {
        if (lastSearchDirection === "cro_en") {
            AndroidInterface.translateCroToEn(input);
        } else {
            AndroidInterface.translateEnToCro(input);
        }
    }
}

function setupClearInputButton() {
    const clearInputBtn = document.getElementById("clearInputBtn");
    if (clearInputBtn) {
        clearInputBtn.addEventListener("click", function() {
            const searchInput = document.getElementById("searchInput");
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }
            currentSearchInput = "";
            lastResultsData = null;
            setViewMode("history");
            renderView();
        });
    }
}

const searchInputElem = document.getElementById("searchInput");
if (searchInputElem) {
    searchInputElem.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            onTranslateClick();
        }
    });
}

function setupResults(data) {
    lastResultsData = data;
    setViewMode("translation");
    displayResultsData(data);
}

function displayResultsData(data) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    const t = searchTranslations[currentLang] || searchTranslations["hr"];

    let results = data;
    if (typeof data === "string") {
        try {
            results = JSON.parse(data);
        } catch (e) {
            console.error("Greška pri parsiranju JSON-a:", e);
            container.innerHTML = `<div class="no-results">${t.errorResults}</div>`;
            return;
        }
    }

    if (!results || results.length === 0) {
        container.innerHTML = `<div class="no-results">${t.noResults}</div>`;
        return;
    }

    if (currentSearchInput) {
        const infoHeader = document.createElement("div");
        infoHeader.className = "translation-info-header";
        const dirLabel = (lastSearchDirection === "en_cro") ? t.dirEnHr : t.dirCroEn;
        infoHeader.innerHTML = `${t.translationFor}: <strong>${escapeHtml(currentSearchInput)}</strong> <span class="translation-info-dir">(${dirLabel})</span>`;
        container.appendChild(infoHeader);
    }

    const searchLower = currentSearchInput.toLowerCase();

    const exactMatches = [];
    const otherMatches = [];

    results.forEach(item => {
        if (item.word && item.word.toLowerCase() === searchLower) {
            exactMatches.push(item);
        } else {
            otherMatches.push(item);
        }
    });

    otherMatches.sort((a, b) => a.word.localeCompare(b.word, 'hr', { sensitivity: 'base' }));

    exactMatches.forEach(item => {
        container.appendChild(createCardElement(item));
    });

    if (exactMatches.length > 0 && otherMatches.length > 0) {
        const hr = document.createElement("hr");
        hr.className = "results-divider";
        container.appendChild(hr);
    }

    otherMatches.forEach(item => {
        container.appendChild(createCardElement(item));
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function createCardElement(item) {
    const card = document.createElement("div");
    card.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";
    header.textContent = item.word || "";

    const body = document.createElement("div");
    body.className = "card-body";

    const list = document.createElement("ul");
    list.className = "translation-list";

    if (item.translations && Array.isArray(item.translations)) {
        item.translations.forEach(trans => {
            const itemElement = document.createElement("li");
            itemElement.className = "translation-item";
            itemElement.textContent = trans;
            list.appendChild(itemElement);
        });
    }

    body.appendChild(list);
    card.appendChild(header);
    card.appendChild(body);

    return card;
}