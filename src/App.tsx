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
import MobileNavigation from './components/MobileNavigation'
import { getApplicationStateLS, setApplicationStateLS } from './services/localstorage'
import { useGetApplicationStateFromLs } from './hooks/useGetApplicationStateFromLS'

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
            
                <Header title="BYOS" />
                <MobileNavigation/>
           
        </ApplicationContext.Provider>
        </PaperProvider>
    )
}

export default App

