import { z } from 'zod';

export const createPaymentSchema = z.object({
    invoiceId: z.string().uuid('Invalid invoice ID'),
    amount: z.number().min(0, 'Amount must be positive'),
    method: z.string().min(1, 'Method is required'),
    transactionRef: z.string().optional(),
    paidAt: z.string().datetime('Invalid payment date format').optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
