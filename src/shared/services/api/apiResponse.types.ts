




// Api error interface
export interface ApiError {
  message: string;
  code: string;
  status: number;
}
export type ApiResponse<T> = { data: T; error: null } | { data: null; error: ApiError };
