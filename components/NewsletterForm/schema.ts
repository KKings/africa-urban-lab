import { z } from "zod";

export const RequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(3, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  country: z.string().min(1, "Country is required"),
  reasonForInterest: z.string({
    required_error: "Please select an option",
  }),
  educationalBackground: z.string({
    required_error: "Please select an option",
  }),
  howDidYouHearAboutUs: z.string({
    required_error: "Please select an option",
  }),
});

export type SignupSchema = z.infer<typeof RequestSchema>;