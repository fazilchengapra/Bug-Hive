import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

export default async function Home() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/root`, {
    cache: "no-store",
  });
  const data = await response.json();
  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <Flex direction={"column"} gap={"5"}>
          <IssueSummary
            open={data.open}
            in_progress={data.in_progress}
            closed={data.closed}
          />
          <IssueChart
            open={data.open}
            in_progress={data.in_progress}
            closed={data.closed}
          />
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Bug-Hive Dashboard",
};
