import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetailsPage from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";
import { getServerSession } from "next-auth";
import AssignSelect from "./AssignSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({where:{id:issueId}}))

const ViewIssue = async ({ params }: Props) => {
  const session =await getServerSession()
  
  const { id } = await params;

  const details = await fetchIssue(parseInt(id))

  if (!details) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetailsPage issueDetails={details} />
      </Box>
      <Box>
        {session && <Flex className="flex-col gap-y-2">
          <AssignSelect issue={details}/>
          <IssueEditButton issueId={details.id} />
          <IssueDeleteButton issueId={details.id} />
        </Flex>}
      </Box>
    </Grid>
  );
};

export default ViewIssue;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id))

  return {
    title: "view " + issue?.title,
    description: "Viewing a issue",
  };
}
