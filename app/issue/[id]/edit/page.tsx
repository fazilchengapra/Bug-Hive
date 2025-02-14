import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueEditPage = async ({ params: { id } }: Props) => {
    const statusId = parseInt(id)
    if(!statusId) notFound()
  const details = await prisma.issue.findUnique({
    where: {
      id: statusId,
    },
  });

  if (!details) notFound();
  return (
    <div>
      <IssueForm IssueDetails={details} />
    </div>
  );
};

export default IssueEditPage;
