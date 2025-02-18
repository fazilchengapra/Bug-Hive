import { prisma } from "@/prisma/client";
import type { Issue } from "@prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import ActionButton from "./ActionButton";
import FilterByStatus from "./FilterByStatus";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const Issue = async ({ searchParams }: Props) => {
  const { status, order, page } = await searchParams;

  const statuses = Object.values(Status);

  const isStatus = statuses.includes(status) ? status : undefined;

  const where = { status: isStatus };

  const orderBy = columnNames.includes(order) ? { [order]: "asc" } : undefined;

  const pageSize = 10;
  const currentPage = parseInt(page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize || 0,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });
  return (
    <Flex direction={'column'} gap={'4'}>
      <Flex justify={"between"}>
        <FilterByStatus />
        <ActionButton />
      </Flex>
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={currentPage}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export default Issue;
