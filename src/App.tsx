import React, { useEffect, useState } from 'react'
import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InternalRouteDef } from './routes'
import { Link } from 'react-router-dom'
import { RoutingContext } from './contexts/routing/RoutingContext'
import {
    ApplicationContext,
    ApplicationState,
} from './contexts/application/ApplicationContext'
import initialData from './contexts/application/initialData'
import {
    getApplicationStateLS,
    setApplicationStateLS,
} from './services/localstorage'

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const savedApplicationData = getApplicationStateLS(
        JSON.stringify(initialData)
    )
    const applicationState = useState(savedApplicationData as ApplicationState)
    const [applicationStateData] = applicationState
    useEffect(() => {
        setApplicationStateLS(applicationStateData)
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
                <div>
                    Routes defined:
                    <ul>
                        {routingState.routes.map((route: InternalRouteDef) => {
                            return (
                                <li>
                                    <Link key={route.path} to={route.path}>
                                        {route.path}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Router>
        </ApplicationContext.Provider>
    )
}

export default App
