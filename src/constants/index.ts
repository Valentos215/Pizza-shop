export const NAV_MENU = [
  { title: 'Pizza', link: 'pizza' },
  { title: 'Drinks', link: 'drinks' },
  { title: 'Sides', link: 'sides' },
  { title: 'Dessert', link: 'dessert' },
];

export const ERROR_MES = {
  nameLong: 'Name is to long',
  nameShort: 'Name is to short',
  nameRequired: 'Name is required',
  nameValid: 'Please use only latin letters',
  emailLength: 'E-mail is to long',
  emailRequired: 'E-mail is required',
  emailIncorrect: 'Incorrect email',
  phoneRequired: 'Phone number is required',
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
