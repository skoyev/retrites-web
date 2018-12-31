import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import Retrite from "./Retrite";

import "./App.css";

const App = ({ reduxStore }) => (
  <ReduxProvider store={reduxStore}>
    <main className="App">
      <Retrite />
    </main>
  </ReduxProvider>
);

export default App;