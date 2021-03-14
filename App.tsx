import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open app to start working on your app!</Text>
      <Button
        title="Outline button"
        onPress={buttonPressed}
      />

      <StatusBar style="auto" />
    </View>
  );
}

let buttonPressed = () => {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
