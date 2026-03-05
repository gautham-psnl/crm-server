import { z } from 'zod';

// ─── Module Status ────────────────────────────────────────────────────────────

export const createModuleStatusSchema = z.object({
    module: z.string().min(1),
    name: z.string().min(1),
    color: z.string().optional(),
    sortOrder: z.number().int().min(0),
    isFinal: z.boolean().optional().default(false),
});

export const updateModuleStatusSchema = z.object({
    name: z.string().min(1).optional(),
    color: z.string().optional(),
    sortOrder: z.number().int().min(0).optional(),
    isFinal: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

export type CreateModuleStatusInput = z.infer<typeof createModuleStatusSchema>;
export type UpdateModuleStatusInput = z.infer<typeof updateModuleStatusSchema>;

// ─── Lead Source ──────────────────────────────────────────────────────────────

export const createLeadSourceSchema = z.object({
    type: z.string().min(1),
    name: z.string().min(1),
});

export const updateLeadSourceSchema = z.object({
    type: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
});

export type CreateLeadSourceInput = z.infer<typeof createLeadSourceSchema>;
export type UpdateLeadSourceInput = z.infer<typeof updateLeadSourceSchema>;
