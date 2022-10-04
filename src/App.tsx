import React from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";

import { isEnabled } from "./services/azure/authConfig";

function withLoginIntegration() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Home />} />
      
    </Routes>
  );
}

function withoutLoginIntegration() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        {isEnabled ? withLoginIntegration() : withoutLoginIntegration()}
      </Router>
    </div>
  );
}

export default App;
