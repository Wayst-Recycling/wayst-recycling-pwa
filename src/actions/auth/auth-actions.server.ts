import { POST_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import {
  REGISTER_PATH,
  RESEND_VERIFICATION_LINK_PATH,
  VERIFY_REGISTRATION_EMAIL_PATH,
} from '@/actions/auth/auth-constants.server';
import { RegisterUserInput } from '@/actions/auth/auth-types.server';
import { unauthenticated_global_api } from '@/actions/unauthenticated-api';

const AuthAction = unauthenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    register: build.mutation<
      INetworkSuccessResponse<unknown>,
      RegisterUserInput
    >({
      query: (payload) => ({
        url: REGISTER_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    resendOtp: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string }
    >({
      query: (payload) => ({
        url: RESEND_VERIFICATION_LINK_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    verifyEmail: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string; token: string; dappUser: boolean }
    >({
      query: (payload) => ({
        url: VERIFY_REGISTRATION_EMAIL_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
} = AuthAction;
