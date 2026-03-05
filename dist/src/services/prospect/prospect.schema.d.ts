import { z } from 'zod';
export declare const convertEnquirySchema: z.ZodObject<{
    enquiryId: z.ZodString;
    ownerId: z.ZodString;
}, z.core.$strip>;
export declare const updateProspectSchema: z.ZodObject<{
    statusId: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ConvertEnquiryInput = z.infer<typeof convertEnquirySchema>;
export type UpdateProspectInput = z.infer<typeof updateProspectSchema>;
