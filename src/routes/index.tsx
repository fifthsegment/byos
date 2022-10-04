import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import Home from "../pages/home"
import React from "react";


export type InternalRouteDef = {
    path: string;
    component: JSX.Element;
};

export type RoutingObjectDef = {
    isReady: boolean;
    routes: InternalRouteDef;
}

const routes: InternalRouteDef[] = [
    {path: "/dashboard", component: <Dashboard /> },
    {path: "/login", component: <Login /> },
    {path: "/", component: <Home /> }
]

export default {
    isReady: false,
    routes: routes
} 