import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const FilterByStatus = () => {
    const status: {label: string, status?: Status}[]=[
        {label: "All"},
        {label: "Open", status:'OPEN'},
        {label: "In progress", status:'IN_PROGRESS'},
        {label: "Closed", status:'CLOSED'}
    ]
  return (
    <Select.Root defaultValue="all">
      <Select.Trigger/>
      <Select.Content>
        {status.map(e => <Select.Item key={e.label} value={e.status || 'all'}>{e.label}</Select.Item>)}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterByStatus;
