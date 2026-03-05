import { z } from 'zod';
export declare const createEnquirySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodString;
    destination: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodNumber>;
    sourceId: z.ZodString;
    assignedToId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateEnquirySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    phone: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    budget: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    sourceId: z.ZodOptional<z.ZodString>;
    assignedToId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    statusId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;
