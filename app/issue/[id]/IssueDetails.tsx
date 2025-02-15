import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";

const IssueDetailsPage = ({issueDetails}:{issueDetails:Issue}) => {
  return (
    <div>
      <Heading className="mb-3">{issueDetails?.title}</Heading>
      <Flex gapX="3">
        <IssueStatusBadge status={issueDetails.status} />
        <p>{issueDetails?.createdAt.toDateString()}</p>
      </Flex>
      <Card mt="2" className="max-w-full">
        {issueDetails?.description}
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
