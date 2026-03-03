import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  adminSecret: z.string().min(6, "Admin secret must be at least 6 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
