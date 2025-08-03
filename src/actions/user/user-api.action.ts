import { PATCH_METHOD, PUT_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import {
  CHANGE_PASSWORD_PATH,
  EDIT_PROFILE_PATH,
} from '@/actions/user/user-api.constants';
import { IChangePassword, IEditProfile } from '@/actions/user/user-api.types';

const UserApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    changePassword: build.mutation<
      INetworkSuccessResponse<unknown>,
      IChangePassword
    >({
      query: (data) => ({
        url: CHANGE_PASSWORD_PATH,
        method: PATCH_METHOD,
        data,
      }),
    }),

    editProfile: build.mutation<INetworkSuccessResponse<unknown>, IEditProfile>(
      {
        query: (data) => ({
          url: EDIT_PROFILE_PATH,
          method: PUT_METHOD,
          data,
        }),
      },
    ),
  }),
});

export const { useChangePasswordMutation, useEditProfileMutation } = UserApi;
