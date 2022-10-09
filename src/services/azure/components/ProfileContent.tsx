import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config";

export default function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const name = accounts[0] && accounts[0]?.idTokenClaims?.given_name;

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response:any) => {
        setAccessToken(response.accessToken);
      })
      .catch((e: Error) => {
        instance.acquireTokenPopup(request).then((response:any) => {
          setAccessToken(response.accessToken);
        });
      });
  }

  return (
    <div>
      <h5>Welcome  <>{name}</></h5>
      {accessToken ? (
        <p>Access Token Acquired!</p>
      ) : (
        <button onClick={RequestAccessToken}>Request Access Token</button>
      )}
    </div>
  );
}
