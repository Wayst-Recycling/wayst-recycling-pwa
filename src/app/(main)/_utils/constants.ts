export const ACTIVE_CURRENCY_KEY = 'active_currency' as const;

export const currencies = [
  {
    id: 1,
    img: '/images/cusd.png',
    title: 'cUSD',
    description: 'Celo Dollar',
    index: true,
  },

  {
    id: 2,
    img: '/images/ngn.png',
    title: 'NGN',
    description: 'Nigerian Naira',
    index: false,
    exchange: 'nairaToCusd',
  },
];
