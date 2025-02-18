import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

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
      <Grid columns={{ initial: "1", md: "2" }} gap={'5'}>
        <Flex direction={"column"} gap={'5'}>
          <IssueSummary open={open} in_progress={in_progress} closed={closed} />
          <IssueChart open={open} in_progress={in_progress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}

export const metadata: Metadata ={
  title: "Bug-Hive - Dashboard",
  description: "View latest issue and analyze chart"
}
