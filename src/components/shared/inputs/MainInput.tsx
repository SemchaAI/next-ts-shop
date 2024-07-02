import { Ref, forwardRef } from 'react';
import css from './mainInput.module.scss';
import { MainInputProps } from '@/models/Inputs';

export const MainInput = forwardRef(
  (
    { error = null, myType = 'text', ...props }: MainInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputClass = `${css[myType]} ${
      error && error !== 'never' && css.inputError
    }`;

    return (
      <div>
        <input
          className={inputClass}
          ref={ref}
          id={props.id}
          type={myType}
          {...props}
        />
        {error !== 'never' && (
          <div className={css.error}>
            {error?.message}
            {/* {ErrorMessage()} */}
          </div>
        )}
      </div>
    );
  }
);
MainInput.displayName = 'MainInput';
