package de.appplant.cordova.plugin.localnotification;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.content.res.Resources;
import android.view.View;
import android.widget.Toast;
import android.app.NotificationManager;

public class IgnoreActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		
		// dismiss the notification first
		Intent intent = this.getIntent();
        int noti_id = intent.getIntExtra(Receiver.NOTIFICATION_ID, 0);

        NotificationManager mgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		mgr.cancel(noti_id);

		Resources res = this.getResources();
		setContentView(res.getIdentifier("ignore_activity", "layout", this.getPackageName()));

    }

	public void setInterval(View view) {
		Toast.makeText(this, "Button ID: " + view.getId(), Toast.LENGTH_SHORT).show();
		finish();
	}

}