import { z } from 'zod';

export const createPackageSchema = z.object({
    destination: z.string().min(1, 'Destination is required'),
    name: z.string().min(1, 'Name is required'),
    duration: z.number().int().positive('Duration must be positive'),
    price: z.number().positive('Price must be positive'),
    hotelDetails: z.record(z.string(), z.any()),
    dayWisePlan: z.record(z.string(), z.any()),
    inclusions: z.record(z.string(), z.any()),
    exclusions: z.record(z.string(), z.any()),
    isActive: z.boolean().optional().default(true),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
