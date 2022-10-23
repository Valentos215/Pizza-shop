export const NAV_MENU = [
  { title: 'Pizza', link: 'pizza' },
  { title: 'Drinks', link: 'drinks' },
  { title: 'Sides', link: 'sides' },
  { title: 'Dessert', link: 'dessert' },
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

// TODO: use enum instead array
// export enum PIZZA_SIZES {
//   Standard = 'Standard size',
//   Large = 'Large',
//   NewYorker = 'New Yorker',
// }

// TODO: use enum instead array
// export enum PIZZA_WEIGHT {
//   Standard = 500,
//   Large = 760,
//   NewYorker = 810,
// }

export const PIZZA_CRUSTS = ['Standard crust', 'Thin', 'Philadelphia', 'Hot-Dog Crust'];

export const PIZZA_WEIGHT = [550, 760, 810];
