import { z } from 'zod';
export declare const createPaymentSchema: z.ZodObject<{
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    method: z.ZodString;
    transactionRef: z.ZodOptional<z.ZodString>;
    paidAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
