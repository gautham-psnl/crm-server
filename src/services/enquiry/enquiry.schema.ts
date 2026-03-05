import { z } from 'zod';

export const createEnquirySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().min(1, 'Phone is required'),
    destination: z.string().optional(),
    budget: z.number().optional(),
    sourceId: z.string().uuid('Invalid source ID'),
    assignedToId: z.string().uuid('Invalid user ID').optional(),
});

export const updateEnquirySchema = createEnquirySchema.partial().extend({
    statusId: z.string().uuid('Invalid status ID').optional(),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;
