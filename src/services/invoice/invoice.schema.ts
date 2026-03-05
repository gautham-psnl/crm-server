import { z } from 'zod';

export const createInvoiceSchema = z.object({
    customerId: z.string().uuid('Invalid customer ID'),
    quotationId: z.string().uuid('Invalid quotation ID'),
    amount: z.number().min(0, 'Amount must be positive'),
});

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
    statusId: z.string().uuid('Invalid status ID').optional(),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
