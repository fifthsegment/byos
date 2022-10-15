import React, { useContext, useEffect, useState } from 'react'
// import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InternalRouteDef } from './routes'
// import { Link } from 'react-router-dom'
import { RoutingContext } from './contexts/routing/RoutingContext'
import {
  ApplicationContext,
  initialData
} from './contexts/application/ApplicationContext'
/* import {
    getApplicationStateLS,
    setApplicationStateLS,
} from './services/localstorage' */
import { Provider as PaperProvider } from 'react-native-paper'
import Header from './components/Header'
import MobileNavigation from './components/MobileNavigation'
import { setApplicationStateLS } from './services/localstorage'
import { useGetApplicationStateFromLs } from './hooks/useGetApplicationStateFromLS'
import { PortalProvider } from '@gorhom/portal'
import { theme } from './theme'
import { ThemeContextInternal } from './contexts/theme/ThemeContextInternal'

function App (): JSX.Element {
  const themeState = useState(theme)
  const [routingState] = React.useContext(RoutingContext)
  const { data: savedApplicationData, isLoaded } =
    useGetApplicationStateFromLs(initialData)

  const applicationState = useState(savedApplicationData)

  /* useEffect(() => {
        applicationState[1](savedApplicationData);
    }, [savedApplicationData]) */

  const [applicationStateData, setApplicationStateData] = applicationState

  useEffect(() => {
    // setApplicationStateLS({ ...applicationStateData })
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
      <ThemeProvider>
        <PortalProvider>
          <ApplicationContext.Provider value={applicationState}>
            {routingState.isReady &&
              routingState.routes.map((route: InternalRouteDef) => {
                return null
              })}
            <Header title="BYOS" />
            <MobileNavigation />
          </ApplicationContext.Provider>
        </PortalProvider>
      </ThemeProvider>
    </ThemeContextInternal.Provider>
  )
}

const ThemeProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [theme] = useContext(ThemeContextInternal)
  console.log('Current theme = ', theme)
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}

export default App
