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
        <Provider>
            <ApplicationContext.Provider value={applicationState}>
                {routingState.isReady &&
                    routingState.routes.map((route: InternalRouteDef) => {
                        return (
                            null
                        )
                    })}
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => { }} />
                    <Appbar.Content title="Title" />
                    <Appbar.Action icon="calendar" onPress={() => { }} />
                    <Appbar.Action icon="magnify" onPress={() => { }} />
                </Appbar.Header>
                <SaveCredentialsForm />

            </ApplicationContext.Provider>
        </Provider>
    )
}

export default App

