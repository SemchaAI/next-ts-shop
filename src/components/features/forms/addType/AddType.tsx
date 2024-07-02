'use client';
import css from './addType.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormType } from '@/models/forms';
import { useCreateTypeMutation } from '@/services/productApi';
import { ReqMin5Max20Validation } from '@/lib/utils/validationObjects';
import { MainInput } from '@/components/shared/inputs/MainInput';
import MainBtn from '@/components/shared/buttons/MainBtn';
import { useAppDispatch } from '@/lib/utils/hooks';

export default function AddType() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<IFormType>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });
  const [createType] = useCreateTypeMutation();

  const submitHandler: SubmitHandler<IFormType> = async (data) => {
    console.log('formData', data);
    if (data.name !== '') {
      try {
        await createType(data);
      } catch (e) {
        //there will be error slice push. add will be toast message
        console.log('error', e);
      }
    }
  };

  return (
    <section className={css.section}>
      <div className="wrapper">
        <div className={css.sectionContainer}>
          <h1 className={css.title}>Add type</h1>
          <form
            className={css.form}
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className={css.field}>
              <div>
                <label
                  className={css.label}
                  htmlFor="type"
                >
                  Product type:
                </label>
              </div>
              <MainInput
                {...register('name', ReqMin5Max20Validation)}
                error={errors.name}
                id="type"
              />
            </div>
            <div className={css.modalControls}>
              <MainBtn
                disabled={!isValid}
                type="submit"
                version="contain"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </MainBtn>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
