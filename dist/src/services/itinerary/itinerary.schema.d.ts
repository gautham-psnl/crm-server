import { z } from 'zod';
export declare const createItinerarySchema: z.ZodObject<{
    prospectId: z.ZodString;
    templateId: z.ZodString;
    packageId: z.ZodString;
    snapshotData: z.ZodRecord<z.ZodString, z.ZodAny>;
    pdfUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateItinerarySchema: z.ZodObject<{
    prospectId: z.ZodOptional<z.ZodString>;
    templateId: z.ZodOptional<z.ZodString>;
    packageId: z.ZodOptional<z.ZodString>;
    snapshotData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    pdfUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    statusId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateItineraryInput = z.infer<typeof createItinerarySchema>;
export type UpdateItineraryInput = z.infer<typeof updateItinerarySchema>;
