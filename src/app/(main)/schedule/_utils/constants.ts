import { object, string } from 'yup';

import { MaterialCategory } from '@/app/(main)/schedule/_@types';

export const SCHEDULE_MATERIAL_AMOUNT_KEY = 'materialAmount' as const;
export const SCHEDULE_ADDRESS_KEY = 'address' as const;
export const SCHEDULE_CONTAINER_AMOUNT_KEY = 'containerAmount' as const;
export const SCHEDULE_CITY_KEY = 'city' as const;
export const SCHEDULE_MATERIAL_KEY = 'material' as const;
export const SCHEDULE_CATEGORY_KEY = 'category' as const;
export const SCHEDULE_REGION_KEY = 'region' as const;

export const scheduleInitialValues = {
  [SCHEDULE_MATERIAL_AMOUNT_KEY]: '',
  [SCHEDULE_ADDRESS_KEY]: '',
  [SCHEDULE_CONTAINER_AMOUNT_KEY]: '',
  [SCHEDULE_CITY_KEY]: '',
  [SCHEDULE_MATERIAL_KEY]: '',
  [SCHEDULE_CATEGORY_KEY]: '',
  [SCHEDULE_REGION_KEY]: '',
};

export const scheduleValidationSchema = object().shape({
  [SCHEDULE_MATERIAL_KEY]: string().required('Kindly select a material'),
  [SCHEDULE_CONTAINER_AMOUNT_KEY]: string()
    .required('Number of bags is required')
    .test(
      'Check if number is valid',
      'Please provide a valid number',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 1) {
          return context.createError({
            message: 'Container amount must be at least 1',
          });
        }

        if (amount > 50) {
          return context.createError({
            message: 'Container amount cannot exceed 50',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      },
    ),
  [SCHEDULE_MATERIAL_AMOUNT_KEY]: string()
    .required('Number of plastics is required')
    .test(
      'Check if number is valid',
      'Please provide a valid number',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (!cleanAmount.length) {
          return context.createError();
        }

        const amount = parseInt(cleanAmount, 10);

        if (amount < 50) {
          return context.createError({
            message: 'Material amount must be at least 50',
          });
        }

        if (amount > 10000) {
          return context.createError({
            message: 'Material amount cannot exceed 10,000',
          });
        }

        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      },
    ),
  [SCHEDULE_ADDRESS_KEY]: string().required('Kindly input a valid address'),
  [SCHEDULE_REGION_KEY]: string().required('Kindly select a valid pickup date'),
  [SCHEDULE_CITY_KEY]: string().required(),
  [SCHEDULE_CATEGORY_KEY]: string().required(),
});

export const materials: MaterialCategory[] = [
  {
    label: 'Plastic',
    value: 'plastic',
    backgroundColor: '#FDF7DE',
    image: '/svg/plastic.svg',
    active: true,
  },
  {
    label: 'Paper',
    value: 'paper',
    backgroundColor: '#EEFAFF',
    image: '/svg/paper.svg',
    active: false,
  },
  {
    label: 'E-Waste',
    value: 'e-waste',
    backgroundColor: '#FFF1E3',
    image: '/svg/e-waste.svg',
    active: false,
  },
  {
    label: 'Organic',
    value: 'organic',
    backgroundColor: '#FFEBE9',
    image: '/svg/organic.svg',
    active: false,
  },
  {
    label: 'Metal',
    value: 'metal',
    backgroundColor: '#ECEAE9',
    image: '/svg/metal.svg',
    active: false,
  },
  {
    label: 'Glass',
    value: 'glass',
    backgroundColor: '#E5FFF3',
    image: '/svg/glass.svg',
    active: false,
  },
  {
    label: 'Mixed Waste',
    value: 'mixed',
    backgroundColor: '#C2FFF4',
    image: '/svg/mixed.svg',
    active: false,
  },
];
