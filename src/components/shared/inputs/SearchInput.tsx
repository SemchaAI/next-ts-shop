'use client';
import { useAppDispatch } from '@/lib/utils/hooks';
import EyeIcon from '../icons/EyeIcon';
import css from './searchInput.module.scss';
import { setTitle } from '@/stores/product.slice';

export default function SearchInput() {
  const dispatch = useAppDispatch();

  let filterTimeout: ReturnType<typeof setTimeout>;
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);
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
        placeholder="Search"
        aria-label="Search"
      />
      <EyeIcon className={css.icon} />
    </div>
  );
}
