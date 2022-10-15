import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'
import { PortalProvider } from '@gorhom/portal'

import {
  ApplicationContext,
  initialData
} from './contexts/application/ApplicationContext'
import MobileView from './components/MobileView'
import { setApplicationStateLS } from './services/localstorage'
import { useGetApplicationStateFromLs } from './hooks/useGetApplicationStateFromLS'
import Dashboard from './pages/dashboard'
import Credentials from './pages/credentials'
import { theme } from './theme'
import { ThemeContextInternal } from './contexts/theme/ThemeContextInternal'

const Stack = createNativeStackNavigator()

function App (): JSX.Element {
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
      console.log(
        '[App] Application state was updated = ',
        applicationStateData
      )
      setApplicationStateLS({ ...applicationStateData })
    }
  }, [applicationStateData, isLoaded])

  return (
    <ThemeContextInternal.Provider value={themeState}>
      <PortalProvider>
        <ApplicationContext.Provider value={applicationState}>
          {Platform.OS === 'web' && (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Credentials" component={Credentials} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
          <MobileView />
        </ApplicationContext.Provider>
      </PortalProvider>
    </ThemeContextInternal.Provider>
  )
}

const ThemeProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [theme] = useContext(ThemeContextInternal)
  console.log('Current theme = ', theme)
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}

export default App
