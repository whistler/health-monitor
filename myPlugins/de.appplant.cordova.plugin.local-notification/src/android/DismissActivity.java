package de.appplant.cordova.plugin.localnotification;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.app.NotificationManager;

public class DismissActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = this.getIntent();
        int noti_id = intent.getIntExtra(Receiver.NOTIFICATION_ID, 0);

        NotificationManager mgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		mgr.cancel(noti_id);
		finish();
    }

}