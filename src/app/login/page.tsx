<<<<<<< Updated upstream
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
=======
import LogInSection from '@/components/widgets/logSection/LoginSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Login',
  description: 'User login page of shop on next 14',
};

export default function page() {
  return (
    <>
      <LogInSection />
    </>
>>>>>>> Stashed changes
  );
}
