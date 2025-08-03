import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { object, string } from 'yup';

import { useEditProfileMutation } from '@/actions/user/user-api.action';
import {
  EDIT_PROFILE_DIAL_CODE_KEY,
  EDIT_PROFILE_PHONE_KEY,
} from '@/actions/user/user-api.constants';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

export const useUpdatePhone = () => {
  const { data: sessionData } = useSession();

  const [updateProfile, { isLoading: isLoadingEditProfile }] =
    useEditProfileMutation();
  const session = useSession();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      [EDIT_PROFILE_DIAL_CODE_KEY]: sessionData?.user.dialCode || '',
      [EDIT_PROFILE_PHONE_KEY]: sessionData?.user.phone || '',
    },
    validationSchema: object().shape({
      [EDIT_PROFILE_DIAL_CODE_KEY]: string().required('Required'),
      [EDIT_PROFILE_PHONE_KEY]: string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateProfile({
          [EDIT_PROFILE_DIAL_CODE_KEY]: values[EDIT_PROFILE_DIAL_CODE_KEY],
          [EDIT_PROFILE_PHONE_KEY]: values[EDIT_PROFILE_PHONE_KEY],
        }).unwrap();
        const newSession = {
          ...session.data,
          user: {
            ...session.data?.user,
            dialCode: values[EDIT_PROFILE_DIAL_CODE_KEY],
            phone: values[EDIT_PROFILE_PHONE_KEY],
          },
        };
        await session.update(newSession);
        toast.success('Phone Number Updated');
        router.replace(appRoutes.home);
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
    isLoadingEditProfile,
  };
};
