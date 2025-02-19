import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueSummary = ({ open, closed, in_progress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "Closed", value: closed, status: "CLOSED" },
    { label: "In Progress", value: in_progress, status: "IN_PROGRESS" },
  ];

  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.label} className="w-[33%]">
          <Flex direction={"column"} gap={'5'}>
            <Link href={"/issue/list?status=" + container.status} className="text-sm font-medium">
              {container.label}
            </Link>
            <Text className="text-2xl font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
