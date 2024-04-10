import LoadingSpinner from '@/components/indicators/LoadingSpinner';

interface IProps {
  variant: 'error' | 'loading';
  errorMessage?: string;
}

export default function ProductInfoSkeleton({ variant, errorMessage }: IProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      {variant === 'loading' && (
        <>
          <div>Loading... Please wait</div>
          <div style={{ width: '80px' }}>
            <LoadingSpinner />
          </div>
        </>
      )}
      {variant === 'error' && <div>Error - {errorMessage}</div>}
    </div>
  );
}
