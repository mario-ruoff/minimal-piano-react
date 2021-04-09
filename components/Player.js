import Sound from 'react-native-sound'
import SoundFiles from './SoundFiles'

const soundObjects = {}

class Player {
  static load(library) {
    Sound.setCategory('Playback', true)
    //create promise array to wait for all sounds beeing loaded
    const promises = []

    //iterate over sound library with midi numbers as keys and file names as values
    for (let name in library) {
      //create promise for each sound
      const promise = new Promise((resolve, reject) => {
        const sound = new Sound(library[name], Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.error(error)
            reject()
          }
          soundObjects[name] = sound
          resolve(sound)
        })
      })
      promises.push(promise)
    }
    return promises

    // for (const name in library) {
    //   const sound = library[name]

    //   soundObjects[name] = new Audio.Sound()

    //   promisedSoundObjects.push(
    //     soundObjects[name].loadAsync(sound)
    //   )
    // }

  }

  static async playSound(name) {
    soundObjects[name].play((success) => {
      if (!success) {
        console.log('Issue playing file');
      }
    })
    // let mySound = new Sound(SoundFiles[name], Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.log('Error loading sound: ' + error);
    //     return;
    //   } else {
    //     mySound.play((success) => {
    //       if (!success) {
    //         console.log('Issue playing file');
    //       }
    //     })
    //   }
    // });
    // mySound.release();
    // try {
    //   if (soundObjects[name]) {
    //     await soundObjects[name].replayAsync()
    //   }
    // } catch (error) {
    //   console.warn(error)
    // }
  }
}

export default Player