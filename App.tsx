import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import { Audio } from 'expo-av';

let sound = null;

export default function App() {
  const [firstNote, setFirstNote] = useState('a3');
  const [lastNote, setLastNote] = useState('e5');

  useEffect(() => {
    sound = new Audio.Sound();
    
    //soundFiles.push(require(`./assets/sounds/${instrument}_${midiNumber}.mp3`))
    // Audio.setAudioModeAsync({
    //   allowsRecordingIOS: false,
    //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //   playsInSilentModeIOS: true,
    //   shouldDuckAndroid: true,
    //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //   playThroughEarpieceAndroid: false,
    // });
    // loadNewPlaybackInstance('acoustic_grand_piano', null);
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

async function play(midiNumber) {
  if (sound != null) {
    try {
      await sound.unloadAsync();
      await sound.loadAsync(SoundFiles[midiNumber]);
      sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }
}

function stop(midiNumber) {
  if (sound != null) {
    try {
      sound.stopAsync();
    } catch (error) {
      console.log(error);
    }
  }
  
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  })