import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are You Sure Want to Delete</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete the issue.
        </AlertDialog.Description>
        <Flex mt={"4"} gap={"5"} justify={"end"}>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default IssueDeleteButton;
