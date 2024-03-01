import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface UserType extends z.infer<typeof UserSchema> {}

export const LoginRequestSchema = z.object({
  email: z.string().min(1, "Required").email("Enter valid email"),
  password: z.string().min(1, "Required").min(6, "Enter minimum 6 characters"),
});

export interface LoginRequestType extends z.infer<typeof LoginRequestSchema> {}

export const RegisterRequestSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Enter valid email"),
  phoneNumber: z.string().min(1, "Required").length(9, "Enter valid phone number"),
  password: z.string().min(1, "Required").min(6, "Enter minimum 6 characters"),
});

export interface RegisterRequestType extends z.infer<typeof RegisterRequestSchema> {}
