import MainLink from '@/components/shared/links/MainLink';
import css from './adminSection.module.scss';
const mockupData = [
  {
    to: '/admin/add-type',
    text: 'Add type',
  },
  {
    to: '/admin/add-product',
    text: 'Add product',
  },
];
export default function AdminSection() {
  return (
    <section className={css.section}>
      <div className="wrapper">
        <div className={css.sectionContainer}>
          <h1 className={css.sectionTitle}>Admin panel</h1>
          <ul className={css.sectionList}>
            {mockupData.map((item) => (
              <li
                className={css.sectionItem}
                key={item.to}
              >
                <MainLink
                  mode="button"
                  version="contain"
                  to={item.to}
                >
                  {item.text}
                </MainLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
