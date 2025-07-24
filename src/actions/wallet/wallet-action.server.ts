import { GET_METHOD } from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import { GET_WALLET_PATH } from '@/actions/wallet/wallet-constants.server';
import { RWallet } from '@/actions/wallet/wallet-types.server';

const WalletAction = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getWallet: build.query<INetworkSuccessResponse<RWallet>, void>({
      query: () => ({
        url: GET_WALLET_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const { useGetWalletQuery } = WalletAction;
