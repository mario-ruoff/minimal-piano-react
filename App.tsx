import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Piano from './components/Piano';
import SoundFiles from './components/SoundFiles';
import { Audio } from 'expo-av';

export default function App() {
  const [firstNote, setFirstNote] = useState('a3');
  const [lastNote, setLastNote] = useState('e5');
  const soundObjects = {};

  //Preload sounds from SoundFiles on startup
  useEffect(() => {
    const promisedSoundObjects: any = [];
    for (const name in SoundFiles) {
      const sound = SoundFiles[name];
      soundObjects[name] = new Audio.Sound();
      promisedSoundObjects.push(
        soundObjects[name].loadAsync(sound)
      );
    }
  });

  //play sound from preloaded library
  const playSound = async (midiNumber: string) => {
    try {
      if (soundObjects[midiNumber]) {
        await soundObjects[midiNumber].replayAsync()
      }
    } catch (error) {
      console.warn(error)
    }
  }

  //render piano
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={playSound}
        onStopNoteInput={() => {}}
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