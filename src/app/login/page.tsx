import LoginForm from '@/components/forms/loginForm/LoginForm';
import css from './loginPage.module.scss';
export default function Login() {
  return (
    <section className={css.login}>
      <div className="wrapper">
        <LoginForm />
      </div>
    </section>
  );
}
