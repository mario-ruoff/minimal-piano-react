import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');
  const soundObjects = {};

  //Preload sounds from SoundFiles on startup
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        console.log("loading sounds...");
        const promisedSoundObjects: any = [];
        for (const name in SoundFiles) {
          const sound = SoundFiles[name];
          soundObjects[name] = new Audio.Sound();
          promisedSoundObjects.push(
            soundObjects[name].loadAsync(sound)
          );
        }
        console.log("successful load")
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        console.log("loaded sounds.");
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  //play sound from preloaded library
  const playSound = async (midiNumber: string) => {
    try {
      if (soundObjects[midiNumber]) {
        await soundObjects[midiNumber].replayAsync()
      }
    } catch (error) {
      console.warn(error)
    }
  }

  //render nothing is app is not loaded
  if (!appIsReady) {
    return null;
  }
  //render piano if app is loaded
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={playSound}
        onStopNoteInput={() => { }}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})