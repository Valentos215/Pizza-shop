import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Pizza from "./components/Pizza/Pizza";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Switch>
          <Route path="/pizza" component={Pizza} exact />s
          <Route path="/" component={Pizza} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
