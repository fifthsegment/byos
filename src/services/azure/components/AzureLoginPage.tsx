import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { SignInButton, SignOutButton } from './buttons'
import ProfileContent from './ProfileContent'

export default function AzureLoginPage () {
  const isAuthenticated = useIsAuthenticated()
  return (
    <div>
      <h5>Azure Login</h5>
      {isAuthenticated
        ? (
        <span>You are singed in</span>
          )
        : (
        <span>You are singed out</span>
          )}
      <br></br>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      {isAuthenticated && <ProfileContent />}
    </div>
  )
}
