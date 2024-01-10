export interface DefaultSuccessResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface DefaultErrorResponse {
  status: boolean;
  code: string;
  message: string;
  errors?: any[];
}

export interface CustomValidationError extends DefaultErrorResponse {
  errors: { field: string; messages: string[] }[];
}
