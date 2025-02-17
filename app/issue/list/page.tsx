import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import ActionButton from "./ActionButton";
import { Link, IssueStatusBadge } from "@/app/components";
import FilterByStatus from "./FilterByStatus";
import type { Issue } from "@prisma/client";
import { Status } from "@prisma/client";
import NextLnk from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue}
}

const Issue = async ({searchParams}:Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    { label: "Date", value: "createdAt" },
  ];

  const {status, orderBy} = await searchParams

  const statuses = Object.values(Status);

  const isStatus = statuses.includes(status) ? status : undefined;



  console.log(isStatus)

  const issues = await prisma.issue.findMany({
    where: {
      status: isStatus,
    },
  });
  return (
    <div className="">
      <Flex justify={"between"}>
        <FilterByStatus />
        <ActionButton />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.RowHeaderCell key={column.value}>
                <NextLnk href={{query: {status, orderBy: column.value}}}>{column.label}</NextLnk>
                {column.value === orderBy && <ArrowUpIcon className="inline"/>}
              </Table.RowHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issue/${issue.id}`}>
                  {issue.title}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Issue;
