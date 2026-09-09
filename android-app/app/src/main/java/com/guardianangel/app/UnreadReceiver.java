package com.guardianangel.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class UnreadReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        // Reserved for future push/background synchronization.
        // Message counts are currently supplied securely by the signed-in web session.
    }
}
