import type { IErrors } from '@/models/errors';
import css from './errorNotification.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function ErrorNotification({ errors }: IErrors) {
  return (
    <div className={css.errorContainer}>
      <AnimatePresence>
        {/* only first five errors, and reverse for better animation effect */}
        {errors
          .slice(0, 5)
          .reverse()
          .map((error, index: number) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                key={index}
                className={css.errorComponent}
              >
                <div className="">
                  {error.message} : ErrorId-{error.id}
                </div>
                <div className="">Попробуйте обновить страницу</div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
