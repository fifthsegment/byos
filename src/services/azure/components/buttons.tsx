import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config";

function handleLogout(instance: any) {
  instance.logoutPopup().catch((e: Error) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  return <button onClick={() => handleLogout(instance)}>Sign out</button>;
};


function handleLogin(instance: any) {
  instance.loginPopup(loginRequest).catch((e: Error) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  return <button onClick={() => handleLogin(instance)}>Sign in</button>;
};