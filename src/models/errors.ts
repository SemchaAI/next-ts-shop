export interface IError {
  message: string;
  critical: boolean;
  statusCode: number;
  id: number;
}

export interface IServerError extends Pick<IError, 'statusCode' | 'message'> {
  errors: [];
}

export interface IErrors {
  errors: IError[];
}
export interface IErrorResponse {
  message: string;
  errors: [];
}

export interface IErrorState extends IErrors {
  lastAI: number;
  timeout: number;
}
export type TError = Omit<IError, 'id'>;
