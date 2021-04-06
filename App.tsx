import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import Player from './components/Player';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  const loadAssets = (): any => {
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
      {/* <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={async (midiNumber) => { console.log(midiNumber) }}
        onStopNoteInput={() => { }}
      /> */}
      <View>

      <Pressable style={styles.test}
          onPressIn={() => console.log('Button 1 pressed')}
          onPressOut={() => console.log('Button 1 released')}>
            
          <Text>BUTTON 1</Text>
        </Pressable>

        <Pressable style={styles.test}
          onPressIn={() => console.log('Button 2 pressed')}
          onPressOut={() => console.log('Button 2 released')}>
          <Text>BUTTON 2</Text>
        </Pressable>

      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  test: {
    height: '50%'
  }
})