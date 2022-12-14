import React, { useContext, useEffect, useState } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, Text, IconButton } from 'react-native-paper'
import { PortalHost, PortalProvider } from '@gorhom/portal'

import {
  ApplicationContext,
  initialData,
} from './contexts/application/ApplicationContext'
import MobileView from './components/MobileView'
import { setApplicationStateLS } from './services/localstorage'
import { useGetApplicationStateFromLs } from './hooks/useGetApplicationStateFromLS'
import Dashboard from './pages/dashboard'
import Credentials from './pages/credentials'
import { theme } from './theme'
import { ThemeContextInternal } from './contexts/theme/ThemeContextInternal'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
const Stack = createNativeStackNavigator()
/**
 * 
 */
const styles = StyleSheet.create({
  ButtonsWrapper: {
    flexDirection: 'row',
  },
  Button: {
    border: '1px',
    borderStyle: 'solid',
  },
})

function App(): JSX.Element {
  const themeState = useState(theme)
  const { data: savedApplicationData, isLoaded } =
    useGetApplicationStateFromLs(initialData)

  const applicationState = useState(savedApplicationData)
  const [applicationStateData, setApplicationStateData] = applicationState

  useEffect(() => {
    setApplicationStateData(savedApplicationData)
  }, [savedApplicationData])

  useEffect(() => {
    if (isLoaded) {
      setApplicationStateLS({ ...applicationStateData })
    }
  }, [applicationStateData, isLoaded])

  const navigationButtons = ({ navigation }): any => ({
    headerTitle: (props) => <Text>BYOS</Text>,
    // Add a placeholder button without the `onPress` to avoid flicker
    headerRight: () => (
      <View style={styles.ButtonsWrapper}>
        <PortalHost name="Reloader" />
        <IconButton
          style={styles.Button}
          icon="home"
          onPress={() => navigation.navigate('Home')}
        />
        <IconButton
          style={styles.Button}
          icon="cogs"
          onPress={() => navigation.navigate('Credentials')}
        />
      </View>
    ),
  })

  return (
    <ThemeContextInternal.Provider value={themeState}>
      <ThemeProvider>
        <PortalProvider>
          <ApplicationContext.Provider value={applicationState}>
            {Platform.OS === 'web' && (
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={Dashboard}
                    options={navigationButtons}
                  />
                  <Stack.Screen
                    name="Credentials"
                    component={Credentials}
                    options={navigationButtons}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            )}
            <MobileView />
          </ApplicationContext.Provider>
        </PortalProvider>
      </ThemeProvider>
    </ThemeContextInternal.Provider>
  )
}

const ThemeProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [theme] = useContext(ThemeContextInternal)
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}

export default App

serviceWorkerRegistration.register()
