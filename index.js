/**
 * @format
 */
import {AppRegistry, LogBox, Platform, UIManager} from 'react-native';
import {ScriptManager, Script} from '@callstack/repack/client';
import AsyncStorage from '@react-native-community/async-storage';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS == 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const chunkURLs = {
  feed: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Ffeed.chunk.bundle?alt=media&token=eb5d647f-d807-486f-8f23-bcdb610b8dd7',
  auth: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Fauth.chunk.bundle?alt=media&token=a32c55b8-b03e-4def-bd14-a3a6f258c0a9',
  poet: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Fpoet.chunk.bundle?alt=media&token=bdd6662f-f6c3-4a28-89e3-5ddf9ffb4d68',
};

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async scriptId => {
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }

  if (!chunkURLs[scriptId]) {
    return {
      url: Script.getFileSystemURL(scriptId),
    };
  }

  return {
    url: Script.getRemoteURL(chunkURLs[scriptId]),
  };
});

LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
