import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ActionButton = () => {
  return (
    <div>
      <Button >
        <Link href={"/issue/new"}>New issue</Link>
      </Button>
    </div>
  );
};

export default ActionButton;
