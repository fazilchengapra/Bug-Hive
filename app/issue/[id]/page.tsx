import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetailsPage from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";

interface Props {
  params: { id: string };
}

const ViewIssue = async ({ params }: Props) => {
  const { id } = await params;

  const details = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!details) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetailsPage issueDetails={details} />
      </Box>
      <Box>
        <Flex className="flex-col gap-y-2">
          <IssueEditButton issueId={details.id} />
          <IssueDeleteButton issueId={details.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default ViewIssue;
