import React, {  useState } from "react"
import config from '../client-config'
import { RoutingContext } from "../contexts/routing/RoutingContext";
import routes from "../routes";
import { AzureAdProvider } from "./AzureAd";
import { BasicProvider } from "./BasicProvider";


/**
 * 
 * TODO: The msalConfig should be constructed here using variables from the clientconfig
 */

export const Provider = ({children}: React.PropsWithChildren) => {
    const {useAzureLogin} = config;
    const routingState = useState(routes);
    if (useAzureLogin) {
        return <RoutingContext.Provider value={routingState}>
                    <AzureAdProvider >
                    {children}
                    </AzureAdProvider>
            </RoutingContext.Provider>
    }
    return <>
    <RoutingContext.Provider value={routingState}>
        <BasicProvider>
        {children}
        </BasicProvider>
    </RoutingContext.Provider>
    </>
}