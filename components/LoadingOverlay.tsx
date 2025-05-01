import { Spinner, Box } from '@/components/ui';

interface LoadingOverlayProps {
  isUnder?: boolean;
}

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  return (
    <Box className={`absolute ${props.isUnder ? '' : 'z-50'} w-full h-full flex items-center justify-center bg-white dark:bg-black`}>
      <Spinner size="large" className='color-primary-500'/>
    </Box>
  );
};