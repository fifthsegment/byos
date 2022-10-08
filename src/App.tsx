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

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const savedApplicationData = getApplicationStateLS(
        JSON.stringify(initialData)
    )
    const applicationState = useState(savedApplicationData as ApplicationState)
    const [applicationStateData] = applicationState

    useEffect(() => {
        setApplicationStateLS({ ...applicationStateData })
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
