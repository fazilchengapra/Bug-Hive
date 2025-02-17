"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const FilterByStatus = () => {
  const searchParams = useSearchParams()
  const router = useRouter();
  const status: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get('status')|| 'ALL'}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        if(status) params.append('status', status)
        if(searchParams.get('order'))
          params.append('order', searchParams.get('order')!)
        const query = params.size ? '?' + params.toString() : ''
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
