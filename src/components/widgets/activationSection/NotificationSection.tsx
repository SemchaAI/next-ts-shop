import css from './notificationSection.module.scss';

interface INotificationSectionProps {
  title: string;
  text: string;
}
export default function NotificationSection({
  title,
  text,
}: INotificationSectionProps) {
  return (
    <section className={css.section}>
      <div className="wrapper">
        <div className={css.sectionContainer}>
          <h1 className={css.sectionTitle}>{title}</h1>
          <p className={css.sectionText}>{text}</p>
        </div>
      </div>
    </section>
  );
}
