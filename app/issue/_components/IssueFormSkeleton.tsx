import {Skeleton} from '@/app/components'
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Skeleton className="mt-3 h-2rem" />
      <Skeleton />
    </Box>
  );
};

export default IssueFormSkeleton;
