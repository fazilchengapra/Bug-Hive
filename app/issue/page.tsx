import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import ActionButton from "./ActionButton";
import Link from "../components/Link";

const Issue = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div className="">
      <ActionButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>Title</Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Status
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Date
            </Table.RowHeaderCell>
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
