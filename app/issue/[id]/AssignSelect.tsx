import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelect = () => {
  return (
    <Select.Root >
      <Select.Trigger placeholder="Assign..."/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value="1">Fazil Chengapra</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
