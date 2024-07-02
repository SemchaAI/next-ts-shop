import LoginForm from '@/components/features/forms/userForms/LoginForm';
import css from './logSection.module.scss';

export default function LogInSection() {
  return (
    <section className={css.section}>
      <div className="wrapper">
        <div className={css.sectionContainer}>
          <h1 className={css.sectionTitle}>Log In</h1>
          <div className={css.formContainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
