import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Header/Header";
import Pizza from "./components/Pizza/Pizza";
import Products from "./components/Products/Products";
import { CartProvider } from "./contexts/cartContext";
import { ExpandProvider } from "./contexts/expandContext";
import CartChecker from "./hok/cartChecker";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <ExpandProvider>
          <CartProvider>
            <CartChecker>
              <Header />
              <SkeletonTheme>
                <Switch>
                  <Route path="/" exact>
                    <Redirect to="/pizza" />
                  </Route>
                  <Route path="/pizza" component={Pizza} exact />
                  <Route path="/drinks" component={Products} />
                  <Route path="/sides" component={Products} />
                  <Route path="/dessert" component={Products} />
                  <Route path="/checkout" component={Checkout} />
                </Switch>
              </SkeletonTheme>
            </CartChecker>
          </CartProvider>
        </ExpandProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
