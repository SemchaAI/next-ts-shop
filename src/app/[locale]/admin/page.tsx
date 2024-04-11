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
  );
}
