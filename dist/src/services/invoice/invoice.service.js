"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let InvoiceService = class InvoiceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        return this.prisma.invoice.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.customerId && { customerId: filters.customerId }),
            },
            include: {
                status: true,
                customer: true,
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: {
                status: true,
                customer: true,
                payments: true,
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException(`Invoice ${id} not found`);
        return invoice;
    }
    async create(dto) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'INVOICE', name: 'Pending', isActive: true },
        });
        if (!defaultStatus)
            throw new common_1.BadRequestException('Default invoice status not found');
        return this.prisma.invoice.create({
            data: {
                ...dto,
                statusId: defaultStatus.id,
            },
            include: { status: true, customer: true },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.invoice.update({
            where: { id },
            data: dto,
            include: { status: true, customer: true },
        });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.invoice.delete({ where: { id } });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map