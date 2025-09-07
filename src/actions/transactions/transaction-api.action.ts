import { AuthenticatedTagTypes, GET_METHOD } from '@/actions/action.constants';
import { IPaginatedResponse } from '@/actions/action.types';
import { authenticated_global_api } from '@/actions/authenticated-api';
import { GET_TRANSACTIONS_PATH } from '@/actions/transactions/transaction-api.constants';
import { RTransaction } from '@/actions/transactions/transaction-api.types';

const TransactionApi = authenticated_global_api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTransactions: build.query<
      IPaginatedResponse<RTransaction>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: GET_TRANSACTIONS_PATH,
        method: GET_METHOD,
        params,
      }),
      providesTags: [AuthenticatedTagTypes.GET_ALL_TRANSACTIONS],
    }),
  }),
});

export const { useGetTransactionsQuery } = TransactionApi;
