import RegistrationSection from '@/components/widgets/logSection/RegistrationSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Registration',
  description: 'User registration page of shop on next 14',
};

export default function page() {
  return (
    <>
      <RegistrationSection />
    </>
  );
}
