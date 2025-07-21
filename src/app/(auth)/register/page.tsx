/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from '@/actions/auth/auth-actions.server';
import { REGISTER_EMAIL_KEY } from '@/actions/auth/auth-constants.server';
import RegisterBioForm from '@/app/(auth)/register/_components/register-bio-form';
import RegisterEmailForm from '@/app/(auth)/register/_components/register-email-form';
import RegisterTokenPage from '@/app/(auth)/register/_components/register-token-page';
import { decryptToken } from '@/app/(auth)/register/_utils/decrypt';
import { REGISTER_REDUCER_PATH } from '@/slices/constants';
import {
  resetRegisterSlice,
  updateRegisterStage,
  updateRegisterValues,
} from '@/slices/register.slice';
import { handleErrors } from '@/utils/error';
import { appRoutes } from '@/utils/routes';

const RegisterPage = () => {
  const { stage, registerValues } = useAppSelector(
    (state) => state[REGISTER_REDUCER_PATH],
  );

  const dispatch = useAppDispatch();

  const [verifyEmail, { isLoading, isError, reset }] = useVerifyEmailMutation();
  const [resendVerificationLink, { isLoading: isLoadingVerificationLink }] =
    useResendOtpMutation();

  const searchParams = useSearchParams();

  const tokenRaw = searchParams.get('token');
  const token = tokenRaw?.replace(/ /g, '+');

  const encryptionKey = process.env.NEXT_PUBLIC_TOKEN_ENCRYPTION_KEY;

  const handleResend = async () => {
    try {
      await resendVerificationLink({
        email: registerValues[REGISTER_EMAIL_KEY],
      }).unwrap();
      toast.success('Link resent');
      reset();
      router.replace(appRoutes.auth.register);
    } catch (err) {
      handleErrors(err);
    }
  };

  const router = useRouter();
  useEffect(() => {
    const getDecrypted = async () => {
      if (!token || !encryptionKey) {
        toast.error('Token or encryption key is missing.');
        return;
      }

      dispatch(updateRegisterStage('verification'));

      try {
        const res = await decryptToken({
          encryptedBase64: token,
          key: encryptionKey,
        });
        const obj: { token: string; email: string } = JSON.parse(res);
        dispatch(updateRegisterValues({ [REGISTER_EMAIL_KEY]: obj.email }));
        try {
          await verifyEmail({
            dappUser: false,
            email: obj.email,
            token: obj.token,
          }).unwrap();
          toast.success('Account verified');
          dispatch(resetRegisterSlice());
          router.replace(appRoutes.auth.login);
        } catch (err) {
          handleErrors(err);
        }
      } catch {
        toast.error('Failed to decrypt token:');
      }
    };

    getDecrypted();
  }, []);

  return (
    <>
      {stage === 'email' && <RegisterEmailForm />}
      {stage === 'bio' && <RegisterBioForm />}
      {stage === 'verification' && (
        <RegisterTokenPage
          isLoading={isLoading}
          isError={isError}
          handleResend={
            registerValues[REGISTER_EMAIL_KEY] ? handleResend : undefined
          }
          isLoadingResend={isLoadingVerificationLink}
        />
      )}
    </>
  );
};

export default RegisterPage;
