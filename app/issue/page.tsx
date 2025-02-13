import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issue = () => {
  return (
    <div className="">
      <Button>
        <Link href={"/issue/new"}>New issue</Link>
      </Button>
    </div>
  );
};

export default Issue;
