import { z } from "zod";

export const stkPushSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/, "Enter a valid Kenyan phone number"),

  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((value) => !isNaN(Number(value)), {
      message: "Amount must be a number",
    })
    .refine((value) => Number(value) > 0, {
      message: "Amount must be greater than 0",
    }),

  paybillNumber: z
    .string()
    .trim()
    .regex(/^\d{5,9}$/, "Paybill number must contain 5 to 9 digits")
    .optional(),

  accountNumber: z
    .string()
    .trim()
    .min(3, "Account number is required")
    .max(30, "Account number is too long")
    .regex(/^[A-Za-z0-9_-]+$/, "Only letters, numbers, hyphens and underscores are allowed")
    .optional(),
  tillNumber: z
    .string()
    .trim()
    .regex(/^\d{5,7}$/, "Till number must contain 5 to 7 digits")
    .optional(),
  //   reference: z.string().trim().min(3, "Reference is too short").max(30, "Reference is too long"),
});

export type StkPushInput = z.infer<typeof stkPushSchema>;
