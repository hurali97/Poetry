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
  feed: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Ffeed.chunk.bundle?alt=media&token=4bdba32f-3082-4be4-a029-aef091832987',
  auth: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Fauth.chunk.bundle?alt=media&token=2b22e5aa-b9f1-47f5-93ff-9099a69ad957',
  poet: 'https://firebasestorage.googleapis.com/v0/b/poetry-54149.appspot.com/o/chunks%2Fpoet.chunk.bundle?alt=media&token=ddaebfc2-885e-4267-aa96-14461f7f2f25',
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
