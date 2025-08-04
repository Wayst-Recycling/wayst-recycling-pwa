import { useFormik } from 'formik';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { object, ref, string } from 'yup';

import { PASSWORD_REGEX } from '@/lib/utils';

import { useChangePasswordMutation } from '@/actions/user/user-api.action';
import {
  CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY,
  CHANGE_PASSWORD_CURRENT_PASSWORD_KEY,
  CHANGE_PASSWORD_NEW_PASSWORD_KEY,
} from '@/actions/user/user-api.constants';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

export const useChangePassword = () => {
  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useChangePasswordMutation();
  const formik = useFormik({
    initialValues: {
      [CHANGE_PASSWORD_CURRENT_PASSWORD_KEY]: '',
      [CHANGE_PASSWORD_NEW_PASSWORD_KEY]: '',
      [CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY]: '',
    },
    validationSchema: object().shape({
      [CHANGE_PASSWORD_CURRENT_PASSWORD_KEY]: string().required('Required'),
      [CHANGE_PASSWORD_NEW_PASSWORD_KEY]: string()
        .required('Password is required')
        .matches(
          PASSWORD_REGEX,
          'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        )
        .required(),
      [CHANGE_PASSWORD_CONFIRM_PASSWORD_KEY]: string()
        .oneOf([ref(CHANGE_PASSWORD_NEW_PASSWORD_KEY)], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword({
          [CHANGE_PASSWORD_CURRENT_PASSWORD_KEY]:
            values[CHANGE_PASSWORD_CURRENT_PASSWORD_KEY],
          [CHANGE_PASSWORD_NEW_PASSWORD_KEY]:
            values[CHANGE_PASSWORD_NEW_PASSWORD_KEY],
        }).unwrap();
        toast.success('Password Changed');
        signOut({ callbackUrl: appRoutes.auth.login });
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
    isLoadingChangePassword,
  };
};
