import { z } from 'zod';

export const createDocumentTemplateSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    destination: z.string().min(1, 'Destination is required'),
    type: z.enum(['ITINERARY', 'QUOTATION']),
    htmlTemplate: z.string().min(1, 'HTML template is required'),
    isActive: z.boolean().optional().default(true),
});

export const updateDocumentTemplateSchema =
    createDocumentTemplateSchema.partial();

export type CreateDocumentTemplateInput = z.infer<
    typeof createDocumentTemplateSchema
>;
export type UpdateDocumentTemplateInput = z.infer<
    typeof updateDocumentTemplateSchema
>;
