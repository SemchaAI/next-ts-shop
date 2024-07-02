'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import type { IFieldMockUp } from '@/models/Inputs';
import type { LoginRequest } from '@/models/user';

import MainLink from '@/components/shared/links/MainLink';
import MainBtn from '@/components/shared/buttons/MainBtn';
import Field from '@/components/shared/formField/Field';

import css from './form.module.scss';

import {
  ReqMin5Max20Validation,
  emailValidation,
} from '@/lib/utils/validationObjects';
import { useLoginMutation } from '@/services/userApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
];

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const [login, { isSuccess }] = useLoginMutation();
  const router = useRouter();

  const submitHandler: SubmitHandler<LoginRequest> = async (data) => {
    console.log('formData', data);
    await login(data);
    localStorage.setItem('isLogout', 'false');
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  return (
    <div className={css.loginForm}>
      <form
        className={css.loginForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        {fields.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            label={field.label}
            myType={field.myType}
            register={register}
            error={errors[field.id as keyof LoginRequest]}
            validation={field.validation}
          />
        ))}
        <div className={css.formControls}>
          <div className={css.linkBlock}>
            Don`t have an account?
            <MainLink to="/registration">Register</MainLink>
          </div>
          <MainBtn
            version="contain"
            type="submit"
            disabled={!isValid}
          >
            Sign In
          </MainBtn>
        </div>
      </form>
    </div>
  );
}
