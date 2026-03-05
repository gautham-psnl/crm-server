"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItinerarySchema = exports.createItinerarySchema = void 0;
const zod_1 = require("zod");
exports.createItinerarySchema = zod_1.z.object({
    prospectId: zod_1.z.string().uuid({ message: 'Invalid prospect ID' }),
    templateId: zod_1.z.string().uuid({ message: 'Invalid template ID' }),
    packageId: zod_1.z.string().uuid({ message: 'Invalid package ID' }),
    snapshotData: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    pdfUrl: zod_1.z.string().url({ message: 'Invalid PDF URL' }).optional(),
});
exports.updateItinerarySchema = exports.createItinerarySchema.partial().extend({
    statusId: zod_1.z.string().uuid('Invalid status ID').optional(),
});
//# sourceMappingURL=itinerary.schema.js.map