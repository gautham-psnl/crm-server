import { z } from 'zod';
export declare const createDocumentTemplateSchema: z.ZodObject<{
    name: z.ZodString;
    destination: z.ZodString;
    type: z.ZodEnum<{
        ITINERARY: "ITINERARY";
        QUOTATION: "QUOTATION";
    }>;
    htmlTemplate: z.ZodString;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateDocumentTemplateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        ITINERARY: "ITINERARY";
        QUOTATION: "QUOTATION";
    }>>;
    htmlTemplate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
}, z.core.$strip>;
export type CreateDocumentTemplateInput = z.infer<typeof createDocumentTemplateSchema>;
export type UpdateDocumentTemplateInput = z.infer<typeof updateDocumentTemplateSchema>;
