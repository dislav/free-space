import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import Profile from './ru/Profile.json';
import PromotionForm from './ru/PromotionForm.json';
import OrderForm from './ru/OrderForm.json';

const resources = {
  ru: {
    Profile,
    PromotionForm,
    OrderForm,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  // debug: true,

  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
