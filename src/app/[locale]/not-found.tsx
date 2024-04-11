import MainLink from '@/components/links/MainLink';

export default function NotFound() {
  return (
    <section className="errorPage">
      <h1 className="errorTitle">E404 | Not Found</h1>
      <MainLink to="/">Go Home</MainLink>
    </section>
  );
}
