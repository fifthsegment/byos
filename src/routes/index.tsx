import React from 'react'
import Home from '../pages/home'
import Credentials from '../pages/credentials'

export interface InternalRouteDef {
  path: string
  component: JSX.Element
  showInNavigation: boolean

}

export interface RoutingObjectDef {
  isReady: boolean
  routes: InternalRouteDef
}

const routes: InternalRouteDef[] = [
  { path: '/credentials', component: <Credentials />, showInNavigation: true },
  { path: '/', component: <Home />, showInNavigation: true }
]

const internalRoutes = {
  isReady: false,
  routes
}

export default internalRoutes
