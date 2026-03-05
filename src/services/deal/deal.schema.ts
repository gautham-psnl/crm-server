import { z } from 'zod';

export const createDealSchema = z.object({
    prospectId: z.string().uuid('Invalid prospect ID'),
    expectedValue: z.number().min(0, 'Value must be positive'),
    probability: z.number().min(0).max(100, 'Probability must be 0-100'),
    expectedCloseDate: z.string().datetime('Invalid close date format'),
    ownerId: z.string().uuid('Invalid user ID'),
});

export const updateDealSchema = createDealSchema.partial().extend({
    statusId: z.string().uuid('Invalid status ID').optional(),
});

export type CreateDealInput = z.infer<typeof createDealSchema>;
export type UpdateDealInput = z.infer<typeof updateDealSchema>;
