"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDealSchema = exports.createDealSchema = void 0;
const zod_1 = require("zod");
exports.createDealSchema = zod_1.z.object({
    prospectId: zod_1.z.string().uuid('Invalid prospect ID'),
    expectedValue: zod_1.z.number().min(0, 'Value must be positive'),
    probability: zod_1.z.number().min(0).max(100, 'Probability must be 0-100'),
    expectedCloseDate: zod_1.z.string().datetime('Invalid close date format'),
    ownerId: zod_1.z.string().uuid('Invalid user ID'),
});
exports.updateDealSchema = exports.createDealSchema.partial().extend({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
});
//# sourceMappingURL=deal.schema.js.map