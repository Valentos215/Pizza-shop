import pizzaLogo from 'assets/Pizza.svg';
import drinksLogo from 'assets/Drinks.svg';
import sidesLogo from 'assets/Sides.svg';
import dessertLogo from 'assets/Dessert.svg';

export const NAV_MENU = [
  { title: 'Pizza', link: 'pizza', logo: pizzaLogo },
  { title: 'Drinks', link: 'drinks', logo: drinksLogo },
  { title: 'Sides', link: 'sides', logo: sidesLogo },
  { title: 'Dessert', link: 'dessert', logo: dessertLogo },
];

export const ERROR_MES = {
  NameLong: 'Name is to long',
  NameShort: 'Name is to short',
  NameRequired: 'Name is required',
  NameValid: 'Please use only latin letters',
  EmailLength: 'E-mail is to long',
  EmailRequired: 'E-mail is required',
  EmailIncorrect: 'Incorrect email',
  PhoneRequired: 'Phone number is required',
};

export const NAME_VALIDATION = /^[A-Za-z]+$/;

export enum ERouterLink {
  Root = '/',
  Pizza = '/pizza',
  Drinks = '/drinks',
  Sides = '/sides',
  Dessert = '/dessert',
  Checkout = '/checkout',
}

export const PIZZA_SIZES = ['Standard size', 'Large', 'New Yorker'];

export const PIZZA_CRUSTS = ['Standard crust', 'Thin', 'Philadelphia', 'Hot-Dog Crust'];

export const PIZZA_WEIGHT = [550, 760, 810];

export const PIZZA_SIZE_RATE = [1, 1.18, 1.32];

export const PIZZA_CRUST_RATE = [1, 1, 1.18, 1.32];
