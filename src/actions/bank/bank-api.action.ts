import {
  AuthenticatedTagTypes,
  GET_METHOD,
  POST_METHOD,
} from '@/actions/action.constants';
import { INetworkSuccessResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import {
  GET_BANKS_PATH,
  VERIFY_BANK_ACCOUNT_PATH,
  WITHDRAW_PATH,
} from '@/actions/bank/bank-api.constants';
import { TBank } from '@/actions/bank/bank-api.types';

const BankApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getBanks: build.query<INetworkSuccessResponse<TBank[]>, void>({
      query: () => ({
        url: GET_BANKS_PATH,
        method: GET_METHOD,
      }),
    }),

    verifyBankAccount: build.mutation<
      INetworkSuccessResponse<{ accountName: string; accountNumber: string }>,
      {
        accountNumber: string;
        bankCode: string;
      }
    >({
      query: (data) => ({
        url: VERIFY_BANK_ACCOUNT_PATH,
        method: POST_METHOD,
        data,
      }),
    }),

    withdraw: build.mutation<
      INetworkSuccessResponse<unknown>,
      {
        accountNumber: string;
        bankCode: string;
        amount: number;
      }
    >({
      query: (data) => ({
        url: WITHDRAW_PATH,
        method: POST_METHOD,
        data,
      }),
      invalidatesTags: [AuthenticatedTagTypes.GET_ALL_TRANSACTIONS],
    }),
  }),
});

export const {
  useGetBanksQuery,
  useVerifyBankAccountMutation,
  useWithdrawMutation,
} = BankApi;
