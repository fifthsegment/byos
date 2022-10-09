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

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const savedApplicationData = (
        initialData
    )
    const applicationState = useState(savedApplicationData as ApplicationState)
    const [applicationStateData] = applicationState

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

