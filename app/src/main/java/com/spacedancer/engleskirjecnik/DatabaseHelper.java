package com.spacedancer.engleskirjecnik;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String TAG = "DatabaseHelper";
    private static final String DB_NAME = "eh_dict.db";
    private static final int DB_VERSION = 1;
    private final Context context;
    private final File dbPath;

    public DatabaseHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
        this.context = context;
        this.dbPath = context.getDatabasePath(DB_NAME);
    }

    public void checkAndCopyDatabase() throws IOException {
        if (!dbPath.exists()) {
            this.getReadableDatabase();
            this.close();
            copyDatabaseFromAssets();
        }
    }

    private void copyDatabaseFromAssets() throws IOException {
        File parentDir = dbPath.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            if (!parentDir.mkdirs() && !parentDir.exists()) {
                throw new IOException("Failed to create directory for database.");
            }
        }

        try (InputStream input = context.getAssets().open("data/" + DB_NAME);
             OutputStream output = new FileOutputStream(dbPath)) {

            byte[] buffer = new byte[8192];
            int length;
            while ((length = input.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
            output.flush();
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    }

    public String searchDictionary(String tableName, String sourceCol, String targetCol, String input) {
        if (input == null || input.trim().isEmpty()) {
            return "[]";
        }

        String[] parts = input.split(",");
        List<String> terms = new ArrayList<>();
        for (String p : parts) {
            String trimmed = p.trim();
            if (!trimmed.isEmpty()) {
                terms.add(trimmed);
            }
        }

        if (terms.isEmpty()) {
            return "[]";
        }

        StringBuilder selection = new StringBuilder();
        List<String> selectionArgs = new ArrayList<>();

        for (int i = 0; i < terms.size(); i++) {
            if (i > 0) selection.append(" AND ");
            selection.append(sourceCol).append(" LIKE ?");
            selectionArgs.add("%" + terms.get(i) + "%");
        }

        SQLiteDatabase db = this.getReadableDatabase();
        Map<String, List<String>> resultMap = new LinkedHashMap<>();

        try (Cursor cursor = db.query(
                tableName,
                new String[]{sourceCol, targetCol},
                selection.toString(),
                selectionArgs.toArray(new String[0]),
                null, null,
                sourceCol + " ASC",
                "100")) {

            while (cursor.moveToNext()) {
                String word = cursor.getString(0);
                String translation = cursor.getString(1);

                // Korištenje computeIfAbsent rješava potencijalni NullPointerException warning
                List<String> transList = resultMap.computeIfAbsent(word, k -> new ArrayList<>());
                transList.add(translation);
            }
        }

        JSONArray jsonArray = new JSONArray();
        try {
            for (Map.Entry<String, List<String>> entry : resultMap.entrySet()) {
                JSONObject item = new JSONObject();
                item.put("word", entry.getKey());

                JSONArray transArray = new JSONArray();
                for (String t : entry.getValue()) {
                    transArray.put(t);
                }
                item.put("translations", transArray);
                jsonArray.put(item);
            }
        } catch (Exception e) {
            // Zamijenjeno s robustnijim Android logiranjem umjesto e.printStackTrace()
            Log.e(TAG, "Error building JSON response in searchDictionary", e);
        }

        return jsonArray.toString();
    }
}