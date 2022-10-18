import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/header/Header';
import Preloader from 'shared/components/preloader/Preloader';
import { CartProvider } from 'contexts/cartContext';
import { ExpandProvider } from 'contexts/expandContext';
import CartChecker from 'hok/cartChecker';

import 'App.scss';

import { ERouterLink } from 'constants/index';

const PizzaLazy = React.lazy(() => import('pages/pizza/Pizza'));
const ProductsLazy = React.lazy(() => import('pages/products/Products'));
const Checkout = React.lazy(() => import('pages/checkout/Checkout'));

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <ExpandProvider>
          <CartProvider>
            <CartChecker>
              <Header />
              <SkeletonTheme>
                <React.Suspense fallback={<></>}>
                  <Switch>
                    <Route path={ERouterLink.Pizza} component={PizzaLazy} />
                    <Route path={ERouterLink.Drinks} component={ProductsLazy} />
                    <Route path={ERouterLink.Sides} component={ProductsLazy} />
                    <Route path={ERouterLink.Dessert} component={ProductsLazy} />
                    <Route path={ERouterLink.Checkout}>
                      <Checkout />
                    </Route>
                    <Route path={ERouterLink.Root} exact>
                      <Redirect to={ERouterLink.Pizza} />
                    </Route>
                  </Switch>
                </React.Suspense>
              </SkeletonTheme>
            </CartChecker>
          </CartProvider>
        </ExpandProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
