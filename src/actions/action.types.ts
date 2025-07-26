export type INetworkErrorResponse = {
  statusCode: number;
  errorMessage: string;
};

export type INetworkSuccessResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type IPaginatedResponse<T> = {
  data: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    data: T[];
  };
};
