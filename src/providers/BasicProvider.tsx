import React, { useEffect } from "react";
import { RoutingContext } from "../contexts/routing/RoutingContext";

export const BasicProvider = ({children} : React.PropsWithChildren) => {
    const [routingState, setRoutingState] = React.useContext(RoutingContext);  
    useEffect(() => {
        if (routingState.isReady === false) {
            setRoutingState({...routingState, isReady: true});
        }
    }, [routingState.isReady, routingState.routes])
    return <>
        {children}
    </>
}