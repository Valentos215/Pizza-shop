# Pizzeria

This project was created to demonstrate my knowledge of React, Hooks and SASS

## Used tools and libraries

In this project I used Typescript, standard React Hooks, custom React Hooks (useFetch, useLocalStorage), AXIOS, Lazy loading, Formik, Yup, SASS, React-loading-skeleton, React-input-mask, Mockapi, Mapbox

## Improvements from the original Dominos ap

### Spa architecture

No need to wait for the next page to load. Items are added to the cart instantly.The interface does not make sudden movements during the transition to another page. Thanks to the skeleton, the application looks monolithic, without annoying the user with shifting content. Improved overall header and page formatting.

### Pizza page

Instead of useless and inconvenient sorting by categories, a pizza filter by ingredients has been added. The filter can be inverted and it either cuts out pizzas containing the specified ingredients, or displays pizzas with ingredients from the list. At the same time sorting by popularity or price is possible.

### Drinks, dessert, sides, page

Improved product item formatting to avoid visual offset between adjacent product buttons. The categories are placed in a button at the top of the page so that the user can quickly display products from the specified categories on a mobile device.

### Сart

Added the ability to quickly and conveniently remove unnecessary ingredients from pizzas. To create a full-fledged pizza constructor, I need access to ingredients databases in order to know the weight of the ingredients and the cost of each ingredient depending on the quantity. The cart instantly reacts to changes, since everything happens without the participation of the server. The content of the cart is saved after leaving the page.

### Checkout

Improved checkout page semantics. Added some animation and improved ways to interact with the form.
