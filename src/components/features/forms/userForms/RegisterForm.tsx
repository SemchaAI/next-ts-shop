'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import type { IFieldMockUp } from '@/models/Inputs';
import type { RegisterRequest } from '@/models/user';

import MainLink from '@/components/shared/links/MainLink';
import MainBtn from '@/components/shared/buttons/MainBtn';
import Field from '@/components/shared/formField/Field';

import css from './form.module.scss';
import {
  ReqMin5Max20Validation,
  emailValidation,
} from '@/lib/utils/validationObjects';
import { useRegisterMutation } from '@/services/userApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const fields: IFieldMockUp[] = [
  {
    id: 'email',
    label: 'Email',
    validation: emailValidation,
    myType: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    validation: ReqMin5Max20Validation,
    myType: 'password',
  },
  {
    id: 'name',
    label: 'Nickname',
    validation: ReqMin5Max20Validation,
    myType: 'text',
  },
];

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterRequest>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onBlur',
  });

  const [sendRegister, { isLoading, isSuccess }] = useRegisterMutation();
  const router = useRouter();

  const submitHandler: SubmitHandler<RegisterRequest> = async (data) => {
    console.log('formData', data);
    await sendRegister(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/verification');
    }
  }, [isSuccess, router]);

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(submitHandler)}
    >
      {fields.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          label={field.label}
          register={register}
          myType={field.myType}
          error={errors[field.id as keyof RegisterRequest]}
          validation={field.validation}
        />
      ))}
      <div className={css.formControls}>
        <div className={css.linkBlock}>
          Have an account?
          <MainLink to="/login">Login</MainLink>
        </div>
        <MainBtn
          version="contain"
          type="submit"
          disabled={!isValid}
        >
          Sign Up
        </MainBtn>
      </div>
    </form>
  );
}
