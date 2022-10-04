export const msalConfig = {
    auth: {
      clientId: "1308c1b6-585b-4b12-ba62-7cfd2790849f",
      //authority:"https://login.microsoftonline.com/45155b2d-22e5-40e1-9ca6-cf423ef564be",
      authority: "https://byo5.b2clogin.com/byo5.onmicrosoft.com/B2C_1_test1",
      // eslint-disable-next-line
      redirectUri: location.protocol+'//'+location.host+location.pathname,
      //redirectUri: "http://localhost:3000/dashboard",
      knownAuthorities: ["byo5.b2clogin.com"],
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  
  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  export const loginRequest = {
    scopes: ["openid", "offline_access"],
  };
  
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  };
  
  //set value to false to disable login and integration with azure sso
  export const isEnabled = true;
  
