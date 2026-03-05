import { z } from 'zod';

export const createQuotationSchema = z.object({
    prospectId: z.string().uuid({ message: 'Invalid prospect ID' }),
    templateId: z.string().uuid({ message: 'Invalid template ID' }),
    packageId: z.string().uuid({ message: 'Invalid package ID' }).optional(),
    amount: z.number().min(0, { message: 'Amount must be positive' }),
    snapshotData: z.record(z.string(), z.any()),
    pdfUrl: z.string().url({ message: 'Invalid PDF URL' }).optional(),
});

export const updateQuotationSchema = createQuotationSchema.partial().extend({
    statusId: z.string().uuid('Invalid status ID').optional(),
});

export type CreateQuotationInput = z.infer<typeof createQuotationSchema>;
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>;
