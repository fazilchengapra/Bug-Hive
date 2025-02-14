import { Skeleton } from "../../components";
import { Box } from "@radix-ui/themes";

const NewIssueLoadingPage = () => {
  return (
    <div>
      <Box className="max-w-lg">
        <Skeleton />
        <Skeleton className="mt-3 h-2rem" />
        <Skeleton />
      </Box>
    </div>
  );
};

export default NewIssueLoadingPage;
