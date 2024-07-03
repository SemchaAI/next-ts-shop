import LoadingSpinner from '@/components/shared/loading/LoadingSpinner';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
