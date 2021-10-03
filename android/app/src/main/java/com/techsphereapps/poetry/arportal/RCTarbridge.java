package com.techsphereapps.poetry.arportal;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class RCTarbridge extends ReactContextBaseJavaModule {

    public ReactApplicationContext reactApplicationContext;

    @NonNull
    @Override
    public String getName() {
        return "ARportal";
    }


    public RCTarbridge(ReactApplicationContext context) {
        super(context);
        reactApplicationContext = context;
    }

    @ReactMethod
    public void openARportal() {
        Intent newIntent = new Intent(reactApplicationContext, ARportalActivity.class);
        newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactApplicationContext.startActivity(newIntent);
    }
}
