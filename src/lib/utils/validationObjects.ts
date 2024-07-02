export const required = {
  required: {
    value: true,
    message: 'Obligatory field',
  },
};
export const Min5 = {
  minLength: {
    value: 5,
    message: 'Minimum length 5',
  },
};

export const emailValidation = {
  ...required,
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'Incorrect mail',
  },
};

export const ReqMin5Max20Validation = {
  ...required,
  ...Min5,
  maxLength: {
    value: 20,
    message: 'Maximal length 20',
  },
};

export type ValidationTypes =
  | typeof required
  | typeof Min5
  | typeof emailValidation
  | typeof ReqMin5Max20Validation;
