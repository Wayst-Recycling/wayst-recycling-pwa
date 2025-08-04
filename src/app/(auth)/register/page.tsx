'use client';
import React from 'react';

import { useAppSelector } from '@/store';

import RegisterBioForm from '@/app/(auth)/register/_components/register-bio-form';
import RegisterEmailForm from '@/app/(auth)/register/_components/register-email-form';
import RegisterTokenPage from '@/app/(auth)/register/_components/register-token-page';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';

const RegisterPage = () => {
  const { stage } = useAppSelector((state) => state[REGISTER_REDUCER_PATH]);

  // const dispatch = useAppDispatch();

  // const searchParams = useSearchParams();

  // const tokenRaw = searchParams.get('token');
  // const token = tokenRaw?.replace(/ /g, '+');

  // const encryptionKey = process.env.NEXT_PUBLIC_TOKEN_ENCRYPTION_KEY;

  // const router = useRouter();
  // useEffect(() => {
  //   const getDecrypted = async () => {
  //     if (!token || !encryptionKey) {
  //       toast.error('Token or encryption key is missing.');
  //       return;
  //     }

  //     dispatch(updateRegisterStage('verification'));

  //     try {
  //       const res = await decryptToken({
  //         encryptedBase64: token,
  //         key: encryptionKey,
  //       });
  //       const obj: { token: string; email: string } = JSON.parse(res);
  //       dispatch(updateRegisterValues({ [REGISTER_EMAIL_KEY]: obj.email }));
  //       try {
  //         await verifyEmail({
  //           dappUser: false,
  //           email: obj.email,
  //           token: obj.token,
  //         }).unwrap();
  //         toast.success('Account verified');
  //         dispatch(resetRegisterSlice());
  //         router.replace(appRoutes.auth.login);
  //       } catch (err) {
  //         handleErrors(err);
  //       }
  //     } catch {
  //       toast.error('Failed to decrypt token:');
  //     }
  //   };

  //   getDecrypted();
  // }, []);

  return (
    <>
      {stage === 'email' && <RegisterEmailForm />}
      {stage === 'bio' && <RegisterBioForm />}
      {stage === 'verification' && <RegisterTokenPage />}
    </>
  );
};

export default RegisterPage;
