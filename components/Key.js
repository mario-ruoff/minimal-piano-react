import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View, Platform } from 'react-native'

import MidiNumbers from './MidiNumbers'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

class Key extends Component {
  state = {
    touched: false
  }

  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
    useTouchEvents: PropTypes.bool.isRequired,
    accidental: PropTypes.bool.isRequired,
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
      C: 0,
      Db: 0.55,
      D: 1,
      Eb: 1.8,
      E: 2,
      F: 3,
      Gb: 3.5,
      G: 4,
      Ab: 4.7,
      A: 5,
      Bb: 5.85,
      B: 6,
    },
  };

  onPlayNoteInput = () => {
    this.setState({
      ...this.state,
      touched: true
    })

    this.props.onPlayNoteInput(MidiNumbers.midiToNoteName(this.props.midiNumber), this.props.midiNumber);
  };

  onStopNoteInput = () => {
    this.setState({
      ...this.state,
      touched: false
    })

    this.props.onStopNoteInput(MidiNumbers.midiToNoteName(this.props.midiNumber), this.props.midiNumber);
  };

  // Key position is represented by the number of natural key widths from the left
  getAbsoluteKeyPosition(midiNumber) {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = this.props.pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      useTouchEvents,
      accidental,
    } = this.props

    const { touched } = this.state
    
    return (
      <View
        style={{
          position: 'absolute',
          height: accidental ? '61.8%' : '100%',
          zIndex: accidental ? 1 : 0,
          left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
          width: ratioToPercentage(
            accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth,
          )
        }}
      >
        <TouchableWithoutFeedback
          style={
            Platform.OS == 'web'
              ? { height: accidental ? '61.8vh' : '100vh' }
              : { height: '100%'}
          }
          onPressIn={useTouchEvents ? this.onPlayNoteInput : null}
          onPressOut={useTouchEvents ? this.onStopNoteInput : null}
        >
          <LinearGradient
            colors={
              touched
                ? (
                  accidental
                    ? ['#737f8c', '#4f5863']  //black touched
                    : ['#e2e5e9', '#b6bfc9']  //white touched
                )
                : (
                  accidental
                    ? ['#464D55', '#25292E']  //black
                    : ['#FFF', '#FFF']        //white
                )
            }
            style={accidental ? styles.ReactPiano__Key__accidental : styles.ReactPiano__Key__natural}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

const styles = StyleSheet.create({
  ReactPiano__Key__natural: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#f6f5f3',
    borderColor: '#888',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  ReactPiano__Key__accidental: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#555',
    borderColor: 'transparent',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  ReactPiano__Key__active: {
    backgroundColor: '#3ac8da'
  },
  ReactPiano__NoteLabelContainer: {
    flex: 1,
    /* Align children .ReactPiano__NoteLabel to the bottom of the key */
    alignSelf: 'flex-end'
  }
});

export default Key