import React, { useEffect, useState } from 'react'

//import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InternalRouteDef } from './routes'
//import { Link } from 'react-router-dom'
import { RoutingContext } from './contexts/routing/RoutingContext'
import {
    ApplicationContext,
    ApplicationState,
    initialData,
} from './contexts/application/ApplicationContext'
/*import {
    getApplicationStateLS,
    setApplicationStateLS,
} from './services/localstorage'*/

import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import { getApplicationStateLS, setApplicationStateLS } from './services/localstorage'
import { useGetApplicationStateFromLs } from './hooks/useGetApplicationStateFromLS'
import { DrawerNavigation } from './components/DrawerNavigation';

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const { data: savedApplicationData, isLoaded } = useGetApplicationStateFromLs(initialData);

    const applicationState = useState(savedApplicationData as ApplicationState)

    /*useEffect(() => {
        applicationState[1](savedApplicationData);
    }, [savedApplicationData])*/

    const [applicationStateData, setApplicationStateData] = applicationState

    useEffect(() => {
        //setApplicationStateLS({ ...applicationStateData })
        setApplicationStateData(savedApplicationData);
    }, [savedApplicationData])

    useEffect(() => {
        if (isLoaded) {
            console.log("[App] Application state was updated = ", applicationStateData)

            setApplicationStateLS({ ...applicationStateData })
        }
    }, [applicationStateData, isLoaded])

    return (
        <PaperProvider>
            <ApplicationContext.Provider value={applicationState}>
                {routingState.isReady &&
                    routingState.routes.map((route: InternalRouteDef) => {
                        return (
                            null
                        )
                    })}

                {/* <Header />
                <BottomNavigation /> */}
                <DrawerNavigation />

            </ApplicationContext.Provider>
        </PaperProvider>
    )
}

export default App

