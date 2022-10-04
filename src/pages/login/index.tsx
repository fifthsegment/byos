import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton, SignOutButton } from "../../services/azure/signIn_singOut";
import ProfileContent from "../../services/azure/profileContent";

export default function Login() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      <h5>Login</h5>
      {isAuthenticated ? (
        <span>You are singed in</span>
      ) : (
        <span>You are singed out</span>
      )}
      <br></br>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      {isAuthenticated && <ProfileContent />}
    </div>
  );
}
