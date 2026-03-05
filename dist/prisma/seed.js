"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ override: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding database...');
    const leadSources = [
        { type: 'WEB', name: 'Website Form' },
        { type: 'FACEBOOK', name: 'Facebook Lead Ads' },
        { type: 'INSTAGRAM', name: 'Instagram' },
        { type: 'GOOGLE', name: 'Google Lead Forms' },
        { type: 'MANUAL', name: 'Manual Entry' },
        { type: 'BULK', name: 'Bulk Upload' },
    ];
    for (const source of leadSources) {
        await prisma.leadSource.upsert({
            where: { id: `seed-${source.type.toLowerCase()}` },
            update: {},
            create: { id: `seed-${source.type.toLowerCase()}`, ...source },
        });
    }
    console.log(`  ✅ ${leadSources.length} lead sources seeded`);
    const statuses = [
        { module: 'ENQUIRY', name: 'New', color: '#3B82F6', sortOrder: 0, isFinal: false },
        { module: 'ENQUIRY', name: 'Contacted', color: '#F59E0B', sortOrder: 1, isFinal: false },
        { module: 'ENQUIRY', name: 'Qualified', color: '#10B981', sortOrder: 2, isFinal: false },
        { module: 'ENQUIRY', name: 'Junk', color: '#EF4444', sortOrder: 3, isFinal: true },
        { module: 'ENQUIRY', name: 'Converted', color: '#8B5CF6', sortOrder: 4, isFinal: true },
        { module: 'PROSPECT', name: 'Active', color: '#3B82F6', sortOrder: 0, isFinal: false },
        { module: 'PROSPECT', name: 'Proposal Sent', color: '#F59E0B', sortOrder: 1, isFinal: false },
        { module: 'PROSPECT', name: 'Negotiation', color: '#EC4899', sortOrder: 2, isFinal: false },
        { module: 'PROSPECT', name: 'Converted', color: '#10B981', sortOrder: 3, isFinal: true },
        { module: 'PROSPECT', name: 'Lost', color: '#EF4444', sortOrder: 4, isFinal: true },
        { module: 'DEAL', name: 'Open', color: '#3B82F6', sortOrder: 0, isFinal: false },
        { module: 'DEAL', name: 'In Progress', color: '#F59E0B', sortOrder: 1, isFinal: false },
        { module: 'DEAL', name: 'Won', color: '#10B981', sortOrder: 2, isFinal: true },
        { module: 'DEAL', name: 'Lost', color: '#EF4444', sortOrder: 3, isFinal: true },
        { module: 'ITINERARY', name: 'Draft', color: '#6B7280', sortOrder: 0, isFinal: false },
        { module: 'ITINERARY', name: 'Sent', color: '#3B82F6', sortOrder: 1, isFinal: false },
        { module: 'ITINERARY', name: 'Approved', color: '#10B981', sortOrder: 2, isFinal: true },
        { module: 'QUOTATION', name: 'Draft', color: '#6B7280', sortOrder: 0, isFinal: false },
        { module: 'QUOTATION', name: 'Sent', color: '#3B82F6', sortOrder: 1, isFinal: false },
        { module: 'QUOTATION', name: 'Accepted', color: '#10B981', sortOrder: 2, isFinal: true },
        { module: 'QUOTATION', name: 'Rejected', color: '#EF4444', sortOrder: 3, isFinal: true },
        { module: 'INVOICE', name: 'Pending', color: '#F59E0B', sortOrder: 0, isFinal: false },
        { module: 'INVOICE', name: 'Partially Paid', color: '#3B82F6', sortOrder: 1, isFinal: false },
        { module: 'INVOICE', name: 'Paid', color: '#10B981', sortOrder: 2, isFinal: true },
        { module: 'INVOICE', name: 'Overdue', color: '#EF4444', sortOrder: 3, isFinal: false },
    ];
    for (const status of statuses) {
        await prisma.moduleStatus.upsert({
            where: {
                module_name: { module: status.module, name: status.name },
            },
            update: { color: status.color, sortOrder: status.sortOrder, isFinal: status.isFinal },
            create: status,
        });
    }
    console.log(`  ✅ ${statuses.length} module statuses seeded`);
    console.log('🌱 Seeding complete!');
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map