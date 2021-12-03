import React from "react";
import { useAuth } from "context/auth-context";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
// import {TsReactTest} from './try-use-array';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* <TsReactTest /> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
