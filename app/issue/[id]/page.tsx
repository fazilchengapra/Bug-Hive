import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

import IssueEditButton from "./IssueEditButton";
import IssueDetailsPage from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <IssueDetailsPage issueDetails={details}/>
      </Box>
      <Box>
        <IssueEditButton issueId={details.id}/>
      </Box>
    </Grid>
  );
};

export default ViewIssue;
