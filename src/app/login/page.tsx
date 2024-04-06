import LoginForm from '@/components/forms/loginForm/LoginForm';
import css from './loginPage.module.scss';
export default function Login() {
  //  test error boundary by nextjs
  // throw new Error('test error');
  return (
    <section className={css.login}>
      <div className="wrapper">
        <LoginForm />
      </div>
    </section>
  );
}
