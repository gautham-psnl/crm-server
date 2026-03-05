import { z } from 'zod';
export declare const createPackageSchema: z.ZodObject<{
    destination: z.ZodString;
    name: z.ZodString;
    duration: z.ZodNumber;
    price: z.ZodNumber;
    hotelDetails: z.ZodRecord<z.ZodString, z.ZodAny>;
    dayWisePlan: z.ZodRecord<z.ZodString, z.ZodAny>;
    inclusions: z.ZodRecord<z.ZodString, z.ZodAny>;
    exclusions: z.ZodRecord<z.ZodString, z.ZodAny>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updatePackageSchema: z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    hotelDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dayWisePlan: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    inclusions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    exclusions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
}, z.core.$strip>;
export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
