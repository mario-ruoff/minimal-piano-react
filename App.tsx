import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Piano } from 'react-native-piano';
import SoundPlayer from 'react-native-sound-player'

export default function App() {
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

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

function play(midiNumber) {
  try {
    // play the file tone.mp3
    SoundPlayer.playSoundFile('acoustic_grand_piano_B5', 'mp3')
  } catch (e) {
    console.log(`cannot play the sound file`, e)
  }
  // SoundFont.instrument('violin', {
  //   notes: ['C4', 'A3'], // only load 'C4' and 'A3' for speed
  //   gain: 1,
  //   release: 0.5 // release after half second
  // }).then(violin => {
  //   violin.play('C4', {gain: 0.5}); // Play 'C4' immediately at half gain
  //   violin.start('A3', 1000); // Start 'A3' after a second
  //   violin.stop('A3', 2000); // Stop after a second
  //   violin.destroy(); // release the Sound resources used (should be called, eventually)
  // });
}

function stop(midiNumber) {

}