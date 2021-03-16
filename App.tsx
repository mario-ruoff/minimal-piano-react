import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Piano } from 'react-native-piano'
import SoundFont from 'react-native-soundfont';

export default function App() {
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  const play = (midiNumber) => {
    // console.log(SoundFont);
    // soundfont.then(instrument => {
    //   instrument.play(midiNumber);
    // });
  }

  const stop = (midiNumber) => {

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={play}
        onStopNoteInput={stop}
      />
    </View>
  );

}