"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import { newIssueSchema } from "@/app/validationSchemas";

type issueForm = z.infer<typeof newIssueSchema>


const NewIssuePage = () => {
  const route = useRouter();
  const { register, handleSubmit, formState: {errors}} = useForm<issueForm>({
    resolver: zodResolver(newIssueSchema)
  });
  const [error, setError] = useState("");
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
        <form
          className=" space-y-2"
          onSubmit={handleSubmit(async (data) => {
            try {
              await axios.post("/api/issues", data);
              route.push("/issue");
            } catch (error) {
              setError("Unexpected error");
            }
          })}
        >
          {errors.title?.message && <Text as="p" color="red">{errors.title?.message}</Text>}
          <TextField.Root
            {...register("title")}
            placeholder="Title"
          ></TextField.Root>

          <TextArea placeholder="Description" {...register("description")} />
          {errors.description?.message && <Text as='p' color="red">{errors.description?.message}</Text>}
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default NewIssuePage;
