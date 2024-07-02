import NotificationSection from '@/components/widgets/activationSection/NotificationSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Activation',
  description: 'User activation page of shop on next 14',
};

export default function page() {
  return (
    <>
      <NotificationSection
        title="Activation success"
        text="Thank you for activation."
      />
    </>
  );
}
