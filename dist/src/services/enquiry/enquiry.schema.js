"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnquirySchema = exports.createEnquirySchema = void 0;
const zod_1 = require("zod");
exports.createEnquirySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    destination: zod_1.z.string().optional(),
    budget: zod_1.z.number().optional(),
    sourceId: zod_1.z.string().uuid('Invalid source ID'),
    assignedToId: zod_1.z.string().uuid('Invalid user ID').optional(),
});
exports.updateEnquirySchema = exports.createEnquirySchema.partial().extend({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
});
//# sourceMappingURL=enquiry.schema.js.map