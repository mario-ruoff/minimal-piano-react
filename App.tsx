import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import { Audio } from 'expo-av';

// let soundObject, soundFeedback;

export default function App() {
  const [firstNote, setFirstNote] = useState('a3');
  const [lastNote, setLastNote] = useState('e5');

  const playSound = async (midiNumber: string) => {
    try {
      console.log("playing " + midiNumber);
      // await Audio.setIsEnabledAsync(true);
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(SoundFiles[midiNumber]);
      await soundObject.playAsync();
      // await soundObject
      //   .playAsync()
      //   .then(async (playbackStatus: any) => {
      //     setTimeout(() => {
      //       soundObject.unloadAsync()
      //     }, playbackStatus.playableDurationMillis)
      //   })
      //   .catch(error => {
      //     console.log("error while playing:");
      //     console.log(error);
      //   })
    } catch (error) {
      console.log("error while loading:");
      console.log(error);
    }
  }

  const stopSound = async () => {
    // console.log(soundFeedback.durationMillis);
    // if (soundObject && soundFeedback ) {
    //   try {
    //     soundFeedback.then(async () => {
    //       soundObject.unloadAsync()
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    //   } catch (error) {
    //     console.log("could not stop sound: " + error);
    //   }
    // }

  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={playSound}
        onStopNoteInput={stopSound}
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