import React from "react";
import { useLocation } from "react-router-dom";
export default function Login() {
  const location = useLocation();
  console.log("Location : ", location.pathname, "Loc = ", location);
  return <div>Login</div>;
}
