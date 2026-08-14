package com.example.croengdualdict

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.json.JSONArray
import java.text.Normalizer

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    DictionaryApp()
                }
            }
        }
    }
}

data class DictionaryEntry(val en: String, val hr: String)

enum class SearchMode(val label: String) {
    AUTO("Auto"),
    EN_TO_HR("English → Croatian"),
    HR_TO_EN("Croatian → English")
}

@OptIn(ExperimentalLayoutApi::class, ExperimentalMaterial3Api::class)
@Composable
fun DictionaryApp() {
    val context = LocalContext.current
    var dictionary by remember { mutableStateOf(emptyList<DictionaryEntry>()) }
    LaunchedEffect(Unit) {
        dictionary = withContext(Dispatchers.IO) { loadDictionary(context) }
    }
    var query by rememberSaveable { mutableStateOf("") }
    var mode by rememberSaveable { mutableStateOf(SearchMode.AUTO.name) }
    val selectedMode = SearchMode.valueOf(mode)

    val activeDirection = remember(query, selectedMode, dictionary) {
        when (selectedMode) {
            SearchMode.AUTO -> inferDirection(query, dictionary)
            SearchMode.EN_TO_HR -> SearchMode.EN_TO_HR
            SearchMode.HR_TO_EN -> SearchMode.HR_TO_EN
        }
    }

    val results = remember(query, activeDirection, dictionary) {
        searchEntries(query, activeDirection, dictionary)
    }

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("English ↔ Croatian Dictionary") })
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(vertical = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        text = "Search English or Croatian vocabulary with automatic direction detection.",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true,
                        label = { Text("Search") },
                        placeholder = { Text("Try hello or voda") }
                    )

                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        SearchMode.entries.forEach { option ->
                            FilterChip(
                                selected = selectedMode == option,
                                onClick = { mode = option.name },
                                label = { Text(option.label) }
                            )
                        }
                    }

                    Text(
                        text = buildSummary(query, selectedMode, activeDirection, results.size),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            if (results.isEmpty()) {
                item {
                    Card(
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.surfaceVariant
                        )
                    ) {
                        Text(
                            text = "No matches found. Try a different spelling or switch the direction.",
                            modifier = Modifier.padding(16.dp),
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                }
            } else {
                items(results, key = { "${it.en}-${it.hr}" }) { entry ->
                    EntryCard(entry = entry, direction = activeDirection)
                }
            }
        }
    }
}

@Composable
fun EntryCard(entry: DictionaryEntry, direction: SearchMode) {
    val source = if (direction == SearchMode.HR_TO_EN) entry.hr else entry.en
    val target = if (direction == SearchMode.HR_TO_EN) entry.en else entry.hr

    Card {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = source,
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = target,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                MetaChip("EN: ${entry.en}")
                MetaChip("HR: ${entry.hr}")
            }
        }
    }
}

@Composable
fun MetaChip(label: String) {
    Surface(
        color = MaterialTheme.colorScheme.secondaryContainer,
        shape = MaterialTheme.shapes.large
    ) {
        Text(
            text = label,
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.onSecondaryContainer
        )
    }
}

fun buildSummary(
    query: String,
    selectedMode: SearchMode,
    activeDirection: SearchMode,
    resultCount: Int
): String {
    val directionLabel = activeDirection.label
    return if (query.isBlank()) {
        "Showing starter entries in $directionLabel mode. Results: $resultCount"
    } else {
        val modeLabel = if (selectedMode == SearchMode.AUTO) {
            "$directionLabel (auto-detected)"
        } else {
            directionLabel
        }
        "Showing matches for \"$query\" in $modeLabel. Results: $resultCount"
    }
}

fun loadDictionary(context: Context): List<DictionaryEntry> {
    val json = context.assets.open("dictionary.json").bufferedReader().use { it.readText() }
    val array = JSONArray(json)
    return List(array.length()) { index ->
        val item = array.getJSONObject(index)
        DictionaryEntry(
            en = item.getString("en"),
            hr = item.getString("hr")
        )
    }.sortedBy { normalizeText(it.en) }
}

fun inferDirection(query: String, dictionary: List<DictionaryEntry>): SearchMode {
    val trimmed = query.trim()
    if (trimmed.isEmpty()) return SearchMode.EN_TO_HR

    val normalizedQuery = normalizeText(trimmed)
    val looksCroatian = Regex("[čćđšž]", RegexOption.IGNORE_CASE).containsMatchIn(trimmed)
    val enMatches = dictionary.count { normalizeText(it.en).contains(normalizedQuery) }
    val hrMatches = dictionary.count { normalizeText(it.hr).contains(normalizedQuery) }

    return when {
        enMatches == 0 && hrMatches == 0 -> if (looksCroatian) SearchMode.HR_TO_EN else SearchMode.EN_TO_HR
        hrMatches > enMatches -> SearchMode.HR_TO_EN
        enMatches > hrMatches -> SearchMode.EN_TO_HR
        looksCroatian -> SearchMode.HR_TO_EN
        else -> SearchMode.EN_TO_HR
    }
}

fun searchEntries(
    query: String,
    direction: SearchMode,
    dictionary: List<DictionaryEntry>
): List<DictionaryEntry> {
    val sourceSelector: (DictionaryEntry) -> String =
        if (direction == SearchMode.HR_TO_EN) {
            { it.hr }
        } else {
            { it.en }
        }

    val normalizedQuery = normalizeText(query.trim())

    return dictionary
        .map { entry -> entry to matchScore(sourceSelector(entry), normalizedQuery) }
        .filter { normalizedQuery.isEmpty() || it.second != Int.MAX_VALUE }
        .sortedWith(
            compareBy<Pair<DictionaryEntry, Int>> { it.second }
                .thenBy { normalizeText(sourceSelector(it.first)) }
        )
        .map { it.first }
        .take(if (normalizedQuery.isEmpty()) 18 else 50)
}

fun matchScore(text: String, normalizedQuery: String): Int {
    val source = normalizeText(text)
    if (normalizedQuery.isEmpty()) return 4

    return when {
        source == normalizedQuery -> 0
        source.startsWith(normalizedQuery) -> 1
        source.contains(" $normalizedQuery") || source.contains("-$normalizedQuery") -> 2
        source.contains(normalizedQuery) -> 3
        else -> Int.MAX_VALUE
    }
}

fun normalizeText(text: String): String {
    val lowered = text.lowercase().replace("đ", "dj")
    return Normalizer.normalize(lowered, Normalizer.Form.NFD)
        .replace(Regex("\\p{Mn}+"), "")
}
