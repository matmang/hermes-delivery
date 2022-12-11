import React from "react";
import "./App.css";
import "./styles/styles.css";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { LOCALSTORAGE_TOKEN } from "./constants";

function App() {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

  if (!token) {
    return <LoggedOutRouter />;
  }

  return <LoggedInRouter />;
}

export default App;
