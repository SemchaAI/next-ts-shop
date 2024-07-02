<<<<<<< Updated upstream
import AdminPanel from '@/components/widgets/adminPanel/AdminPanel';
import css from './adminPage.module.scss';

export default function AdminPage() {
  return (
    <section className={css.admin}>
      <div className="wrapper">
        <div className={css.adminContainer}>
          <h1 className={css.adminTitle}>Admin Panel</h1>
          <AdminPanel />
        </div>
      </div>
    </section>
=======
import AdminSection from '@/components/widgets/adminSection/AdminSection';
import React from 'react';

export default function page() {
  return (
    <>
      <AdminSection />
    </>
>>>>>>> Stashed changes
  );
}
