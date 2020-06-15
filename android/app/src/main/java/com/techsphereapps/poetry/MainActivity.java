package com.techsphereapps.poetry;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  public void onCreate(@Nullable Bundle savedInstanceState) {

    Splash.show(this);

    super.onCreate(savedInstanceState);


  }


  @Override
  protected String getMainComponentName() {
    return "poetry";
  }
}
