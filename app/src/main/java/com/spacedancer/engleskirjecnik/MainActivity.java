package com.spacedancer.engleskirjecnik;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageButton;
import android.widget.ProgressBar;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.spacedancer.engleskirjecnik.dialog.ExitConfirmationDialogFragment;

import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    private static final String PREFS_NAME = "DictionaryPrefs";
    private static final String KEY_LANGUAGE = "selected_language";

    private AdView adView;
    private WebView webView;
    private ProgressBar progressBar;
    private DatabaseHelper dbHelper;

    private ImageButton btnBottomLeft;
    private ImageButton btnBottomRight;
    private ImageButton btnFlagHr;
    private ImageButton btnFlagEn;

    private boolean isInfoPageActive = true;
    private String currentLanguage = "hr";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        currentLanguage = prefs.getString(KEY_LANGUAGE, "hr");

        MobileAds.initialize(this, initializationStatus -> {
        });

        adView = findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (!isInfoPageActive) {
                    loadInfoPage();
                } else {
                    showExitDialog();
                }
            }
        });

        progressBar = findViewById(R.id.progressBar);
        webView = findViewById(R.id.webView);
        btnBottomLeft = findViewById(R.id.btnBottomLeft);
        btnBottomRight = findViewById(R.id.btnBottomRight);
        btnFlagHr = findViewById(R.id.btnFlagHr);
        btnFlagEn = findViewById(R.id.btnFlagEn);

        dbHelper = new DatabaseHelper(this);

        loadFlagImages();
        setupNavigationButtons();
        updateFlagButtonsUI();

        new Thread(() -> {
            try {
                dbHelper.checkAndCopyDatabase();
            } catch (IOException e) {
                Log.e(TAG, "Error checking and copying database", e);
            }

            runOnUiThread(() -> setupWebView(savedInstanceState));
        }).start();
    }

    private void loadFlagImages() {
        try (InputStream isHr = getAssets().open("html/images/hr_flag.png")) {
            Bitmap bitmapHr = BitmapFactory.decodeStream(isHr);
            btnFlagHr.setImageBitmap(bitmapHr);
        } catch (IOException e) {
            Log.e(TAG, "Error loading Croatian flag image", e);
        }

        try (InputStream isEn = getAssets().open("html/images/en_flag.png")) {
            Bitmap bitmapEn = BitmapFactory.decodeStream(isEn);
            btnFlagEn.setImageBitmap(bitmapEn);
        } catch (IOException e) {
            Log.e(TAG, "Error loading English flag image", e);
        }
    }

    private void setupNavigationButtons() {
        btnBottomLeft.setOnClickListener(v -> {
            if (isInfoPageActive) {
                loadSearchPage();
            } else {
                loadInfoPage();
            }
        });

        btnBottomRight.setOnClickListener(v -> showExitDialog());

        btnFlagHr.setOnClickListener(v -> setLanguage("hr"));
        btnFlagEn.setOnClickListener(v -> setLanguage("en"));
    }

    private void setLanguage(String lang) {
        currentLanguage = lang;
        getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
                .edit()
                .putString(KEY_LANGUAGE, lang)
                .apply();

        updateFlagButtonsUI();
        notifyWebViewLanguage();
    }

    private void updateFlagButtonsUI() {
        if ("en".equals(currentLanguage)) {
            btnFlagHr.setAlpha(0.3f);
            btnFlagHr.setScaleX(0.95f);
            btnFlagHr.setScaleY(0.95f);

            btnFlagEn.setAlpha(1.0f);
            btnFlagEn.setScaleX(1.05f);
            btnFlagEn.setScaleY(1.05f);
        } else {
            btnFlagHr.setAlpha(1.0f);
            btnFlagHr.setScaleX(1.05f);
            btnFlagHr.setScaleY(1.05f);

            btnFlagEn.setAlpha(0.3f);
            btnFlagEn.setScaleX(0.95f);
            btnFlagEn.setScaleY(0.95f);
        }
    }

    private void notifyWebViewLanguage() {
        String jsCall = "if (typeof applyLanguage === 'function') { applyLanguage('" + currentLanguage + "'); }";
        webView.evaluateJavascript(jsCall, null);
    }

    private void updateButtonIcons() {
        if (isInfoPageActive) {
            btnBottomLeft.setImageResource(R.drawable.nav_btn_search);
        } else {
            btnBottomLeft.setImageResource(R.drawable.nav_btn_info);
        }
        btnBottomRight.setImageResource(R.drawable.nav_btn_close);
    }

    private void loadSearchPage() {
        isInfoPageActive = false;
        updateButtonIcons();
        webView.loadUrl("file:///android_asset/html/translate.html");
    }

    private void loadInfoPage() {
        isInfoPageActive = true;
        updateButtonIcons();
        webView.loadUrl("file:///android_asset/html/info.html");
    }

    private void showExitDialog() {
        ExitConfirmationDialogFragment dialog = new ExitConfirmationDialogFragment();
        dialog.show(getSupportFragmentManager(), "ExitConfirmationDialog");
    }

    public void closeApp() {
        finish();
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView(Bundle savedInstanceState) {
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(true);

        webView.addJavascriptInterface(new WebAppInterface(), "AndroidInterface");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
                webView.setVisibility(View.VISIBLE);
                notifyWebViewLanguage();
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
            isInfoPageActive = savedInstanceState.getBoolean("isInfoPageActive", true);
            updateButtonIcons();
            progressBar.setVisibility(View.GONE);
            webView.setVisibility(View.VISIBLE);
        } else {
            loadInfoPage();
        }
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean("isInfoPageActive", isInfoPageActive);
        webView.saveState(outState);
    }

    public class WebAppInterface {

        @JavascriptInterface
        public void translateEnToCro(String searchTerm) {
            String jsonResult = dbHelper.searchDictionary("Enhr", "en", "hr", searchTerm);
            sendResultToJS(jsonResult);
        }

        @JavascriptInterface
        public void translateCroToEn(String searchTerm) {
            String jsonResult = dbHelper.searchDictionary("Hren", "hr", "en", searchTerm);
            sendResultToJS(jsonResult);
        }

        @JavascriptInterface
        public void openExternalUrl(String url) {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
            } catch (Exception e) {
                Log.e(TAG, "Error opening external URL: " + url, e);
            }
        }

        private void sendResultToJS(String jsonResult) {
            runOnUiThread(() -> {
                String safeJson = jsonResult.replace("\\", "\\\\")
                        .replace("'", "\\'")
                        .replace("\r", "")
                        .replace("\n", "\\n");
                String jsCall = "setupResults('" + safeJson + "');";
                webView.evaluateJavascript(jsCall, null);
            });
        }
    }

    @Override
    protected void onPause() {
        if (adView != null) adView.pause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (adView != null) adView.resume();
    }
}