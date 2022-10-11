import React, { useState } from 'react'
import { RoutingContext } from '../contexts/routing/RoutingContext'
import routes from '../routes'
import { BasicProvider } from './BasicProvider'
import QueryProvider from './QueryProvider'

export const Provider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const routingState = useState(routes)

  /**
       if (useAzureLogin) {
          return <QueryProvider>
              <RoutingContext.Provider value={routingState}>
                  <AzureAdProvider >
                      {children}
                  </AzureAdProvider>
              </RoutingContext.Provider>
          </QueryProvider>
      }else
      { */
  return (
        <QueryProvider>
            <RoutingContext.Provider value={routingState}>
                <BasicProvider>
                    {children}
                </BasicProvider>
            </RoutingContext.Provider>
        </QueryProvider>)
}
