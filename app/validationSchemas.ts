import { z } from "zod";

export const issueValidationSchema = z.object({
  title: z.string().min(3, "Title is required").max(255),
  description: z.string().min(5, "Description is required"),
});

export const patchIssueValidateSchema = z.object({
  title: z.string().min(3, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(5, "Description is required")
    .max(2000)
    .optional(),
  assignedUserId: z.string().min(1).max(255).optional().nullable(),
});
