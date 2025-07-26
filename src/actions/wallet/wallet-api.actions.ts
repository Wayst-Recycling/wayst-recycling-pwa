import { GET_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import {
  GET_TOTAL_EARNINGS_PATH,
  GET_WALLET_PATH,
} from '@/actions/wallet/wallet-api.constants';
import { RWallet } from '@/actions/wallet/wallet-api.types';

const WalletApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getWallet: build.query<INetworkSuccessResponse<RWallet>, void>({
      query: () => ({
        url: GET_WALLET_PATH,
        method: GET_METHOD,
      }),
    }),

    getTotalEarnings: build.query<number, void>({
      query: () => ({
        url: GET_TOTAL_EARNINGS_PATH,
        method: GET_METHOD,
      }),
      transformResponse: (res: INetworkSuccessResponse<{ total: number }>) =>
        res.data.total,
    }),
  }),
});

export const { useGetWalletQuery, useGetTotalEarningsQuery } = WalletApi;
