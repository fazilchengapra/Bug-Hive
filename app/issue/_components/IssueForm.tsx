"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { issueValidationSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

type issueFormData = z.infer<typeof issueValidationSchema>;

const IssueForm = ({ IssueDetails }: { IssueDetails?: Issue }) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueValidationSchema),
  });
  const [error, setError] = useState("");
  const [isSUbmiting, setIsSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      if (IssueDetails)
        await axios.patch("/api/issues/" + IssueDetails.id, data);
      else await axios.post("/api/issues", data);
      route.push("/issue");
    } catch (error) {
      setIsSubmiting(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred while submitting."
        );
      } else {
        setError("Unexpected error: " + (error as Error).message);
      }
    }
  });
  return (
    <div className="max-w-xl">
      <div>
        <div className="mb-3">
          {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
        </div>
        <form className=" space-y-2" onSubmit={onSubmit}>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <TextField.Root
            {...register("title")}
            placeholder="Title"
            defaultValue={IssueDetails?.title}
          ></TextField.Root>

          <TextArea
            placeholder="Description"
            {...register("description")}
            defaultValue={IssueDetails?.description}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button disabled={isSUbmiting}>
            {IssueDetails ? "Submit" : "Update"}
            {isSUbmiting && <Spinner />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
