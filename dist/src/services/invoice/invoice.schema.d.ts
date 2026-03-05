import { z } from 'zod';
export declare const createInvoiceSchema: z.ZodObject<{
    customerId: z.ZodString;
    quotationId: z.ZodString;
    amount: z.ZodNumber;
}, z.core.$strip>;
export declare const updateInvoiceSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    quotationId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    statusId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
