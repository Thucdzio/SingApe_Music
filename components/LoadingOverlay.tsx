import { Spinner, Box } from '@/components/ui';

export const LoadingOverlay = () => {
  return (
    <Box className="absolute z-50 w-full h-full flex items-center justify-center bg-white dark:bg-black">
      <Spinner size="large" className='color-primary-500'/>
    </Box>
  );
};