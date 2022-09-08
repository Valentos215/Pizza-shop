import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
