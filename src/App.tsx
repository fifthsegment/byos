import React, { useState } from 'react'
import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InternalRouteDef } from './routes'
import { Link } from 'react-router-dom'
import { RoutingContext } from './contexts/routing/RoutingContext'
import { ApplicationContext } from './contexts/application/ApplicationContext'

function App() {
    const [routingState] = React.useContext(RoutingContext)
    const applicationState = useState()
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
