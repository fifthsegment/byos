import React, { useEffect, useState } from 'react'
import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InternalRouteDef } from './routes'
import { Link } from 'react-router-dom'
import { RoutingContext } from './contexts/routing/RoutingContext'
import {
    ApplicationContext,
    ApplicationState,
    initialData,
} from './contexts/application/ApplicationContext'
import {
    getApplicationStateLS,
    setApplicationStateLS,
} from './services/localstorage'
import { buildS3Client } from './services/s3'
import Dashboard from './pages/dashboard'

const initiateS3Client = (appState: ApplicationState) => {
    const { s3credentials } = appState;
    const { apiKey, apiSecret, region, endpoint } = s3credentials;
    if (apiKey && apiSecret && endpoint) {
        appState.s3client = buildS3Client({
            region,
            credentials: {
                accessKeyId: apiKey,
                secretAccessKey: apiSecret
            },
            endpoint
        })
    }
    return appState;
}

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const savedApplicationData = getApplicationStateLS(
        JSON.stringify(initialData)
    )
    const applicationState = useState(initiateS3Client(savedApplicationData as ApplicationState))
    const [applicationStateData] = applicationState
    useEffect(() => {
        setApplicationStateLS({ ...applicationStateData })
    }, [applicationStateData])
    useEffect(() => {
        initiateS3Client(applicationStateData as ApplicationState)
    }, [applicationStateData])
    return (
        <ApplicationContext.Provider value={applicationState}>
            <Router>
                <Routes>
                    {routingState.isReady &&
                        routingState.routes.map((route: InternalRouteDef) => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.component}
                                />
                            )
                        })}
                </Routes>
                <Dashboard />
                <nav className="remove-this-style-nav">
                    <ul>
                        {routingState.routes
                            .filter((route: InternalRouteDef) => route.showInNavigation)
                            .map((route: InternalRouteDef) => {
                                return (
                                    <li key={route.path}>
                                        <Link key={route.path} to={route.path}>
                                            {route.path}
                                        </Link>
                                    </li>
                                )
                            })}
                    </ul>
                </nav>
            </Router>
        </ApplicationContext.Provider>
    )
}

export default App
