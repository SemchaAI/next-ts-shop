'use client';
import EyeIcon from '../icons/EyeIcon';
import css from './searchInput.module.scss';
import { setTitle } from '@/stores/product.slice';
import { useAppDispatch } from '@/lib/hooks';

export default function SearchInput() {
  console.log('SearchInput');
  const dispatch = useAppDispatch();

  let filterTimeout: ReturnType<typeof setTimeout>;
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);
    console.log('here');
    filterTimeout = setTimeout(() => {
      const currValue =
        event.target.value !== null ? event.target.value : undefined;
      dispatch(setTitle(currValue));
    }, 500);
  };
  return (
    <div className={css.inputContainer}>
      <input
        className={css.input}
        onChange={changeHandler}
        type="text"
        placeholder="Поиск"
        aria-label="Поиск"
      />
      <EyeIcon className={css.icon} />
    </div>
  );
}
