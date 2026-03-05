import { z } from 'zod';

export const convertEnquirySchema = z.object({
    enquiryId: z.string().uuid('Invalid enquiry ID'),
    ownerId: z.string().uuid('Invalid user ID'),
});

export const updateProspectSchema = z.object({
    statusId: z.string().uuid('Invalid status ID').optional(),
    ownerId: z.string().uuid('Invalid user ID').optional(),
});

export type ConvertEnquiryInput = z.infer<typeof convertEnquirySchema>;
export type UpdateProspectInput = z.infer<typeof updateProspectSchema>;
