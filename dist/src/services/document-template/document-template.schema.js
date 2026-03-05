"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocumentTemplateSchema = exports.createDocumentTemplateSchema = void 0;
const zod_1 = require("zod");
exports.createDocumentTemplateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    destination: zod_1.z.string().min(1, 'Destination is required'),
    type: zod_1.z.enum(['ITINERARY', 'QUOTATION']),
    htmlTemplate: zod_1.z.string().min(1, 'HTML template is required'),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateDocumentTemplateSchema = exports.createDocumentTemplateSchema.partial();
//# sourceMappingURL=document-template.schema.js.map