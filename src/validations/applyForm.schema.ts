import { z } from "zod";

export const applyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  resumeLink: z.string().url("Please enter a valid URL"),
  coverNote: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof applyFormSchema>;
