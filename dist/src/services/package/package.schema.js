"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageSchema = exports.createPackageSchema = void 0;
const zod_1 = require("zod");
exports.createPackageSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1, 'Destination is required'),
    name: zod_1.z.string().min(1, 'Name is required'),
    duration: zod_1.z.number().int().positive('Duration must be positive'),
    price: zod_1.z.number().positive('Price must be positive'),
    hotelDetails: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    dayWisePlan: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    inclusions: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    exclusions: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updatePackageSchema = exports.createPackageSchema.partial();
//# sourceMappingURL=package.schema.js.map