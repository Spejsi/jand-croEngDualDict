package com.spacedancer.engleskirjecnik.dialog;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.LocaleList;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

import com.spacedancer.engleskirjecnik.MainActivity;
import com.spacedancer.engleskirjecnik.R;

import java.util.Locale;

public class ExitConfirmationDialogFragment extends DialogFragment {

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        SharedPreferences prefs = requireContext().getSharedPreferences("DictionaryPrefs", Context.MODE_PRIVATE);
        String lang = prefs.getString("selected_language", "hr");

        Locale locale = Locale.forLanguageTag(lang);
        Configuration config = new Configuration(getResources().getConfiguration());
        config.setLocales(new LocaleList(locale));
        Context localizedContext = requireContext().createConfigurationContext(config);
        Resources localizedResources = localizedContext.getResources();

        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        View view = getLayoutInflater().inflate(R.layout.dialog_exit_confirmation, null);

        TextView tvExitRow1 = view.findViewById(R.id.tvExitRow1);
        TextView tvExitRow2 = view.findViewById(R.id.tvExitRow2);
        Button btnConfirm = view.findViewById(R.id.btnConfirmExit);
        Button btnCancel = view.findViewById(R.id.btnCancelExit);

        tvExitRow1.setText(localizedResources.getString(R.string.exit_confirmation_row_1));
        tvExitRow2.setText(localizedResources.getString(R.string.exit_confirmation_row_2));
        btnConfirm.setText(localizedResources.getString(R.string.exit_button_confirm));
        btnCancel.setText(localizedResources.getString(R.string.exit_button_cancel));

        btnConfirm.setOnClickListener(v -> {
            dismiss();
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).closeApp();
            }
        });

        btnCancel.setOnClickListener(v -> dismiss());

        builder.setView(view);
        AlertDialog dialog = builder.create();

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        return dialog;
    }

    @Override
    public void onStart() {
        super.onStart();
        Dialog dialog = getDialog();
        if (dialog != null && dialog.getWindow() != null) {
            DisplayMetrics metrics = getResources().getDisplayMetrics();
            int orientation = getResources().getConfiguration().orientation;
            int width = (orientation == Configuration.ORIENTATION_LANDSCAPE) ?
                    (int) (metrics.widthPixels * 0.40) : (int) (metrics.widthPixels * 0.75);
            dialog.getWindow().setLayout(width, ViewGroup.LayoutParams.WRAP_CONTENT);
        }
    }
}