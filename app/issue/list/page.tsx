import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import ActionButton from "./ActionButton";
import { Link, IssueStatusBadge } from "@/app/components";
import FilterByStatus from "./FilterByStatus";
import type { Issue } from "@prisma/client";
import { Status } from "@prisma/client";
import NextLnk from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: { status: Status; order: keyof Issue, page: string };
}

const Issue = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: 'hidden md:table-cell' },
    { label: "Date", value: "createdAt" , className: 'hidden md:table-cell'},
  ];

  const { status, order, page } = await searchParams;

  const statuses = Object.values(Status);

  const isStatus = statuses.includes(status) ? status : undefined;

  const where = {status: isStatus}

  const orderBy = columns.
  map((column) => column.value)
  .includes(order)
   ? { [order]: "asc" } : undefined;

   const pageSize = 10
   const currentPage = parseInt(page) || 1

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize || 0,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where
  })
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
              <Table.RowHeaderCell key={column.value} className={column.className}>
                <NextLnk href={{ query: { status, order: column.value } }}>
                  {column.label}
                </NextLnk>
                {column.value === order && <ArrowUpIcon className="inline" />}
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
      <Pagination currentPage={currentPage} itemCount={issueCount} pageSize={pageSize} />
    </div>
  );
};

export default Issue;
