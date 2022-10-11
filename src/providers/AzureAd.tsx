import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import React, { useEffect } from 'react'
import { RoutingContext } from '../contexts/routing/RoutingContext'
import { InternalRouteDef } from '../routes'
import AzureLoginPage from '../services/azure/components/AzureLoginPage'
import { msalConfig } from '../services/azure/config'

const msalInstance = new PublicClientApplication(msalConfig)

export const AzureAdProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [routingState, setRoutingState] = React.useContext(RoutingContext)
  useEffect(() => {
    if (routingState.isReady === false) {
      setRoutingState({
        routes: routingState.routes.map((route: InternalRouteDef) => {
          if (route.path === '/login') {
            return { ...route, component: <AzureLoginPage /> }
          }
          return route
        }),
        isReady: true
      })
    }
    // eslint-disable-next-line
  }, [routingState.isReady, routingState.routes])
  return <MsalProvider instance={msalInstance}>
    {children}
  </MsalProvider>
}
