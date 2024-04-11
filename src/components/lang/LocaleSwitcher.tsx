import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/i18n';
import LocaleSwitcherSelect from './LocaleSwitcherSelect(deprecated)';
import CustomSelect from './CustomSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  let localeArray = locales.map((cur) => ({
    value: cur,
    label: t('locale', { locale: cur }),
  }));
  console.log('localeArray', localeArray);
  const ChangeHandler = (value: string) => {
    console.log('value', value);
  };
  return (
    // <LocaleSwitcherSelect defaultValue={locale}>
    //   {locales.map((cur) => (
    //     <option
    //       key={cur}
    //       value={cur}
    //       disabled={cur === locale}
    //     >
    //       {t('locale', { locale: cur })}
    //     </option>
    //   ))}
    // </LocaleSwitcherSelect>
    <CustomSelect
      defaultValue={t('locale', { locale: locale })}
      options={localeArray}
    />
  );
}
