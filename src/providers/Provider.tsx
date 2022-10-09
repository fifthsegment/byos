import React, { useState } from "react"
import config from '../client-config'
import { RoutingContext } from "../contexts/routing/RoutingContext";
import routes from "../routes";
import { AzureAdProvider } from "./AzureAd";
import { BasicProvider } from "./BasicProvider";
import QueryProvider from "./QueryProvider";
import { Platform } from "react-native";

export const Provider = ({ children }: React.PropsWithChildren) => {
    const { useAzureLogin } = config;
    const routingState = useState(routes);
    
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