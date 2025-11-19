import {
  GET_METHOD,
  PATCH_METHOD,
  POST_METHOD,
  PUT_METHOD,
} from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import {
  CHANGE_PASSWORD_PATH,
  CREATE_DELIVERY_ADDRESS_PATH,
  EDIT_PROFILE_PATH,
  GET_DELIVERY_ADDRESS_PATH,
} from '@/actions/user/user-api.constants';
import {
  IChangePassword,
  ICreateDeliveryAddress,
  IEditProfile,
  TDeliveryAddress,
} from '@/actions/user/user-api.types';

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

    getDeliveryAddress: build.query<
      INetworkSuccessResponse<TDeliveryAddress[]>,
      void
    >({
      query: () => ({
        url: GET_DELIVERY_ADDRESS_PATH,
        method: GET_METHOD,
      }),
    }),

    createDeliveryAddress: build.mutation<
      INetworkSuccessResponse<unknown>,
      ICreateDeliveryAddress
    >({
      query: (data) => ({
        url: CREATE_DELIVERY_ADDRESS_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useEditProfileMutation,
  useGetDeliveryAddressQuery,
  useCreateDeliveryAddressMutation,
} = UserApi;
