import { z } from "zod";

export const sendTransactionSchema = z.object({
	address: z.string().min(1, { message: "Address is required" }),
	amount: z.number().min(1, { message: "Amount is required" }),
	message: z.string().min(1, { message: "Message is required" }),
});