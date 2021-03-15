import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Piano } from 'react-native-piano'

export default function App() {
  const [firstNote, setFirstNote] = React.useState('c4');
  const [lastNote, setLastNote] = React.useState('e5');

  let play = () => {
    
  }

  let stop = () => {
    
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