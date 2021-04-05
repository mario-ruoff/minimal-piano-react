import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import Player from './components/Player';
import AppLoading from 'expo-app-loading';
import { TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

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
    // <View style={styles.container}>
    //   <StatusBar style="auto" hidden />
    //   <Piano
    //     noteRange={{ first: firstNote, last: lastNote }}
    //     onPlayNoteInput={async (midiNumber) => { console.log(midiNumber) }}
    //     onStopNoteInput={() => { }}
    //   />
    // </View>
    // <View>
    //   <TouchableOpacity style={styles.test}
    //     onPressIn={() => console.log('Button 1 pressed')}
    //     onPressOut={() => console.log('Button 1 released')}>

    //     <Text>BUTTON 1</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity style={styles.test}
    //     onPressIn={() => console.log('Button 2 pressed')}
    //     onPressOut={() => console.log('Button 2 released')}>
    //     <Text>BUTTON 2</Text>
    //   </TouchableOpacity>
    // </View>
      <TapGestureHandler onGestureEvent={(state) => { console.log(state) }}>
        <View style={styles.test}></View>
      </TapGestureHandler>
  );

}

const styles = StyleSheet.create({
  test: {
    position: 'absolute',
    margin: '10%',
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})