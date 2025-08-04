export const appRoutes = {
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
  home: '/',
  schedule: {
    root: '/schedule',
    pickup: '/schedule/pickup',
    dropoff: '/schedule/dropoff',
  },
  history: '/history',
  settings: {
    root: '/settings',
    profile: {
      root: '/settings/profile',
      updatePhone: '/settings/profile/update-phone',
      changePassword: '/settings/profile/change-password',
    },
  },
  withdraw: '/withdraw',
};
