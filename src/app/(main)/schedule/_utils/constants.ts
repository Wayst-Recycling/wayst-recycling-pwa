import { object, string } from 'yup';

import { MaterialCategory } from '@/app/(main)/schedule/_@types';

export const SCHEDULE_MATERIAL_AMOUNT_KEY = 'materialAmount' as const;
export const SCHEDULE_PICKUP_ADDRESS_KEY = 'pickupAddress' as const;
export const SCHEDULE_CONTAINER_AMOUNT_KEY = 'containerAmount' as const;
export const SCHEDULE_DROPOFF_ADDRESS_KEY = 'dropoffAddress' as const;
export const SCHEDULE_MATERIAL_KEY = 'material' as const;
export const SCHEDULE_CATEGORY_KEY = 'category' as const;

export const scheduleInitialValues = {
  [SCHEDULE_MATERIAL_AMOUNT_KEY]: '',
  [SCHEDULE_CONTAINER_AMOUNT_KEY]: '',
  [SCHEDULE_MATERIAL_KEY]: '',
  [SCHEDULE_CATEGORY_KEY]: '',
  [SCHEDULE_PICKUP_ADDRESS_KEY]: '',
  [SCHEDULE_DROPOFF_ADDRESS_KEY]: '',
};

export const scheduleValidationSchema = object().shape({
  [SCHEDULE_MATERIAL_KEY]: string().required('Kindly select a material'),
  [SCHEDULE_CONTAINER_AMOUNT_KEY]: string().required(
    'Number of bags is required',
  ),
  [SCHEDULE_MATERIAL_AMOUNT_KEY]: string().required(
    'Number of plastics is required',
  ),
  [SCHEDULE_PICKUP_ADDRESS_KEY]: string().when(SCHEDULE_CATEGORY_KEY, {
    is: (val: string) => val === 'pickup',
    then: (schema) => schema.required('Kindly select a valid pickup address'),
    otherwise: (schema) => schema.notRequired(),
  }),
  [SCHEDULE_DROPOFF_ADDRESS_KEY]: string().when(SCHEDULE_CATEGORY_KEY, {
    is: (val: string) => val === 'dropoff',
    then: (schema) => schema.required('Kindly select a valid dropoff address'),
    otherwise: (schema) => schema.notRequired(),
  }),
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
