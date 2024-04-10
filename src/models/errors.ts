export interface IError {
  message: string;
  critical: boolean;
  id: number;
}
export interface IServerError {
  message: string;
  errors: [];
}

export interface IErrors {
  errors: IError[];
}
export interface IRTKError {
  status: number;
  data: {
    message: string;
    errors: [];
  };
}

export interface IErrorState extends IErrors {
  lastAI: number;
  timeout: number;
}
export type TError = Omit<IError, 'id'>;
