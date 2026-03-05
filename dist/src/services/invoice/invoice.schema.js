"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoiceSchema = exports.createInvoiceSchema = void 0;
const zod_1 = require("zod");
exports.createInvoiceSchema = zod_1.z.object({
    customerId: zod_1.z.string().uuid('Invalid customer ID'),
    quotationId: zod_1.z.string().uuid('Invalid quotation ID'),
    amount: zod_1.z.number().min(0, 'Amount must be positive'),
});
exports.updateInvoiceSchema = exports.createInvoiceSchema.partial().extend({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
});
//# sourceMappingURL=invoice.schema.js.map