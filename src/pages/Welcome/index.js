import React, { useState, useEffect, setState } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Alert, StatusBar, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

import Api from '../../services/api';
import Hello from '../../components/Snackbar';

import {
  Container,
  Brand,
  Title,
  TextInformation,
  Error,
  Form,
  Input,
  ButtonText,
} from './styles'

export default function Welcome(props) {
  const [username, setUsername] = useState('admin@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [visible, setVisible] = useState(false);
  const [secure, setSecure] = useState(true);

  const onDismissSnackBar = () => setVisible(false);
  const onPressEye = () => {
    if (secure == true) {
      setSecure(false)
    } else {
      setSecure(true)
    }
  } 

  async function saveUser(user) {
    await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(user))
  }

  async function signIn() {
    if (username.length === 0) return

    setLoading(true)

    const credentials = {
      email: username,
      pass: password
    }

    Api.post('auth/login', credentials).then(res => {
      var data = res.data;
      if (data.status == true) {
        setLoading(false)
        setErrorMessage(data.message)
        setVisible(true)

        saveUser(data.appdata)

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'App' })],
        })
        props.navigation.dispatch(resetAction)
      } else {
        console.log(data.message)
        let message = data.error || data.message.email || data.message.pass;
        setLoading(false)
        setErrorMessage(message)
        setVisible(true)
      }
    })

  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Brand>AKSAPOS</Brand>
      <Title>Selamat Datang</Title>
      <TextInformation>
        Untuk melanjutkan, Anda perlu memasukkan nama pengguna Anda.
      </TextInformation>

      {/**!!errorMessage && <Error>{errorMessage}</Error>*/}

      <Form>
        <TextInput
          mode='outlined'
          autoCapitalize="none"
          autoCorrect={false}
          label="Masukkan nama pengguna Anda"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <TextInput
          mode='outlined'
          autoCapitalize="none"
          autoCorrect={false}
          label="Ketikkan kata sandi Anda"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          secureTextEntry={secure}
          right={<TextInput.Icon name="eye" onPress={onPressEye} />}
          value={password}
          onChangeText={password => setPassword(password)}
        />

        <Button icon="camera" onPress={signIn} mode="contained" loading={loading}>
          Login
        </Button>
      </Form>
      {!!errorMessage && <Hello message={errorMessage} open={visible} close={onDismissSnackBar} />}
    </Container>
  )
}

Welcome.navigationOptions = () => {
  return {
    header: null,
  }
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}
