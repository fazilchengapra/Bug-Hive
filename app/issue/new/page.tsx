import React from "react";
import IssueForm from "../_components/IssueForm";
import { Metadata } from "next";

const page = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default page;

export const metadata:Metadata={
  title:"Create new issue",
  description: "Reporting new bugs"
}
