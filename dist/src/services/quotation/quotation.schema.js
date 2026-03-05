"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuotationSchema = exports.createQuotationSchema = void 0;
const zod_1 = require("zod");
exports.createQuotationSchema = zod_1.z.object({
    prospectId: zod_1.z.string().uuid({ message: 'Invalid prospect ID' }),
    templateId: zod_1.z.string().uuid({ message: 'Invalid template ID' }),
    packageId: zod_1.z.string().uuid({ message: 'Invalid package ID' }).optional(),
    amount: zod_1.z.number().min(0, { message: 'Amount must be positive' }),
    snapshotData: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    pdfUrl: zod_1.z.string().url({ message: 'Invalid PDF URL' }).optional(),
});
exports.updateQuotationSchema = exports.createQuotationSchema.partial().extend({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
});
//# sourceMappingURL=quotation.schema.js.map