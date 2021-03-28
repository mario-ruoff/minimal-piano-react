import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import Player from './components/Player';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  const loadAssets = ():any => {
    const sounds = Player.load(SoundFiles);
    return Promise.all([
      ...sounds
    ]);
  }

  //splash screen when sounds not loaded
  if (!appIsReady) {
    return (
      <AppLoading
          startAsync={loadAssets}
          onFinish={() => setAppIsReady(true)}
          onError={console.warn}
        />
    )
  }
  //render piano when sounds loaded
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={(midiNumber) => { Player.playSound(midiNumber) }}
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