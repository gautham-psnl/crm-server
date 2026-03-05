"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSchema = exports.createCustomerSchema = void 0;
const zod_1 = require("zod");
exports.createCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    source: zod_1.z.string().min(1, 'Source is required'),
    sourceRefId: zod_1.z.string().uuid('Invalid source reference ID'),
});
exports.updateCustomerSchema = exports.createCustomerSchema.partial();
//# sourceMappingURL=customer.schema.js.map