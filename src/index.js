import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import RootStackContainer from './routes'
import { ThemeProvider } from 'styled-components'
import { globalStyles } from './styles'

import './config/ReactotronConfig'
import { setTopLevelNavigator } from './utils'

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <RootStackContainer  
          ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef)
          }}
        />
      </PaperProvider>
    );
  }
}
