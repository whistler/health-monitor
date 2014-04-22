package de.appplant.cordova.plugin.localnotification;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.content.res.Resources;
import android.view.View;
import android.widget.Toast;
import android.app.NotificationManager;
/*import com.firebase.client.*;
import com.firebase.simplelogin.*;*/

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
		//final Context context = this;
		// login to the firebase
		/*Firebase ref = new Firebase("https://fiery-fire-1643.firebaseio.com/users/1");
		SimpleLogin authClient = new SimpleLogin(ref, this);
		authClient.loginWithEmail("health-monitor@googlegroups.com", "teamlifely", new SimpleLoginAuthenticatedHandler() {
			@Override
			public void authenticated(
					com.firebase.simplelogin.enums.Error error, User user) {
				if(error != null) {
				  // There was an error logging into this account
				  Toast.makeText(context, "Error happened!", Toast.LENGTH_SHORT).show();
				}
				else {
				  // We are now logged in
				  Toast.makeText(context, "Login Successfully!", Toast.LENGTH_SHORT).show();
				}
				
			}
		});*/
		String str = "Ignored for ";
		Resources res = this.getResources();
		int id_oneDay = res.getIdentifier("ignore_oneDay", "id", this.getPackageName());
		int id_threeDays = res.getIdentifier("ignore_threeDays", "id", this.getPackageName());
		int id_oneWeek = res.getIdentifier("ignore_oneWeek", "id", this.getPackageName());
		int id_twoWeeks = res.getIdentifier("ignore_twoWeeks", "id", this.getPackageName());
		int id_oneMonth = res.getIdentifier("ignore_oneMonth", "id", this.getPackageName());

		int btn_id = view.getId();

		if (btn_id == id_oneDay) {
			str += "one day";
		} else if (btn_id == id_threeDays) {
			str += "three days";
		} else if (btn_id == id_oneWeek) {
			str += "one week";
		} else if (btn_id == id_twoWeeks) {
			str += "two weeks";
		} else if (btn_id == id_oneMonth) {
			str += "one month";
		} else {
			str = "Ignored forever";
		}

		Toast.makeText(this, str, Toast.LENGTH_SHORT).show();
		finish();
	}

}