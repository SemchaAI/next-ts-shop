import RegisterForm from '@/components/features/forms/userForms/RegisterForm';

import css from './logSection.module.scss';

export default function RegistrationSection() {
  return (
    <section className={css.section}>
      <div className="wrapper">
        <div className={css.sectionContainer}>
          <h1 className={css.sectionTitle}>Registration</h1>
          <div className={css.formContainer}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
