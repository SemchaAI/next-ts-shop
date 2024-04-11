'use client';
import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

import css from './customSelect.module.scss';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

interface IProps {
  defaultValue: string;
  placeHolder?: string;
  options: { value: string; label: string }[];
}

export default function CustomSelect({ options, defaultValue }: IProps) {
  const controls = useAnimationControls();
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue
  );
  const inputRef = useRef(null); // Reference to the custom select input element

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  const handleInputClick = () => {
    setShowMenu((prev) => !prev);

    //animation
    controls.start({ rotate: showMenu ? 0 : 180 });
  };
  const onItemClick = (option: { value: string; label: string }) => {
    let newValue = option.value;

    if (option.label !== selectedValue) {
      //animation
      controls.start({ rotate: 0 });

      setSelectedValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={css.customSelectContainer}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={css.inputClick}
      >
        <div className={css.defaultValue}>{defaultValue}</div>
        <motion.div
          key="chevronDown"
          animate={controls}
          className={css.iconContainer}
        >
          <ChevronDown className={css.icon} />
        </motion.div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <div className={css.menu}>
            {options.map((option) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`${css.menuItem} ${selectedValue === option.label && css.selected}`}
              >
                {option.label}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
