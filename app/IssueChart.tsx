"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = ({ open, in_progress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: in_progress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" barSize={60}/> {/* Added fill color */}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
