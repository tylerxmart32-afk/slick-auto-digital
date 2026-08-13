import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30)
    .regex(/^[0-9+()\-.\s]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  serviceType: z.enum(["Auto Tinting", "Auto Detailing", "Not Sure — Get Advice"]),
  vehicleYear: z.string().trim().max(4).optional().or(z.literal("")),
  vehicleMake: z.string().trim().max(50).optional().or(z.literal("")),
  vehicleModel: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
