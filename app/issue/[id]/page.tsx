import { prisma } from "@/prisma/client";
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
      <p>{details?.title}</p>
      <p>{details?.description}</p>
      <p>{details?.status}</p>
      <p>{details?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetials;
