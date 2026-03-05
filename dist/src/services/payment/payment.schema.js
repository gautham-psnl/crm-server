"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentSchema = zod_1.z.object({
    invoiceId: zod_1.z.string().uuid('Invalid invoice ID'),
    amount: zod_1.z.number().min(0, 'Amount must be positive'),
    method: zod_1.z.string().min(1, 'Method is required'),
    transactionRef: zod_1.z.string().optional(),
    paidAt: zod_1.z.string().datetime('Invalid payment date format').optional(),
});
//# sourceMappingURL=payment.schema.js.map