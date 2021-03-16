import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import { Audio } from 'expo-av';

let playbackInstance = null;
let soundFiles = [];
let sound = null;

export default function App() {
  const [firstNote, setFirstNote] = useState('c4');
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
      await sound.loadAsync({ uri: `assets/sounds/acoustic_grand_piano_${midiNumber}.mp3` });
      sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }
}

function stop(midiNumber) {
  sound.stopAsync();
}

async function loadNewPlaybackInstance(instrument, midiNumber) {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);
      playbackInstance = null;
    }
    const source = require('./assets/sounds/acoustic_grand_piano_A4.mp3');
    const { sound } = await Audio.Sound.createAsync(source);
    //  Save the response of sound in playbackInstance
    playbackInstance = sound;
  }

  function componentWillUnmount() {
    playbackInstance.unloadAsync();
    //  Check Your Console To verify that the above line is working
    console.log('unmount');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  })