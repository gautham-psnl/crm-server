"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProspectSchema = exports.convertEnquirySchema = void 0;
const zod_1 = require("zod");
exports.convertEnquirySchema = zod_1.z.object({
    enquiryId: zod_1.z.string().uuid('Invalid enquiry ID'),
    ownerId: zod_1.z.string().uuid('Invalid user ID'),
});
exports.updateProspectSchema = zod_1.z.object({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
    ownerId: zod_1.z.string().uuid('Invalid user ID').optional(),
});
//# sourceMappingURL=prospect.schema.js.map