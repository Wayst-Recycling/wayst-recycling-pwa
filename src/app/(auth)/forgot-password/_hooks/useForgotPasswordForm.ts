import { useFormik } from 'formik';
import { object, string } from 'yup';

import { useAppDispatch } from '@/store';

import { useForgotPasswordMutation } from '@/actions/auth/auth-api.actions';
import {
  updateForgotPassword,
  updateForgotPasswordStage,
} from '@/slices/forgot-password.slice';
import { handleErrors } from '@/utils/error';

export const useForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: object().shape({
      email: string()
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPassword(values).unwrap();
        dispatch(updateForgotPassword({ email: values.email }));
        dispatch(updateForgotPasswordStage('confirmation'));
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
