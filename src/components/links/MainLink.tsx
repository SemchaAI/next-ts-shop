import Link from 'next/link';
import css from './mainLink.module.scss';

export interface ILink {
  to: string;
  children?: React.ReactNode;
}

export default function MainLink({ to, children }: ILink) {
  const classes = `${css.link}`;
  return (
    <Link
      href={to}
      className={classes}
    >
      {children}
    </Link>
  );
}
