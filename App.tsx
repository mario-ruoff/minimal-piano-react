import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Piano } from 'react-native-piano'
import Sound from 'react-native-sound';

export default function App() {
  const [firstNote, setFirstNote] = React.useState('c4');
  const [lastNote, setLastNote] = React.useState('e5');

  let play = (midiNumber) => {
    console.log("starting playing " + midiNumber);
  }

  let stop = (midiNumber) => {
    
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