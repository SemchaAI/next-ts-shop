import css from './mainBtn.module.scss';
import { IBtn } from '@/models/mainBtn';
interface IBtnProps extends IBtn {
  children?: React.ReactNode;
}

export default function MainBtn({
  children,
  version = 'text',
  icon = false,
  type = 'button',
  disabled = false,
  label = 'кнопка',
  onClick,
}: IBtnProps) {
  const btnClass = `${css.button} ${css[version]} ${icon ? css.icon : ''}`;
  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}
