import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  const in_progress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  return (
    <>
      <IssueChart closed={closed} open={open} in_progress={in_progress} />
    </>
  );
}
