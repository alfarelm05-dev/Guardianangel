package com.guardianangel.app;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
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
    static final String URL = "https://guardian-angel-mvp-03-supabase-connected-online-v5-7jwdx8wjv.vercel.app/";
    static final String CHANNEL_ID = "guardian_messages";
    WebView webView;

    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createChannel();
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
