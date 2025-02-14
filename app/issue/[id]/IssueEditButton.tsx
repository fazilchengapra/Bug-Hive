import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueEditButton = ({issueId}:{issueId: number}) => {
  return (
    <div>
      <Link href={`${issueId}/edit`}>
        <Button>
          <Pencil2Icon />
          Edit
        </Button>
      </Link>
    </div>
  );
};

export default IssueEditButton;
