import { POST_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import {
  FORGOT_PASSWORD_CONFIRM_PATH,
  FORGOT_PASSWORD_PATH,
  REGISTER_PATH,
  RESEND_FORGOT_PASSWORD_LINK_PATH,
  RESEND_VERIFICATION_LINK_PATH,
  RESET_PASSWORD_PATH,
  VERIFY_REGISTRATION_EMAIL_PATH,
} from '@/actions/auth/auth-api.constants';
import { RegisterUserInput } from '@/actions/auth/auth-api.types';
import { unauthenticated_global_api } from '@/actions/unauthenticated-api';

const AuthApi = unauthenticated_global_api.injectEndpoints({
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

    forgotPassword: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string }
    >({
      query: (payload) => ({
        url: FORGOT_PASSWORD_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    forgotPasswordConfirm: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string }
    >({
      query: (payload) => ({
        url: FORGOT_PASSWORD_CONFIRM_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    resendForgotPassword: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string }
    >({
      query: (payload) => ({
        url: RESEND_FORGOT_PASSWORD_LINK_PATH,
        method: POST_METHOD,
        data: payload,
      }),
    }),

    resetPassword: build.mutation<
      INetworkSuccessResponse<unknown>,
      { email: string; token: string; newPassword: string }
    >({
      query: (payload) => ({
        url: RESET_PASSWORD_PATH,
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
  useForgotPasswordMutation,
  useForgotPasswordConfirmMutation,
  useResendForgotPasswordMutation,
  useResetPasswordMutation,
} = AuthApi;
