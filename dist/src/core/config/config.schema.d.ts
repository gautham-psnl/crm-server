import { z } from 'zod';
export declare const createModuleStatusSchema: z.ZodObject<{
    module: z.ZodString;
    name: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodNumber;
    isFinal: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateModuleStatusSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    isFinal: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateModuleStatusInput = z.infer<typeof createModuleStatusSchema>;
export type UpdateModuleStatusInput = z.infer<typeof updateModuleStatusSchema>;
export declare const createLeadSourceSchema: z.ZodObject<{
    type: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export declare const updateLeadSourceSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateLeadSourceInput = z.infer<typeof createLeadSourceSchema>;
export type UpdateLeadSourceInput = z.infer<typeof updateLeadSourceSchema>;
