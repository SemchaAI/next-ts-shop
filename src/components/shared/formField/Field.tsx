import type { IField } from '@/models/Inputs';
import { MainInput } from '../inputs/MainInput';

import css from './field.module.scss';

export default function Field({
  id,
  label,
  register,
  error,
  validation,
  myType,
}: IField) {
  return (
    <div className={css.field}>
      <div>
        <label
          className={css.label}
          htmlFor={id}
        >
          {label}:
        </label>
      </div>
      <MainInput
        id={id}
        error={error}
        myType={myType}
        {...register(id, validation)}
      />
    </div>
  );
}
