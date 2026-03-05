import { z } from 'zod';
export declare const createQuotationSchema: z.ZodObject<{
    prospectId: z.ZodString;
    templateId: z.ZodString;
    packageId: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    snapshotData: z.ZodRecord<z.ZodString, z.ZodAny>;
    pdfUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateQuotationSchema: z.ZodObject<{
    prospectId: z.ZodOptional<z.ZodString>;
    templateId: z.ZodOptional<z.ZodString>;
    packageId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    amount: z.ZodOptional<z.ZodNumber>;
    snapshotData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    pdfUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    statusId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateQuotationInput = z.infer<typeof createQuotationSchema>;
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>;
