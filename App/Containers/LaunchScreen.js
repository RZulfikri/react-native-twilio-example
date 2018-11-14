import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { Images, Colors } from '../Themes'
import TwilioActions from '../Redux/TwilioRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

const { width, height } = Dimensions.get('window')

class LaunchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      roomName: '',
    }
    this.onPressConnect = this.onPressConnect.bind(this)
  }

  onPressConnect() {
    this.props.navigation.navigate('VideoCallScreen')
    this.props.getVideoCallToken({ name: this.state.name, room: this.state.roomName })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: height / 10 }}>
          <Text style={{ fontSize: 80, textAlign: 'center' }}>RN</Text>
          <Text style={{ fontSize: 30, textAlign: 'center', marginTop: -25, marginBottom: height / 12 }}>TWILIO</Text>
          <TextInput
            placeholder='user name'
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            underlineColorAndroid='transparent'
            returnKeyType='next'
            onSubmitEditing={() => this.refs.roomname.focus()}
          />
          <TextInput
            ref={'roomname'}
            placeholder='room name'
            style={styles.textInput}
            onChangeText={roomName => this.setState({ roomName })}
            returnKeyType='done'
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={this.onPressConnect}>
            <Text style={styles.buttonTitle}>CONNECT ME</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // getVideoCallTokenStatus: state.twilio.getTwilioToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoCallToken: (params) => dispatch(TwilioActions.getTwilioTokenRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
