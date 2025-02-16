import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetailsPage from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const ViewIssue = async ({ params }: Props) => {
  const session =await getServerSession()
  
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
        {session && <Flex className="flex-col gap-y-2">
          <IssueEditButton issueId={details.id} />
          <IssueDeleteButton issueId={details.id} />
        </Flex>}
      </Box>
    </Grid>
  );
};

export default ViewIssue;
