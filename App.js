import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import { Audio } from 'expo-av'

const App = () => {
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={async (midiNumber) => {
          const { sound } = await Audio.Sound.createAsync(SoundFiles[midiNumber]);
          const status = await sound.playAsync();
          setTimeout(() => {
            sound.unloadAsync();
          }, status.playableDurationMillis);
        }}
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
