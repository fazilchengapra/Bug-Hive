import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueEditPage = async ({ params }: Props) => {
  const {id}= await params
  const statusId = parseInt(id);
  if (!statusId) notFound();
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

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).id),
    },
  });

  return {
    title: "Edit - " + issue?.title,
    description: "Viewing a issue",
  };
}
