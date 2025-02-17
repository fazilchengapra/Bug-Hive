"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssignSelect = ({ issue }: { issue: Issue }) => {
 
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;

  const onChangeSelect = async (userId:string) => {
    if (userId === "null") userId = "";
    axios.patch("/api/issues/" + issue.id, {
      assignedUserId: userId || null,
    }).then(() => toast.success('Changes saved'))
    .catch(() => toast.error('Changes could not be saved'));
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || "null"}
        onValueChange={(userId) => onChangeSelect(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="null">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignSelect;
