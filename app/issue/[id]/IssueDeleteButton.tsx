"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      await axios.delete("/api/issues/" + issueId);
      router.push("/issue");
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Are You Sure Want to Delete</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the
            issue.
          </AlertDialog.Description>
          <Flex mt={"4"} gap={"5"} justify={"end"}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={deleteIssue}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Not Deleted</AlertDialog.Title>
          <AlertDialog.Description>
            This Error Can&apos;t be Deleted
          </AlertDialog.Description>
          <Flex justify={'end'}>
          <Button mt={'3'} color="gray" variant="soft" onClick={() => setError(false)}>
            Close
          </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton;
