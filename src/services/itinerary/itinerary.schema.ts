import { z } from 'zod';

export const createItinerarySchema = z.object({
    prospectId: z.string().uuid({ message: 'Invalid prospect ID' }),
    templateId: z.string().uuid({ message: 'Invalid template ID' }),
    packageId: z.string().uuid({ message: 'Invalid package ID' }),
    snapshotData: z.record(z.string(), z.any()),
    pdfUrl: z.string().url({ message: 'Invalid PDF URL' }).optional(),
});

export const updateItinerarySchema = createItinerarySchema.partial().extend({
    statusId: z.string().uuid('Invalid status ID').optional(),
});

export type CreateItineraryInput = z.infer<typeof createItinerarySchema>;
export type UpdateItineraryInput = z.infer<typeof updateItinerarySchema>;
