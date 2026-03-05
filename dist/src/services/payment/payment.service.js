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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        return this.prisma.payment.findMany({
            where: {
                ...(filters?.invoiceId && { invoiceId: filters.invoiceId }),
            },
            include: {
                invoice: { include: { customer: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                invoice: { include: { customer: true } },
            },
        });
        if (!payment)
            throw new common_1.NotFoundException(`Payment ${id} not found`);
        return payment;
    }
    async create(dto) {
        const payment = await this.prisma.payment.create({
            data: {
                ...dto,
                paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
            },
            include: { invoice: true },
        });
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: dto.invoiceId },
            include: { payments: true },
        });
        if (invoice) {
            const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
            if (totalPaid >= invoice.amount) {
                const paidStatus = await this.prisma.moduleStatus.findFirst({
                    where: { module: 'INVOICE', name: 'Paid', isActive: true },
                });
                if (paidStatus) {
                    await this.prisma.invoice.update({
                        where: { id: dto.invoiceId },
                        data: { statusId: paidStatus.id },
                    });
                }
            }
            else if (totalPaid > 0) {
                const partialStatus = await this.prisma.moduleStatus.findFirst({
                    where: { module: 'INVOICE', name: 'Partially Paid', isActive: true },
                });
                if (partialStatus) {
                    await this.prisma.invoice.update({
                        where: { id: dto.invoiceId },
                        data: { statusId: partialStatus.id },
                    });
                }
            }
        }
        return payment;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map