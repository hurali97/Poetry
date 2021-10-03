package com.techsphereapps.poetry.arportal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.techsphereapps.poetry.R;
import com.viro.core.ARScene;
import com.viro.core.AmbientLight;
import com.viro.core.Object3D;
import com.viro.core.OmniLight;
import com.viro.core.Portal;
import com.viro.core.PortalScene;
import com.viro.core.RendererConfiguration;
import com.viro.core.Texture;
import com.viro.core.Vector;
import com.viro.core.ViroView;
import com.viro.core.ViroViewARCore;

import java.io.IOException;
import java.io.InputStream;

public class ARportalActivity extends AppCompatActivity {

    private ViroView mViroView;
    private ARScene mScene = null;
    private AmbientLight mMainLight = null;
    private AssetManager mAssetManager;

    private static final String TAG = ARportalActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_arportal);

        try{
            setupViroView();
        }
        catch (Exception e){
            Log.e(TAG, "onCreate: setupViroView ", e);
        }
    }

    private void setupViroView(){

        RendererConfiguration config = new RendererConfiguration();
        config.setShadowsEnabled(true);
        config.setBloomEnabled(true);
        config.setHDREnabled(true);
        config.setPBREnabled(true);


        mViroView = new ViroViewARCore(this, new ViroViewARCore.StartupListener() {
            @Override
            public void onSuccess() {
                displayScene();
            }

            @Override
            public void onFailure(ViroViewARCore.StartupError error, String errorMessage) {
                Log.e(TAG, "Failed to load AR Scene [" + errorMessage + "]");
            }
        }, config);
        setContentView(mViroView);
    }

    private void displayScene() {
        // Create the ARScene within which to load our ProductAR Experience
        mScene = new ARScene();
        mMainLight = new AmbientLight(Color.parseColor("#606060"), 400);
        mMainLight.setInfluenceBitMask(3);
        mScene.getRootNode().addLight(mMainLight);


        displayPortal();

        mViroView.setScene(mScene);
    }


    private void displayPortal(){

        // Add a Light so the ship door portal entrance will be visible
        OmniLight light = new OmniLight();
        light.setColor(Color.WHITE);
        light.setPosition(new Vector(0, 1, -4 ));
        mScene.getRootNode().addLight(light);

// Load a model representing the ship door
        Object3D shipDoorModel = new Object3D();
        shipDoorModel.loadModel(Uri.parse("file:///android_asset/portal_ship.vrx"), Object3D.Type.FBX, null);

// Create a Portal out of the ship door
        Portal portal = new Portal();
        portal.addChildNode(shipDoorModel);
        portal.setScale(new Vector(0.5, 0.5, 0.5));

// Create a PortalScene that uses the Portal as an entrance.
        PortalScene portalScene = new PortalScene();
        portalScene.setPosition(new Vector(0, 0, -5));
        portalScene.setPortalEntrance(portal);

// Add a 'beach' background for the Portal scene
        final Bitmap beachBackground = getBitmapFromAssets("jungle.jpg");
        final Texture beachTexture = new Texture(beachBackground, Texture.Format.RGBA8, true, false);
        portalScene.setBackgroundTexture(beachTexture);

        mScene.getRootNode().addChildNode(portalScene);

    }

    private Bitmap getBitmapFromAssets(String assetName) {
        if (mAssetManager == null) {
            mAssetManager = getResources().getAssets();
        }

        InputStream imageStream;
        try {
            imageStream = mAssetManager.open(assetName);
        } catch (IOException exception) {
            Log.w("Viro", "Unable to find image [" + assetName + "] in assets! Error: "
                    + exception.getMessage());
            return null;
        }
        return BitmapFactory.decodeStream(imageStream);
    }

}