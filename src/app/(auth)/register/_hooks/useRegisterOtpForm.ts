import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { object, string } from 'yup';

import { useAppDispatch, useAppSelector } from '@/store';

import { useVerifyEmailMutation } from '@/actions/auth/auth-api.actions';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';
import { resetRegisterSlice } from '@/slices/register.slice';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

export const useRegisterOtpForm = () => {
  const { registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );
  const [verifyEmail, { isLoading: isLoadingVerifyEmail }] =
    useVerifyEmailMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: registerValues.email,
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
        await verifyEmail(values).unwrap();
        toast.success('User Registered Successfully');
        dispatch(resetRegisterSlice());
        router.push(appRoutes.home);
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
    isLoadingVerifyEmail,
    getSelectProps,
  };
};
