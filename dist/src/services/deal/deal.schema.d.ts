import { z } from 'zod';
export declare const createDealSchema: z.ZodObject<{
    prospectId: z.ZodString;
    expectedValue: z.ZodNumber;
    probability: z.ZodNumber;
    expectedCloseDate: z.ZodString;
    ownerId: z.ZodString;
}, z.core.$strip>;
export declare const updateDealSchema: z.ZodObject<{
    prospectId: z.ZodOptional<z.ZodString>;
    expectedValue: z.ZodOptional<z.ZodNumber>;
    probability: z.ZodOptional<z.ZodNumber>;
    expectedCloseDate: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    statusId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateDealInput = z.infer<typeof createDealSchema>;
export type UpdateDealInput = z.infer<typeof updateDealSchema>;
