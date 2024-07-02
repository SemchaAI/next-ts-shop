import LogInSection from '@/components/widgets/logSection/LoginSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Login',
  description: 'User login page of shop on next 14',
};

export default function page() {
  return (
    <>
      <LogInSection />
    </>
  );
}
