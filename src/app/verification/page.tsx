import NotificationSection from '@/components/widgets/activationSection/NotificationSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Verification',
  description: 'User success registration page of shop on next 14',
};

export default function page() {
  return (
    <>
      <NotificationSection
        title="Registration success"
        text="Thank you for your registration. Please verify your email for
            activation."
      />
    </>
  );
}
