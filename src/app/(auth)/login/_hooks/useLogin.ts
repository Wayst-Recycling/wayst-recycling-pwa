import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { object, string } from 'yup';

import {
  LOGIN_EMAIL_KEY,
  LOGIN_PASSWORD_KEY,
} from '@/actions/auth/auth-constants.server';
import { handleErrors } from '@/utils/error';

export const useLoginForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      [LOGIN_EMAIL_KEY]: '',
      [LOGIN_PASSWORD_KEY]: '',
    },
    validationSchema: object().shape({
      [LOGIN_EMAIL_KEY]: string()
        .email('Enter a valid email')
        .required('Email is required'),
      [LOGIN_PASSWORD_KEY]: string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const res = await signIn('login', { redirect: false, ...values });

        if ((!res || res.error) && res?.error !== 'undefined') {
          if (res?.error === 'CredentialsSignin') {
            // yes
            setIsLoading(false);

            toast.error('Invalid credentials. Please try again');
            return;
          }
          toast.error(res?.error || 'Something went wrong');
          setIsLoading(false);

          return;
        }
        // formik.resetForm();
        const callbackUrl = searchParams.get('callbackUrl');

        if (typeof callbackUrl === 'string') {
          return (
            window.location.reload(),
            router.replace(new URL(callbackUrl).toString())
          );
        }

        window.location.reload();

        router.replace('/');
      } catch (error) {
        setIsLoading(false);
        handleErrors(error);
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
