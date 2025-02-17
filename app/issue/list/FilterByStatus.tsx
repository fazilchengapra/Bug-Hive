"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const FilterByStatus = () => {
  const router = useRouter();
  const status: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];
  return (
    <Select.Root
      defaultValue="ALL"
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "ALL";
        router.push("/issue/list" + query);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        {status.map((e) => (
          <Select.Item key={e.label} value={e.status || "ALL"}>
            {e.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterByStatus;
