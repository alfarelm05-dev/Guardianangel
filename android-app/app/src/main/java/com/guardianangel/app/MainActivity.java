package com.guardianangel.app;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class MainActivity extends AppCompatActivity {
    static final String URL = "https://guardian-angel-mvp-03-supabase-conn.vercel.app/";
    static final String CHANNEL_ID = "guardian_messages";
    WebView webView;

    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createChannel();
        showWarmSplash();
    }

    private void showWarmSplash() {
        LinearLayout splash = new LinearLayout(this);
        splash.setOrientation(LinearLayout.VERTICAL);
        splash.setGravity(Gravity.CENTER);
        splash.setPadding(32, 32, 32, 32);
        splash.setBackgroundColor(Color.rgb(251, 248, 239));

        ImageView logo = new ImageView(this);
        logo.setImageResource(com.guardianangel.app.R.drawable.ic_guardian_angel);
        logo.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        LinearLayout.LayoutParams logoParams = new LinearLayout.LayoutParams(156, 156);
        splash.addView(logo, logoParams);

        TextView title = new TextView(this);
        title.setText("Guardian Angel");
        title.setTextColor(Color.rgb(164, 113, 22));
        title.setTextSize(28);
        title.setGravity(Gravity.CENTER);
        title.setTypeface(null, android.graphics.Typeface.BOLD);
        LinearLayout.LayoutParams titleParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        titleParams.topMargin = 18;
        splash.addView(title, titleParams);

        TextView subtitle = new TextView(this);
        subtitle.setText("Saling menguatkan • Bertumbuh bersama");
        subtitle.setTextColor(Color.rgb(154, 113, 39));
        subtitle.setTextSize(11);
        subtitle.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subtitleParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        subtitleParams.topMargin = 7;
        splash.addView(subtitle, subtitleParams);

        TextView verse = new TextView(this);
        verse.setText("“Jadilah tempat seseorang merasa sedikit lebih kuat setelah bertemu denganmu.”");
        verse.setTextColor(Color.rgb(91, 105, 97));
        verse.setTextSize(12);
        verse.setGravity(Gravity.CENTER);
        verse.setMaxWidth(500);
        LinearLayout.LayoutParams verseParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        verseParams.topMargin = 36;
        splash.addView(verse, verseParams);

        setContentView(splash);
        new Handler(Looper.getMainLooper()).postDelayed(this::showWebApp, 950);
    }

    private void showWebApp() {
        webView = new WebView(this);
        setContentView(webView);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new BadgeBridge(this), "GuardianAngelAndroid");
        webView.loadUrl(URL);
        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, 1001);
        }
    }

    void createChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel c = new NotificationChannel(CHANNEL_ID, "Pesan Guardian Angel", NotificationManager.IMPORTANCE_HIGH);
            c.setDescription("Pemberitahuan pesan baru Guardian Angel");
            getSystemService(NotificationManager.class).createNotificationChannel(c);
        }
    }

    public void setMessageBadge(int count) {
        NotificationManagerCompat nm = NotificationManagerCompat.from(this);
        if (count <= 0) {
            nm.cancel(71001);
            return;
        }
        NotificationCompat.Builder b = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(com.guardianangel.app.R.drawable.ic_guardian_angel)
            .setContentTitle("Guardian Angel")
            .setContentText(count == 1 ? "Ada 1 pesan yang belum dibaca" : "Ada " + count + " pesan yang belum dibaca")
            .setNumber(count)
            .setBadgeIconType(NotificationCompat.BADGE_ICON_SMALL)
            .setAutoCancel(false)
            .setOngoing(true)
            .setOnlyAlertOnce(true);
        nm.notify(71001, b.build());
    }

    public static class BadgeBridge {
        private final MainActivity activity;
        BadgeBridge(MainActivity a) { activity = a; }
        @JavascriptInterface public void setUnreadMessages(int count) {
            activity.runOnUiThread(() -> activity.setMessageBadge(count));
        }
    }

    @Override public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
