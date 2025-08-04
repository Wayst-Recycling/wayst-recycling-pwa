import { useFormik } from 'formik';
import { object, string } from 'yup';

import { useAppDispatch, useAppSelector } from '@/store';

import { useForgotPasswordConfirmMutation } from '@/actions/auth/auth-api.actions';
import { FORGOT_PASSWORD_REDUCER_PATH } from '@/slices/constants';
import {
  updateForgotPassword,
  updateForgotPasswordStage,
} from '@/slices/forgot-password.slice';
import { handleErrors } from '@/utils/error';

export const useForgotPasswordVerification = () => {
  const { forgotPasswordValues } = useAppSelector(
    (state) => state[FORGOT_PASSWORD_REDUCER_PATH],
  );
  const dispatch = useAppDispatch();
  const [forgotPasswordVerification, { isLoading }] =
    useForgotPasswordConfirmMutation();

  const formik = useFormik({
    initialValues: {
      email: forgotPasswordValues.email,
      token: '',
      dappUser: false,
    },
    validationSchema: object().shape({
      email: string()
        .email('Enter a valid email')
        .required('Email is required'),
      token: string().required('Token is required'),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPasswordVerification(values).unwrap();
        dispatch(
          updateForgotPassword({
            ...forgotPasswordValues,
            token: values.token,
          }),
        );
        dispatch(updateForgotPasswordStage('password'));
      } catch (err) {
        handleErrors(err);
      }
    },
  });

  function getSelectProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
      ...formik.getFieldHelpers(name),
    };
  }

  return {
    formik,
    getSelectProps,
    isLoading,
  };
};
