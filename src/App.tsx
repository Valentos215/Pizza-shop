import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Pizza from "pages/pizza/Pizza";
import Products from "pages/products/Products";
import Preloader from "shared/components/preloader/Preloader";
import { CartProvider } from "contexts/cartContext";
import { ExpandProvider } from "contexts/expandContext";
import CartChecker from "hok/cartChecker";
const Checkout = React.lazy(() => import("pages/checkout/Checkout"));

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
                  <Route path="/checkout">
                    <React.Suspense fallback={<Preloader />}>
                      <Checkout />
                    </React.Suspense>
                  </Route>
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
