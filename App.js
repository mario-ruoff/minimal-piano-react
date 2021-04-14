import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Piano from './components/Piano';
import Player from './components/Player';
import SoundFiles from './components/SoundFiles';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    console.log("hidden")
    }, 3000);
    // Player.load(SoundFiles);
    
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={(midiNumber) => { Player.playSound(midiNumber) }}
        onStopNoteInput={() => { }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
