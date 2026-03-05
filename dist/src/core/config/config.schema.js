"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadSourceSchema = exports.createLeadSourceSchema = exports.updateModuleStatusSchema = exports.createModuleStatusSchema = void 0;
const zod_1 = require("zod");
exports.createModuleStatusSchema = zod_1.z.object({
    module: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    color: zod_1.z.string().optional(),
    sortOrder: zod_1.z.number().int().min(0),
    isFinal: zod_1.z.boolean().optional().default(false),
});
exports.updateModuleStatusSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    color: zod_1.z.string().optional(),
    sortOrder: zod_1.z.number().int().min(0).optional(),
    isFinal: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createLeadSourceSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
});
exports.updateLeadSourceSchema = zod_1.z.object({
    type: zod_1.z.string().min(1).optional(),
    name: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=config.schema.js.map