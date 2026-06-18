import z from "zod";

export const stkSchema = z.object({
  endpoint: z.string("Please enter a valid endpoint"),
  phone: z.string("Please enter a valid phone number"),
  amount: z.string("Please enter the payment amount"),
  reference: z.string("Please enter a valid reference number"),
});

export type StkInput = z.infer<typeof stkSchema>;
