import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstNote, setFirstNote] = useState('c4');
  const [lastNote, setLastNote] = useState('e5');

  // const loadAssets = () => {
  //   const sounds = Player.load(SoundFiles);
  //   return Promise.all([
  //     ...sounds
  //   ]);
  // }

  //splash screen when sounds not loaded
  // if (!appIsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadAssets}
  //       onFinish={() => setAppIsReady(true)}
  //       onError={console.warn}
  //     />
  //   )
  // }
  //render piano when sounds loaded
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" hidden />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        onPlayNoteInput={(midiNumber) => { Player.playSound(midiNumber) }}
        onStopNoteInput={() => { }}
      /> */}
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
