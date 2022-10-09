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
import Dashboard from './pages/dashboard'
import { SaveCredentialsForm } from './components/SaveCredentialsForm'
import { Appbar, Provider } from 'react-native-paper'

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const savedApplicationData = (
        initialData
    )
    const applicationState = useState(savedApplicationData as ApplicationState)
    const [applicationStateData] = applicationState

    return (
        <Provider>
        <ApplicationContext.Provider value={applicationState}>
                    {routingState.isReady &&
                        routingState.routes.map((route: InternalRouteDef) => {
                            return (
                                null
                            )
                        })}
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => {}} />
                    <Appbar.Content title="Title" />
                    <Appbar.Action icon="calendar" onPress={() => {}} />
                    <Appbar.Action icon="magnify" onPress={() => {}} />
                </Appbar.Header>
                <SaveCredentialsForm/>
                {/* <Dashboard /> */}
                            
        </ApplicationContext.Provider>
        </Provider>
    )
}

export default App

