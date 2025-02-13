import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div>
      <div className="max-w-xl space-y-2">
        <TextField.Root placeholder="Title">
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <TextArea placeholder="Description"></TextArea>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default NewIssuePage;
