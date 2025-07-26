import { GET_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import { GET_CONFIGURATION_PATH } from '@/actions/configuration/configuration-api.constants';
import { RConfiguration } from '@/actions/configuration/configuration-api.types';

const ConfigurationApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getConfiguration: build.query<
      INetworkSuccessResponse<RConfiguration[]>,
      void
    >({
      query: () => ({
        url: GET_CONFIGURATION_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const { useGetConfigurationQuery } = ConfigurationApi;
