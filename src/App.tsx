import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Pizza from "./components/Pizza/Pizza";
import Products from "./components/Products/Products";
import { CartProvider } from "./contexts/cartContext";
import CartChecker from "./hok/cartChecker";

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <CartProvider>
          <CartChecker>
            <Header expanded={expanded} setExpanded={setExpanded} />
            <div className={expanded ? "expanded" : ""}>
              <Switch>
                <Route path="/pizza" component={Pizza} exact />s
                <Route path="/" component={Pizza} exact />
                <Route path="/drinks" component={Products} />
                <Route path="/sides" component={Products} />
                <Route path="/dessert" component={Products} />
              </Switch>
            </div>
          </CartChecker>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
