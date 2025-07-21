import { useFormik } from 'formik';
import { object, string } from 'yup';

import { useAppDispatch, useAppSelector } from '@/store';

import { REGISTER_EMAIL_KEY } from '@/actions/auth/auth-constants.server';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';
import {
  updateRegisterStage,
  updateRegisterValues,
} from '@/slices/register.slice';

export const useRegisterEmailForm = () => {
  const dispatch = useAppDispatch();

  const { registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );

  const formik = useFormik({
    initialValues: {
      [REGISTER_EMAIL_KEY]: registerValues[REGISTER_EMAIL_KEY] || '',
    },
    validationSchema: object().shape({
      [REGISTER_EMAIL_KEY]: string()
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      dispatch(
        updateRegisterValues({
          ...registerValues,
          [REGISTER_EMAIL_KEY]: values[REGISTER_EMAIL_KEY],
        }),
      );
      dispatch(updateRegisterStage('bio'));
    },
  });

  function getInputProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
    };
  }

  return {
    formik,
    getInputProps,
  };
};
