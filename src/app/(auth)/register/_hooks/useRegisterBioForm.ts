import { useFormik } from 'formik';
import { object, ref, string } from 'yup';

import { PASSWORD_REGEX } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/store';

import { useRegisterMutation } from '@/actions/auth/auth-actions.server';
import {
  REGISTER_DIAL_CODE_KEY,
  REGISTER_EMAIL_KEY,
  REGISTER_FIRST_NAME_KEY,
  REGISTER_LAST_NAME_KEY,
  REGISTER_PASSWORD_KEY,
  REGISTER_PHONE_KEY,
} from '@/actions/auth/auth-constants.server';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';
import {
  updateRegisterStage,
  updateRegisterValues,
} from '@/slices/register.slice';
import { handleErrors } from '@/utils/error';

export const useRegisterBioForm = () => {
  const dispatch = useAppDispatch();

  const { registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );

  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      [REGISTER_FIRST_NAME_KEY]: registerValues[REGISTER_FIRST_NAME_KEY] || '',
      [REGISTER_LAST_NAME_KEY]: registerValues[REGISTER_LAST_NAME_KEY] || '',
      [REGISTER_DIAL_CODE_KEY]: registerValues[REGISTER_DIAL_CODE_KEY] || '',
      [REGISTER_PHONE_KEY]: registerValues[REGISTER_PHONE_KEY] || '',
      [REGISTER_PASSWORD_KEY]: '',
      confirmPassword: '',
    },
    validationSchema: object().shape({
      [REGISTER_FIRST_NAME_KEY]: string().required('First name is required'),
      [REGISTER_LAST_NAME_KEY]: string().required('Last name is required'),
      [REGISTER_DIAL_CODE_KEY]: string().required('Dial code is required'),
      [REGISTER_PHONE_KEY]: string().required('Phone is required'),
      [REGISTER_PASSWORD_KEY]: string()
        .required('Password is required')
        .matches(
          PASSWORD_REGEX,
          'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        )
        .required(),
      confirmPassword: string()
        .oneOf([ref(REGISTER_PASSWORD_KEY)], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await register({
          [REGISTER_EMAIL_KEY]: registerValues[REGISTER_EMAIL_KEY],
          [REGISTER_FIRST_NAME_KEY]: values[REGISTER_FIRST_NAME_KEY],
          [REGISTER_LAST_NAME_KEY]: values[REGISTER_LAST_NAME_KEY],
          [REGISTER_DIAL_CODE_KEY]: values[REGISTER_DIAL_CODE_KEY],
          [REGISTER_PHONE_KEY]: values[REGISTER_PHONE_KEY],
          [REGISTER_PASSWORD_KEY]: values[REGISTER_PASSWORD_KEY],
        }).unwrap();
        dispatch(updateRegisterStage('verification'));
      } catch (err) {
        handleErrors(err);
      }
    },
  });

  const handleSave = () => {
    dispatch(updateRegisterValues({ ...registerValues, ...formik.values }));
  };

  function getInputProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
    };
  }

  function getSelectProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
      ...formik.getFieldHelpers(name),
    };
  }

  return {
    formik,
    getInputProps,
    handleSave,
    isLoading,
    getSelectProps,
  };
};
