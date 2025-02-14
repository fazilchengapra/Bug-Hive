import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetials = async ({ params }: Props) => {
  const { id } = await params;

  const details = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!details) notFound();

  return (
    <div>
      <Heading className="mb-3">{details?.title}</Heading>
      <Flex gapX="3">
        <IssueStatusBadge status={details.status} />
        <p>{details?.createdAt.toDateString()}</p>
      </Flex>
      <Card mt='2'>{details?.description}</Card>
    </div>
  );
};

export default IssueDetials;
