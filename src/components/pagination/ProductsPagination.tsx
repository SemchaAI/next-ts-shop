import ChevronLeft from '../icons/ChevronLeft';
import css from './productsPagination.module.scss';
import ChevronRight from '../icons/ChevronRight';
import { setPage } from '@/stores/product.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

enum EPageVariant {
  DEFAULT = 'default',
  FIRST = 'first',
  MIDDLE = 'middle',
  LAST = 'last',
}
export default function ProductsPagination() {
  const dispatch = useAppDispatch();
  const { page, total } = useAppSelector((state) => state.product);

  const pages = [];
  let pageVariant: EPageVariant = EPageVariant.DEFAULT;

  // shit logic for pagination,
  //mb version need to be send from backend
  if (page > 4 && page < total - 2) {
    console.log('MIDDLE');
    pageVariant = EPageVariant.MIDDLE;
    for (let i = page - 3; i < page + 2; i++) {
      pages.push(i);
    }
    console.log('pages', pages);
  } else if (page > 4 && page >= total - 2) {
    console.log('LAST');
    pageVariant = EPageVariant.LAST;
    for (let i = page - 4; i < total - 1; i++) {
      pages.push(i);
    }
  } else if (total < 8) {
    console.log('DEFAULT');
    pageVariant = EPageVariant.DEFAULT;
    for (let i = 1; i < total - 1; i++) {
      pageVariant = EPageVariant.DEFAULT;
      pages.push(i);
    }
  } else {
    console.log('FIRST');
    for (let i = 1; i < 5; i++) {
      pageVariant = EPageVariant.FIRST;
      pages.push(i);
    }
  }
  const toPage = (i: number) => {
    if (page <= total && page > 0) {
      dispatch(setPage(i));
    }
  };
  const nextPage = () => {
    if (total > page) {
      console.log('nexPage', page + 1);
      dispatch(setPage(page + 1));
    }
  };
  const prevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };
  return (
    <div className={css.paginationContainer}>
      <button
        onClick={() => prevPage()}
        className={css.paginationListBtn}
      >
        <ChevronLeft />
      </button>
      <ul className={css.paginationList}>
        <li>
          <button
            onClick={() => toPage(1)}
            className={`${css.paginationListBtn} ${
              page === 1 ? css.active : ''
            }`}
          >
            1
          </button>
        </li>
        {(pageVariant === EPageVariant.MIDDLE ||
          pageVariant === EPageVariant.LAST) && (
          <div style={{ margin: '0 5px' }}>...</div>
        )}
        {pages.map((item, i) => (
          <li key={item}>
            <button
              onClick={() => toPage(item + 1)}
              className={`${css.paginationListBtn} ${
                page === item + 1 ? css.active : ''
              }`}
            >
              {item + 1}
            </button>
          </li>
        ))}
        {(pageVariant === EPageVariant.MIDDLE ||
          pageVariant === EPageVariant.FIRST) && (
          <div style={{ margin: '0 5px' }}>...</div>
        )}
        <li>
          <button
            onClick={() => toPage(total)}
            className={`${css.paginationListBtn} ${
              page === total ? css.active : ''
            }`}
          >
            {total}
          </button>
        </li>
      </ul>
      <button
        onClick={() => nextPage()}
        className={css.paginationListBtn}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
