import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading className="mb-3">{details?.title}</Heading>
        <Flex gapX="3">
          <IssueStatusBadge status={details.status} />
          <p>{details?.createdAt.toDateString()}</p>
        </Flex>
        <Card mt="2" className="max-w-prose">
          {details?.description}
        </Card>
      </Box>
      <Box>
        <Link href={`${details.id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetials;
