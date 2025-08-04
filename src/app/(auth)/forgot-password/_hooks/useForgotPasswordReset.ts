import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, string } from 'yup';

import { useAppDispatch, useAppSelector } from '@/store';

import { useResetPasswordMutation } from '@/actions/auth/auth-api.actions';
import { FORGOT_PASSWORD_REDUCER_PATH } from '@/slices/constants';
import { resetForgotPasswordState } from '@/slices/forgot-password.slice';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

export const useForgotPasswordReset = () => {
  const { forgotPasswordValues } = useAppSelector(
    (state) => state[FORGOT_PASSWORD_REDUCER_PATH],
  );
  const dispatch = useAppDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: forgotPasswordValues.email,
      token: forgotPasswordValues.token,
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: object().shape({
      email: string()
        .email('Enter a valid email')
        .required('Email is required'),
      token: string().required('Token is required'),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({
          email: values.email,
          token: values.token,
          newPassword: values.newPassword,
        }).unwrap();
        dispatch(resetForgotPasswordState());
        router.push(appRoutes.auth.login);
      } catch (err) {
        handleErrors(err);
      }
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
    isLoading,
  };
};
