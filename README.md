# English ↔ Croatian Dual Dictionary

A complete bidirectional English-Croatian dictionary project with:

- **Web app** in `web/` using plain HTML, CSS, and JavaScript
- **Android app** in `android/` using Kotlin + Jetpack Compose
- **Shared dictionary data** in `data/dictionary.json`

## Project structure

```text
.
├── android/
│   ├── app/
│   │   └── src/main/
│   │       ├── assets/dictionary.json -> ../../../../../data/dictionary.json
│   │       ├── java/com/example/croengdualdict/MainActivity.kt
│   │       ├── AndroidManifest.xml
│   │       └── res/values/strings.xml
│   ├── build.gradle.kts
│   ├── gradle.properties
│   ├── gradle/wrapper/gradle-wrapper.jar
│   ├── gradle/wrapper/gradle-wrapper.properties
│   ├── gradlew
│   ├── gradlew.bat
│   └── settings.gradle.kts
├── data/
│   └── dictionary.json
├── web/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── LICENSE
└── README.md
```

## Features

### Web app
- Search **English → Croatian**
- Search **Croatian → English**
- **Auto-detect** direction or choose it manually
- Clean responsive UI
- Uses the shared dictionary JSON when served from the repository root
- Includes an inline fallback dataset so it still works if opened directly from disk in a browser

### Android app
- Kotlin + Jetpack Compose UI
- Search bar and mode toggle
- Automatic direction detection
- Loads the shared dictionary JSON through `assets/dictionary.json`
- Minimum SDK **24**, target SDK **34**

## Shared dictionary data

The shared dataset lives in:

- `data/dictionary.json`

It contains **152** common English/Croatian word pairs.

For Android, `android/app/src/main/assets/dictionary.json` is a symlink to the shared file so both apps use the same source data.

If your platform or tooling does not preserve symlinks, copy `data/dictionary.json` to
`android/app/src/main/assets/dictionary.json` manually.

## Running the web app

No build tool is required.

### Option 1: Open directly
Open `web/index.html` in a browser.

- The page will still work because `web/app.js` contains a fallback copy of the dataset.
- Browsers may block direct `fetch()` access to local JSON files, so this fallback avoids that issue.

### Option 2: Serve as static files (recommended)
Serve the repository root with any simple static file server, then open `web/index.html`.

This allows the web app to load the shared `data/dictionary.json` file directly.

## Running the Android app

1. Open the `android/` directory in **Android Studio**.
2. Let Android Studio sync the Gradle project.
3. Run the `app` configuration on an emulator or Android device.

### Android configuration
- **Namespace:** `com.example.croengdualdict`
- **Application ID:** `com.example.croengdualdict`
- **Min SDK:** 24
- **Target SDK:** 34
- **UI Toolkit:** Jetpack Compose

## Notes

- The web app is dependency-free and uses only browser APIs.
- The Android app is structured as a standard Gradle Android project.
- No builds or git commands were run while creating this repository content.
