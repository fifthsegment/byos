import React from "react";
import Home from "../pages/home";
import Credentials from "../pages/credentials";

export type InternalRouteDef = {
    path: string;
    component: JSX.Element;
    showInNavigation: boolean;

};

export type RoutingObjectDef = {
    isReady: boolean;
    routes: InternalRouteDef;
}

const routes: InternalRouteDef[] = [
    { path: "/credentials", component: <Credentials />, showInNavigation: true },
    { path: "/", component: <Home />, showInNavigation: true }
]

const internalRoutes = {
    isReady: false,
    routes: routes
};

export default internalRoutes